Template.newFeedback.onCreated(trackPageView);
Template.newFeedback.onRendered(autofocus);
Template.newFeedback.events({
  'keyup [type="text"]': function(_, template) {
    checkValid(template.find('form'));
  },
  'submit form': function(evt) {
    evt.preventDefault();
    Meteor.call(
      'createFeedback',
      evt.target['new-feedback-text'].value);
    queuedToasts.push([pickRandom(toasts.feedback)]);
    Router.go('feed.all');
  },
});
