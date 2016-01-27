Template.editReport.onCreated(trackPageView);
Template.editReport.onRendered(function() {
  var tags = makeTagInput('#edit-report-tags');
  this.data.tags.forEach(
    tag => tags.materialtags('add', tag)
  );
});

Template.editReport.events({
  'keyup [type="text"]': function(_, template) {
    checkValid(template.find('form'));
  },
  'submit form': function(evt) {
    evt.preventDefault();
    Meteor.call('updateReport', this._id, Router.current().params.token, {
      text: evt.target['edit-report-text'].value,
      tags: $('#edit-report-tags').materialtags('items'),
    });
    queuedToasts.push([pickRandom(toasts.created)]);
    Router.go('feed.all');
  },
});

Template.editAnnouncement.events({
  'submit form': function(evt) {
    evt.preventDefault();
    Meteor.call(
      'updateAnnouncement', this._id, Router.current().params.token, {
        aux: evt.target.aux.value,
        text: evt.target.text.value,
        dismisslabel: evt.target.dismisslabel.value,
        ctalabel: evt.target.ctalabel.value,
        ctaroute: evt.target.ctaroute.value,
      });
    queuedToasts.push([pickRandom(toasts.created)]);
    Router.go('feed.all');
  },
});
