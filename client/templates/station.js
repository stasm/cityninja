openCreateModal = function(loc) {
  var params = Router.current().params;
  var icon = lines[params.type].filter(function(elem) {
    return elem.name === params.line;
  })[0].icon;

  $('#create .circle').addClass(icon);
  $('#create .station').text(loc);
  $('#create').openModal();
  $('body').addClass('modal-open');
  $('#lean-overlay').on('click', reenableScrolling);
};

Template.station.events({
  'click .flag': function() {
    return openCreateModal(this.name);
  }
});

Template.station.helpers({
  reports: function() {
    var params = Router.current().params;
    return Reports.find({
      location: this.name,
      line: params.line,
      dir: params.dir,
      expired: false
    });
  }
});
