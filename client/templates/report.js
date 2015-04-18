Meteor.subscribe("reports");

canUpvote = function(docId) {
  if (docId == null) return true;
  return Session.get(docId) == null;
}

Template.report.helpers({
  canUpvote: canUpvote,
  positive: function(reportName) {
    return (reportName === 'Wszystko OK');
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
  }
});

Template.report.events({
  'click .create-nonetheless': function(event) {
    $('#create').data('location', this.location).openModal();
  }
});

Template.report.events({
  'click .modal-trigger': function(e) {
    $('#locationInput').val(this.location);
  }
});
