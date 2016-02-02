Reports = new Mongo.Collection('reports');
Tags = new Mongo.Collection('tags');

function getSubmitterId(reportId) {
  return Reports.findOne(reportId).createdBy;
}

Meteor.methods({
  createReport: function (text, tagkeys = []) {
    const user = Meteor.users.findOne(this.userId);
    const tags = Tags.find({
      key: { $in: tagkeys }
    }).map(
      tag => ({type: tag.type, key: tag.key, name: tag.name})
    );

    const reportId = Reports.insert({
      source: 'user',
      text: text,
      tags: tags,
      thanks: [],
      allthanks: [],
      upvotes: [],
      downvotes: [],
      createdAt: new Date(),
      createdBy: this.userId,
      sourceName: user.profile.nickname,
      expired: false,
      removed: false,
      token: Random.id(),
      weight: CONFIG.initialWeight
    });

    if (Meteor.isServer) {
      Meteor.users.update(this.userId, {
        $addToSet: {'outgoing.reports-created': reportId}
      });

      var report = Reports.findOne(reportId);
      pushReport.call(this, report);
      Reports.update(reportId, {
        $set: { pushed: true }
      });
    }

    return reportId;

  },

  updateReport: function(reportId, token, fields) {
    if (Meteor.isServer) {
      var updated = Reports.update({
        _id: reportId,
        token: token
      }, {
        $set: fields
      });

      if (updated === 0) {
        throw new Meteor.Error('bad-token', 'Zły żeton.');
      }

      var report = Reports.findOne(reportId);

      if (!report.pushed) {
        pushReport.call(this, report);
        Reports.update(reportId, {
          $set: { pushed: true }
        });
      }
    }
  },

  thankReport: function(reportId) {
    var updated = Reports.update({
      _id: reportId,
      createdBy: { $ne: this.userId },
      thanks: { $ne: this.userId }
    }, {
      $addToSet: {
        thanks: this.userId,
      }
    });

    if (updated === 0) {
      throw new Meteor.Error(
        'thanks-not-allowed', 'Nie można wysłać podziękowań.');
    }

    if (Meteor.isServer) {
      var submitterId = getSubmitterId(reportId);

      Meteor.users.update(submitterId, {
        $addToSet: {'incoming.reports-thanked': reportId}
      });

      Meteor.users.update(this.userId, {
        $addToSet: {'outgoing.reports-thanked': reportId}
      });

      const everThanked = Reports.find({
        _id: reportId,
        allthanks: this.userId
      }).count();

      if (!everThanked) {
        pushThanks.call(this, reportId, submitterId, this.userId);
      }
    }
  },

  cancelThanks: function(reportId) {
    var updated = Reports.update({
      _id: reportId,
      createdBy: { $ne: this.userId },
      thanks: this.userId
    }, {
      $pull: {thanks: this.userId}
    });

    if (updated === 0) {
      throw new Meteor.Error(
        'thanks-not-allowed', 'Nie można wysłać podziękowań.');
    }

    if (Meteor.isServer) {
      var submitterId = getSubmitterId(reportId);

      Meteor.users.update(submitterId, {
        $pull: {'incoming.reports-thanked': reportId}
      });

      Meteor.users.update(this.userId, {
        $pull: {'outgoing.reports-thanked': reportId}
      });
    }
  },

  upvoteReport: function(reportId) {
    var updated = Reports.update({
      _id: reportId,
      createdBy: { $ne: this.userId },
      upvotes: { $ne: this.userId }
    }, {
      $addToSet: {upvotes: this.userId},
      $inc: {weight: CONFIG.upvoteWeight}
    });

    if (updated === 0) {
      throw new Meteor.Error(
        'upvote-not-allowed', 'Nie można potwierdzić raportu.');
    }

    if (Meteor.isServer) {
      Meteor.users.update(getSubmitterId(reportId), {
        $addToSet: {'incoming.reports-upvoted': reportId}
      });

      Meteor.users.update(this.userId, {
        $addToSet: {'outgoing.reports-upvoted': reportId}
      });
    }
  },

  cancelUpvote: function(reportId) {
    var updated = Reports.update({
      _id: reportId,
      createdBy: { $ne: this.userId },
      upvotes: this.userId
    }, {
      $pull: {upvotes: this.userId},
      $inc: {weight: -CONFIG.upvoteWeight}
    });

    if (updated === 0) {
      throw new Meteor.Error(
        'cancel-upvote-not-allowed', 'Nie można anulować potwierdzenia.');
    }

    if (Meteor.isServer) {
      Meteor.users.update(getSubmitterId(reportId), {
        $pull: {'incoming.reports-upvoted': reportId}
      });

      Meteor.users.update(this.userId, {
        $pull: {'outgoing.reports-upvoted': reportId}
      });
    }
  },

  downvoteReport: function(reportId) {
    var updated = Reports.update({
      _id: reportId,
      createdBy: { $ne: this.userId },
      downvotes: { $ne: this.userId }
    }, {
      $addToSet: {downvotes: this.userId},
      $inc: {weight: CONFIG.downvoteWeight}
    });

    if (updated === 0) {
      throw new Meteor.Error(
        'downvote-not-allowed', 'Nie można odwołać raportu.');
    }

    if (Meteor.isServer) {
      Meteor.users.update(getSubmitterId(reportId), {
        $addToSet: {'incoming.reports-downvoted': reportId}
      });

      Meteor.users.update(this.userId, {
        $addToSet: {'outgoing.reports-downvoted': reportId}
      });
    }
  },

  cancelDownvote: function(reportId) {
    var updated = Reports.update({
      _id: reportId,
      createdBy: { $ne: this.userId },
      downvotes: this.userId
    }, {
      $pull: {downvotes: this.userId},
      $inc: {weight: -CONFIG.downvoteWeight}
    });

    if (updated === 0) {
      throw new Meteor.Error(
        'cancel-downvote-not-allowed', 'Nie można anulować odwołania.');
    }

    if (Meteor.isServer) {
      Meteor.users.update(getSubmitterId(reportId), {
        $pull: {'incoming.reports-downvoted': reportId}
      });

      Meteor.users.update(this.userId, {
        $pull: {'outgoing.reports-downvoted': reportId}
      });
    }
  },

  removeReport: function(reportId) {
    var updated = Reports.update({
      _id: reportId,
      createdBy: this.userId,
    }, {
      $set: {removed: true}
    });

    if (updated === 0) {
      throw new Meteor.Error(
        'remove-not-allowed', 'Nie można usunąć zgłoszenia.');
    }
  },

  cancelRemove: function(reportId) {
    var updated = Reports.update({
      _id: reportId,
      createdBy: this.userId,
      removed: true,
    }, {
      $set: {removed: false}
    });

    if (updated === 0) {
      throw new Meteor.Error(
        'remove-not-allowed', 'Nie można przywrócić zgłoszenia.');
    }
  },

  dismissReport: function(reportId) {
    Reports.update(reportId, {
      $addToSet: {
        dismissedBy: this.userId
      }
    });
  },

  cancelDismiss: function(reportId) {
    Reports.update(reportId, {
      $pull: {
        dismissedBy: this.userId
      }
    });
  },

  commentReport: function(reportId, text) {
    const user = Meteor.users.findOne(this.userId);
    const comment = {
      text: text,
      createdAt: new Date(),
      createdBy: this.userId,
      sourceName: user.profile.nickname,
    };
    const updated = Reports.update({
      _id: reportId,
    }, {
      $addToSet: {comments: comment},
      $set: {lastComment: comment},
    });

    if (updated === 0) {
      throw new Meteor.Error(
        'comment-unknown-error', 'Nie można skomentować raportu.');
    }

    if (Meteor.isServer) {
      Meteor.users.update(getSubmitterId(reportId), {
        $push: {'incoming.reports-commented': reportId}
      });

      Meteor.users.update(this.userId, {
        $push: {'outgoing.reports-commented': reportId}
      });
    }
  },

});
