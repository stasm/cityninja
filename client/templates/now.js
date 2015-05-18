Meteor.subscribe('reports');

function getReports() {
  return Reports.find({
    expired: false,
  }, { sort: {createdAt: -1}});
}

Template.now.helpers({
  noReports: function() {
    return getReports().count() === 0;
  },
  reports: getReports
});
