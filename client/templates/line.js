Meteor.subscribe('reports');

Template.line.helpers({
  numReports: function(line) {
    return numReports(line);
  }
});
