Template.reportDetail.onCreated(trackPageView);

Template.reportDetail.helpers({
  isSource: isSource,
});

function sendComment(evt, template) {
  evt.preventDefault();
  const input = template.find('#commentText');
  const text = input.value.trim();

  if (!text) {
    toast(pickRandom(toasts.emptyComment));
    return;
  }

  Meteor.call('commentReport', template.find('#reportId').value, text);
  input.value = '';
}

Template.reportDetail.events({
  'keyup #commentText': function(evt, template) {
    const input = template.find('#commentText');
    const button = template.find('.add-comment');
    const method = input.value.trim() ?
      'remove' : 'add';
    button.classList[method]('disabled');
  },
  'keypress #commentText': function(evt, template) {
    if (evt.which === 13) {
      return sendComment(evt, template);
    }
  },
  'click .add-comment': sendComment
});
