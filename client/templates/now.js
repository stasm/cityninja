Template.now.onCreated(function() {
  this.subscribe('reports');
});

function getReports(gtMin, ltMin) {
  var now = Date.now();
  return Reports.find({
    expired: false,
    createdAt: {
      $gte: new Date(now - 1000 * 60 * gtMin),
      $lt: new Date(now - 1000 * 60 * ltMin)
    }
  });
}

Template.now.helpers({
  noReports: function() {
    return Reports.find({
      expired: false
    }).count() === 0;
  },
  reports: getReports,
  hasReports: function(gtMin, ltMin) {
    return getReports(gtMin, ltMin).count() !== 0;
  }
});
