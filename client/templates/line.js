Template.line.onCreated(function() {
  this.subscribe('reports');
});

Template.line.helpers({
  noFavs: function() {
    return !Session.get('favs count');
  },
  isFav: function(line, dir) {
    // if no line is a fav, all are
    return !Session.get('favs count') || Session.get('fav ' + line + dir);
  },
  badReportCategories: function(type, line, dir) {
    return reportCategories.filter(function(category) {
      if (category.name === 'normal') {
        return false;
      }

      return numReports(line, dir, category.name, type);
    });
  }
});
