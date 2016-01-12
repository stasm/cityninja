Template.feed.onCreated(trackPageView);
Template.feed.onRendered(flushQueuedToasts);
// XXX fix pan up
// Template.feed.onRendered(WebPullToRefresh.init);
Template.feed.onRendered(function() {
  $('img, div.fab').on('dragstart', function(event) {
    event.preventDefault();
  });
});

function buildQuery() {
  return {
    expired: { $ne: true },
    removed: { $ne: true },
    dismissedBy: { $ne: Meteor.user() }
  };
}

function getReports(query) {
  return Reports.find(query, {
    sort: {
      createdAt: -1
    }
  });
}

Template.feed.helpers({
  hasReports: function() {
    var query = buildQuery();
    return getReports(query).count() + Announcements.find(query).count();
  },
  pinneditems: function() {
    return Announcements.find(buildQuery());
  },
  otheritems: function() {
    return getReports(buildQuery());
  },
});
