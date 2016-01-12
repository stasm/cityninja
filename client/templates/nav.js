Template.nav.events({
  'click .logo': function(evt) {
    $("html, body").animate({ scrollTop: "0px" });
  }
});

Template.nav.onRendered(function() {
  $('.menu').sideNav({
    menuWidth: 200,
    edge: 'left',
    closeOnClick: true
  });
});
