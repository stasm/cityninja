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
    $('#create').closeModal();
  },
  'click .report': function(event, template) {
    var modal = template.$('#create');
    var location = template.$('#create .station').text();
    var params = Router.current().params;

    createReport(this.name, params.line, params.dir, location);

    reenableScrolling();
    modal.closeModal();
  }
});
