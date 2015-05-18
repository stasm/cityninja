Template.landing.rendered = function() {

  // Collapsible lines
  $('.collapsible').collapsible({
    accordion : false // expandable
  });

  // Make whole div with line clickable
  $(".collapsible-body").click(function() {
    window.location = $(this).find("a").attr("href");
    return false;
  });
};

Template.landing.helpers({
  lines: function(lineType) {
    return lines[lineType];
  }
});
