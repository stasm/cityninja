Template.editReport.onCreated(trackPageView);
Template.editReport.onRendered(function() {
  var tags = makeTagInput('input#tags');
  this.data.tags.forEach(function(tag) {
    tags.materialtags('add', {
      id: tag,
      name: ztm[tag].name
    });
  });
});

Template.editReport.events({
  'submit form': function(evt) {
    evt.preventDefault();
    Meteor.call(
      'updateReport', this._id, Router.current().params.token, {
        text: evt.target.text.value,
        tags: evt.target.tags.value.split(',').filter(nonEmpty)
      });
    toast(pickRandom(toasts.created));
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
    toast(pickRandom(toasts.created));
  },
});
