Reports = new Mongo.Collection('reports');

numReports = function(line, dir, category) {
  var query = {
    line: line,
    expired: false
  };

  if (dir) {
    query.dir = dir;
  }

  if (category) {
    var names = allReportTypes.filter(function(report) {
      return report.category === category;
    }).map(function(report) {
      return report.name;
    });
    query.name = {$in: names};
  }

  return Reports.find(query).count();
};

function isRushHour(date) {
  var rushDays = [1, 2, 3, 4, 5];
  var rushHours = [7, 8, 16, 17];

  if (rushDays.indexOf(date.getUTCDay()) === -1) {
    return false;
  }

  return rushHours.indexOf(date.getUTCHours + 2) > -1;
}

Meteor.methods({
  saveReport: function (name, location, line, dir) {

    if (Meteor.isServer) {

      Meteor.users.update(this.userId, { $inc: {'outgoing.created': 1} });

      var query = {
        '_id': { $ne: this.userId },
        'profile.push-new-enabled': true
      };

      // if it's not rush hour, exclude users who selected rush-hours-only
      if (!isRushHour(new Date())) {
        query['profile.push-new-rushhours'] = { $ne: true };
      }

      var userIds = Meteor.users.find(
        query, { fields: { _id: 1 } }).map(
          function(user) { return user._id; });

      Push.send({
        from: 'push',
        title: line + ' ' + location,
        text: name,
        // send to all users for now
        query: {
          userId: {
            $in: userIds
          }
        }
      });
    }

    return Reports.insert({
      name: name,
      location: location,
      line: line,
      dir: dir,
      thanks: [],
      confirms: [],
      clears: [],
      createdAt: new Date(),
      createdBy: this.userId,
      expired: false,
      removed: false,
      weight: initialWeight
    });
  },
  thankReport: function(docId, submitterId) {
    if (Meteor.isServer) {
      Meteor.users.update(submitterId, { $inc: {'incoming.thanks': 1} });
      var user = Meteor.users.findOne({_id: submitterId});
      if (user.profile['push-thanks-enabled']) {
        Push.send({
          from: 'push',
          title: 'Ktoś podziękował Ci za zgłoszenie.',
          text: numThanks(user.incoming.thanks),
          query: {
            userId: submitterId
          }
        });
      }
    }

    Reports.update(docId, {$addToSet: {thanks: this.userId}});
  },
  upvoteReport: function(docId, submitterId) {
    if (Meteor.isServer) {
      Meteor.users.update(submitterId, { $inc: {'incoming.confirms': 1} });
    }
    // Cap weight to maxWeight
    var doc = Reports.findOne({_id: docId});
    Reports.update(docId, {
      $addToSet: {confirms: this.userId},
      $set: {weight: Math.min(doc.weight + upvoteWeight, maxWeight)}
    });
  },
  downvoteReport: function(docId, submitterId) {
    if (Meteor.isServer) {
      Meteor.users.update(submitterId, { $inc: {'incoming.clears': 1} });
    }
    Reports.update(docId, {
      $addToSet: {clears: this.userId},
      $inc: {weight: downvoteWeight}
    });
  },
  removeReport: function(docId) {
    Reports.update(docId, {
      $set: {
        expired: true,
        removed: true
      }
    });
  }
});
