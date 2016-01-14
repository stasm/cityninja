Template.detail.onCreated(trackPageView);

Template.detail.helpers({
  isTweet: isTweet,
});

Template.detail.events({
  'keyup #commentText': function(evt, template) {
    const input = template.find('#commentText');
    const button = template.find('.add-comment');
    const method = input.value.trim() ?
      'remove' : 'add';
    button.classList[method]('disabled');
  },
  'submit form': function(evt) {
    evt.preventDefault();
    const input = evt.currentTarget.querySelector('#comment-text');
    const text = input.value.trim();

    if (!text) {
      toast(pickRandom(toasts.emptyComment));
      return;
    }

    const reportId = evt.currentTarget.querySelector('#report-id').value;
    Meteor.call('commentReport', reportId, text);
    evt.currentTarget.reset();
  },
});
