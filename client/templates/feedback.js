Template.newFeedback.onCreated(trackPageView);
Template.newFeedback.events({
  'submit form': function(evt) {
    evt.preventDefault();
    Meteor.call(
      'createFeedback',
      evt.target['new-feedback-text'].value);
    queuedToasts.push(pickRandom(toasts.feedback));
    Router.go('feed.all');
  },
});
