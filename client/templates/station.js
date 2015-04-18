Meteor.subscribe("reports");

Template.station.events({
  'click .station-name': function(event) {
    $('#create h4').text(this.name);
    $('#create').openModal();
  }
});

Template.station.helpers({
  reports: function() {
    return Reports.find({
      location: this.name,
      line: currentLine(),
      expired: false
    });
  }
});
