Template.line.onCreated(function() {
  this.subscribe('reports');
});

Template.line.helpers({
  isFav: function(directions) {
    // spacial case for no favs: expand all lines
    if (!Session.get('favs count')) {
      return true;
    }
    return directions.some(function(dir) {
      return Session.get('fav ' + dir.path);
    });
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
