Template.newReport.onCreated(trackPageView);
Template.newReport.onRendered(function() {
  // makeTagInput('input#stop');
});

Template.newReport.helpers({
  seenHint: function() {
    return Session.get('user has seen the new report hint');
  }
});

Template.newReport.events({
  'click .nj-new-report__understood': function(evt) {
    evt.preventDefault();
    Session.setPersistent('user has seen the new report hint', true);
  },
  'submit form': function(evt) {
    evt.preventDefault();
    Meteor.call(
      'createReport',
      evt.target['new-report-text'].value);
      // evt.target['new-report-tags'].value.split(',').filter(nonEmpty));
    queuedToasts.push(pickRandom(toasts.created));
    Router.go('feed.all');
  },
});

nonEmpty = function(tag) {
  return tag.length !== 0;
};
