Template.line.onCreated(function() {
  this.subscribe('reports');
});

Template.line.helpers({
  numReports: function(line) {
    return numReports(line);
  }
});
