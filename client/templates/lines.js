Template.lines.helpers({
  lines: function(lineType) {
    if (!viewingFavs()) {
      return lines[lineType];
    }

    var favs = getFavs();
    return lines[lineType].filter(function(elem) {
      return favs.lines.indexOf(elem.name) !== -1;
    });
  },
  viewingAll: function() {
    return !viewingFavs();
  }
});
