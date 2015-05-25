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

Template.feed.helpers({
  reports: getReports,
});
