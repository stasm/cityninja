Meteor.subscribe("reports");

canUpvote = function(docId) {
  return docId === undefined ?
    false : Session.equals(docId, undefined);
};

canRemove = function(docId, createdAt) {
  return Session.equals(docId, 'created') &&
    Date.now() - new Date(createdAt) < 1000 * 60 * 5;
};

Template.report.helpers({
  canUpvote: canUpvote,
  canRemove: canRemove,
  positive: function(reportName) {
    return (reportName === 'Wszystko OK');
  },
  icon: function(name) {
    var repType = allReportTypes.filter(function(elem) {
      return elem.name === name;
    })[0];
    return repType.icon;
  }
});

Template.report.events({
  // Upvote the current event
  'click .upvote': function() {
    if (canUpvote(this._id)) {
      // Prevent future upvotes
      Session.setPersistent(this._id, 'upvoted');
      Meteor.call("upvoteReport", this._id);
      Materialize.toast("Dzięki!", 2000);
    }
  },
  'click .downvote': function() {
    if (canUpvote(this._id)) {
      // Prevent future downvotes
      Session.setPersistent(this._id, 'downvoted');
      Meteor.call("downvoteReport", this._id);
      Materialize.toast("Dzięki!", 2000);
    }
  },
  'click .remove': function() {
    if (canRemove(this._id, this.createdAt)) {
      Session.clear(this._id);
      Meteor.call("removeReport", this._id);
      Materialize.toast("Puff!", 2000);
    }
  },
});

Template.report.events({
  'click .create-nonetheless': function() {
    return openModal(this.location);
  }
});
