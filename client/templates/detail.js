Template.detail.onCreated(trackPageView);
Template.detail.onRendered(autofocus);
Template.detail.onRendered(observeComments);

function observeComments() {
  Reports.find(this.data._id).observeChanges({
    changed(_, fields) {
      Tracker.afterFlush(() => {
        if (!fields.lastComment) {
          return;
        }

        const id = fields.lastComment.createdAt.valueOf();
        const commentCard = document.getElementById(id);
        commentCard.classList.add('nj-card--new');

        const comments = document.querySelector('.nj-detail__comments');
        comments.scrollTop = comments.scrollHeight;
      });
    }
  });
}

Template.detail.helpers({
  isTweet: isTweet,
});

Template.detail.events({
  'keyup [type="text"]': function(_, template) {
    checkValid(template.find('form'));
  },
  'submit form': function(evt, template) {
    evt.preventDefault();
    const input = template.find('#comment-text');
    const text = input.value.trim();

    const reportId = template.find('#report-id').value;
    Meteor.call('commentReport', reportId, text);

    evt.currentTarget.reset();
  },
});
