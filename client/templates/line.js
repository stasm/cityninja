Template.line.events({
  'click .collapsible-header': function(evt) {
    $(evt.target).toggleClass('active')
      .parent().toggleClass('active');
  },
  'click .collection-item': function(evt) {
    var url = $(evt.target).find("a").attr("href");
    Router.go(url);
  },
});

Template.line.helpers({
  viewingFavs: function() {
    return viewingFavs();
  },
  isHidden: function(line, dir) {
    return viewingFavs() && !isFav(line, dir);
  },
  hasBadReports: function(type, line, dir) {
    return reportCategories.reduce(function(sum, cur) {
      if (cur.name === 'normal') {
        return sum;
      }

      return sum + numReports(line, dir, cur.name, type);
    }, 0);
  }
});
