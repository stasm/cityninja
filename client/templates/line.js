Template.line.onCreated(function() {
  this.subscribe('reports');
});

Template.line.helpers({
  noFavs: function() {
    return !Session.get('favs count');
  },
  isFav: function(dir) {
    // if no line is a fav, all are
    return !Session.get('favs count') || Session.get('fav ' + dir);
  },
  badReportCategories: function(dir, type) {
    return reportCategories.filter(function(category) {
      if (category.name === 'normal') {
        return false;
      }

      return numReports(dir, category.name, type);
    });
  }
});
