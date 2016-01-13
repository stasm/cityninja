Template.latest.onCreated(trackPageView);
Template.latest.onRendered(flushQueuedToasts);

Template.latest.helpers({
  isPSA: isPSA,
  items: () => {
    const query = {
      expired: {$ne: true},
      removed: {$ne: true},
      dismissedBy: {$ne: Meteor.user()}
    };
    return [
      ...Announcements.find(query).fetch(),
      ...Reports.find(query, {sort: {createdAt: -1}}).fetch()
    ];
  }
});
