Template.landing.rendered = function() {

  $(".collapsible-header").click(function() {
    $(this).toggleClass('active')
      .parent().toggleClass('active');
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
