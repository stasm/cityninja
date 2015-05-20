Meteor.subscribe("reports");

Template.create.helpers({
  reportTypes: function() {
    return reportTypes[Router.current().params.type];
  }
});

Template.create.events({
  'click .close': function(event) {
    $('#create').closeModal();
  },
  'click .report': function(event, template) {
    var modal = template.$('#create');
    var location = template.$('#create .station').text();
    var params = Router.current().params;
    var line = params.line;
    var dir = params.dir;

    // Does a similar report already exist?
    var existingReport = Reports.findOne({
      name: this.name,
      location: location,
      line: line,
      dir: dir
    });

    // If so and we can upvote, we do
    if (existingReport) {
      if(canUpvote(existingReport._id)) {
        Meteor.call("upvoteReport", existingReport._id);
        // Avoid future upvotes
        Session.setPersistent(existingReport._id, 'upvoted');
      }
    } else { // Create a new report
      Meteor.call(
        "saveReport", this.name, location, line, dir, function(err, report) {
        // Avoid future upvotes
        Session.setPersistent(report, 'created');
      });
    }
    modal.closeModal();
    Materialize.toast("Dzięki!", 2000);
  }
});
