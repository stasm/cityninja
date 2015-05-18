Meteor.subscribe("reports");

Template.station.events({
  'click .flag': function(event) {
    $('#create .station').text(this.name);
    $('#create').openModal();
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
