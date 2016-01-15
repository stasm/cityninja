Template.latest.onCreated(trackPageView);
Template.latest.onRendered(flushQueuedToasts);
Template.latest.onRendered(observeComments);

function observeComments() {
  const observer = Reports.find(buildQuery()).observeChanges({
    added(id) {
      if (!observer) {
        return;
      }

      Tracker.afterFlush(() => {
        const card = document.getElementById(id);
        card.classList.add('nj-card--new');
      });
    },
    changed(_, fields) {
      Tracker.afterFlush(() => {
        if (!observer || !fields.lastComment) {
          return;
        }

        const id = fields.lastComment.createdAt.valueOf();
        const card = document.getElementById(id);
        card.classList.remove('nj-card--new');
        // trigger reflow to be able to add the 'new' class
        card.offsetWidth = card.offsetWidth;
        card.classList.add('nj-card--new');
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
