Template.nav.helpers({
  viewingFavs: function() {
    return viewingFavs() ? 'checked' : null;
  }
});

Template.nav.events({
  'change .show-favs': function(evt) {
    Session.setPersistent('viewing favs', evt.target.checked);
  },
  'click .logo': function(evt) {
    $("html, body").animate({ scrollTop: "0px" });
  }
});

Template.nav.onRendered(function() {
  $('.more').dropdown({
    inDuration: 300,
    outDuration: 225,
    constrain_width: false,
    belowOrigin: true,
    gutter: 0,
  });
});
