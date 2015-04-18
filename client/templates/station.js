Meteor.subscribe("reports");

Template.station.events({
  'click .station-name': function(event) {
    $('#create').data('location', this.name).openModal();
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
