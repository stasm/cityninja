Template.latest.onCreated(trackPageView);
Template.latest.onRendered(flushQueuedToasts);
Template.latest.onRendered(observeComments);
Template.latest.onDestroyed(function() {
  this.observer.stop();
});

function observeComments() {
  this.observer = Reports.find({
    expired: {$ne: true},
    removed: {$ne: true},
    dismissedBy: {$ne: Meteor.user()}
  }).observeChanges({
    added: (id) => {
      if (!this.observer) {
        return;
      }

      Tracker.afterFlush(() => {
        const card = document.getElementById(id);
        card.classList.add('nj-card--new');
      });
    },
    changed: (_, fields) => {
      Tracker.afterFlush(() => {
        if (!this.observer || !fields.lastComment) {
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

function unobserveComments() {
  this.observer.stop();
}

Template.latest.helpers({
  isPSA: isPSA,
  items: () => [
    ...Announcements.find({
      published: true,
      _id: {$nin: Meteor.user().profile.ignored.announcements},
    }).fetch(),
    ...Reports.find({
      expired: {$ne: true},
      removed: {$ne: true},
      dismissedBy: {$ne: Meteor.user()},
    }, {sort: {createdAt: -1}}).fetch()
  ],
});
