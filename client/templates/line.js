Template.line.events({
  'click .collapsible-header': function(evt) {
    var header = $(evt.currentTarget);

    Session.set(
      'expanded ' + evt.currentTarget.dataset.line,
      !header.hasClass('active'));

    header.toggleClass('active')
      .parent().toggleClass('active');
  },
  'click .collection-item': function(evt) {
    var url = $(evt.currentTarget).find("a").attr("href");
    Router.go(url);
  },
});

Template.line.helpers({
  isExpanded: function(line) {
    return viewingFavs() || Session.get('expanded ' + line);
  },
  isHidden: function(line, dir) {
    return viewingFavs() && !isFav(line, dir);
  },
  numReports: numReports
});
