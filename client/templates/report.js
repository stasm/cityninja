Template.reportDetail.onCreated(trackPageView);

Template.reportDetail.helpers({
  isSource: isSource,
});

function sendComment(evt, template) {
  evt.preventDefault();
  var input = template.find('#commentText');

  if (input.value === '') {
    toast(pickRandom(toasts.emptyComment));
    return;
  }

  Meteor.call(
    'commentReport',
    template.find('#reportId').value,
    input.value);

    input.value = '';
    toast(pickRandom(toasts.commented));
}

Template.reportDetail.events({
  'keyup #commentText': function(evt, template) {
    var input = template.find('.add-comment');
    var method = input.value === '' ?
      'add' : 'remove';
    input.classList[method]('disabled');
  },
  'keypress #commentText': function (evt, template) {
    if (evt.which === 13) {
      sendComment(evt, template);
    }
  },
  'click .add-comment': sendComment
});
