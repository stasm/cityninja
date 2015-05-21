Meteor.subscribe("reports");

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
        Session.setPersistent(existingReport._id + ' voted', 'up');
        Meteor.call("upvoteReport", existingReport._id);
      }
    } else { // Create a new report
      Meteor.call(
        "saveReport", this.name, location, line, dir, function(err, docId) {
        Session.setPersistent(docId + ' created', true);
      });
    }
    reenableScrolling();
    modal.closeModal();
    Materialize.toast("Dzięki!", 2000);
  }
});
