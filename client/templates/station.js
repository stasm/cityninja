Meteor.subscribe("reports");

Template.station.events({
  'click .flag': function(event) {
    var params = Router.current().params;
    var icon = lines[params.type].filter(function(elem) {
      return elem.line === params.line;
    })[0].icon;

    $('#create .circle').addClass(icon);
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
