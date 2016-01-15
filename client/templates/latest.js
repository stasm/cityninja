Template.latest.onCreated(trackPageView);
Template.latest.onRendered(flushQueuedToasts);
Template.latest.onRendered(observeComments);

function observeComments() {
  Reports.find(buildQuery()).observeChanges({
    changed(_, fields) {
      Tracker.afterFlush(() => {
        const id = fields.lastComment.createdAt.valueOf();
        const commentCard = document.getElementById(id);
        commentCard.classList.remove('nj-card--new');
        // trigger reflow to be able to add the 'new' class
        commentCard.offsetWidth = commentCard.offsetWidth;
        commentCard.classList.add('nj-card--new');
      });
    }
  });
}

function buildQuery() {
  return {
    expired: {$ne: true},
    removed: {$ne: true},
    dismissedBy: {$ne: Meteor.user()}
  };
}

Template.latest.helpers({
  isPSA: isPSA,
  items: () => {
    const query = buildQuery();
    return [
      ...Announcements.find(query).fetch(),
      ...Reports.find(query, {sort: {createdAt: -1}}).fetch()
    ];
  }
});
