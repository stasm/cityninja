reenableScrolling = function() {
  $('body').removeClass('modal-open');
};

Template.create.helpers({
  reportTypes: function() {
    return reportTypes[Router.current().params.type];
  }
});

Template.create.events({
  'click .close': function(event) {
    reenableScrolling();
    trackEvent('Create modal', 'Close');
    $('#create').closeModal();
  },
  'click .report': function(event, template) {
    var modal = template.$('#create');
    var location = template.$('#create .station').text();
    var params = Router.current().params;

    trackEvent('Report', 'Created in modal');
    trackEvent('Create modal', 'Report created');
    createReport(this.name, params.line, params.dir, location);

    reenableScrolling();
    modal.closeModal();
  }
});
