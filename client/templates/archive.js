Template.archive.onCreated(trackPageView);
Template.archive.onRendered(flushQueuedToasts);
Template.archive.onRendered(function() {
  $('img, div.fab').on('dragstart', function(event) {
    event.preventDefault();
  });
});

Template.archive.helpers({
  items: function() {
    return Reports.find({
      $or: [
        {expired: true},
        {dismissedBy: Meteor.userId()}
      ]
    }, {
      sort: {
        createdAt: -1
      }
    });
  },
});
