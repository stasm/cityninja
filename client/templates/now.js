Meteor.subscribe('reports');

function getReports() {

  var query = {
    expired: false
  };

  if (viewingFavs()) {
    var favs = getFavs();
    query.line = {
      $in: favs.lines
    };
    query.dir = {
      $in: favs.dirs
    };
  }

  return Reports.find(query, { sort: {createdAt: -1}});
}

Template.now.helpers({
  noReports: function() {
    return getReports().count() === 0;
  },
  reports: getReports
});
