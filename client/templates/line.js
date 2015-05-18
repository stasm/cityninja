Template.landing.rendered = function() {

  $(".collapsible-header").click(function() {
    $(this).toggleClass('active')
      .parent().toggleClass('active');
  });

  // Make whole div with line clickable
  $(".collection-item").click(function() {
    var url = $(this).find("a").attr("href");
    Router.go(url);
    return false;
  });
};

Template.line.helpers({
  hasBadReports: function(type, line, dir) {
    return reportCategories.reduce(function(sum, cur) {
      if (cur.name === 'normal') {
        return sum;
      }

      return sum + numReports(line, dir, cur.name, type);
    }, 0);
  }
});
