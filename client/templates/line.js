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
  numReports: function(direction) {
    return numReports(direction);
  }
});
