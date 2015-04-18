Meteor.subscribe("reports");

Template.create.helpers({
  reportTypes: function() {
    return reportTypes[currentTransitType()];
  }
});

Template.create.events({
  'click .collection-item': function(event, template) {
    var modal = template.$('#create');
    var location = template.$('#create h4').text();
    var line = currentLine();

    // Does a similar report already exist?
    var existingReport = Reports.findOne({
      name: this.name,
      location: location,
      line: line
    });

    // If so and we can upvote, we do
    if (existingReport) {
      if(canUpvote(existingReport._id)) {
        Meteor.call("upvoteReport", existingReport._id);
        // Avoid future upvotes
        Session.setPersistent(existingReport._id, 'upvoted');
      }
    } else { // Create a new report
      Meteor.call("saveReport", this.name, location, line, function(err, report) {
        // Avoid future upvotes
        Session.setPersistent(report, 'created');
      });
    }
    modal.closeModal();
    Materialize.toast("Dzięki!", 2000);
  }
});
