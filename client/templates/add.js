Template.newReport.onCreated(trackPageView);
Template.newReport.onRendered(function() {
  makeTagInput('input#stop');
});

Template.newReport.helpers({
  seenHint: function() {
    return Session.get('user has seen the new report hint');
  }
});

Template.newReport.events({
  'click .understood': function(evt) {
    evt.preventDefault();
    Session.setPersistent('user has seen the new report hint', true);
  },
  'click input#stop-display': function(evt) {
    evt.preventDefault();
    $('#pick-stop').openModal();
  },
  'click .close-modal': function(evt) {
    evt.preventDefault();
    $('#pick-stop').closeModal();
  },
  'submit form': function(evt) {
    evt.preventDefault();
    Meteor.call(
      'createReport',
      evt.target.text.value,
      evt.target.tags.value.split(',').filter(nonEmpty));
    queuedToasts.push(pickRandom(toasts.created));
    Router.go('feed.all');
  },
});

nonEmpty = function(tag) {
  return tag.length !== 0;
};
