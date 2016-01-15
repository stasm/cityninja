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
  'submit form': function(evt, template) {
    evt.preventDefault();
    const input = template.find('#comment-text');
    const text = input.value.trim();

    if (!text) {
      toast(pickRandom(toasts.emptyComment));
      return;
    }

    const reportId = template.find('#report-id').value;
    Meteor.call('commentReport', reportId, text);

    evt.currentTarget.reset();
    Meteor.setTimeout(() => {
      const comments = template.find('.nj-detail__comments');
      comments.scrollTop = comments.scrollHeight;
    });
  },
});
