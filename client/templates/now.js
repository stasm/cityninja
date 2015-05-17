Template.now.onCreated(function() {
  this.subscribe('reports');
});

Template.now.helpers({
  reports: function () {
    return Reports.find({
      expired: false
    });
  },
});
