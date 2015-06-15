Template.landing.events({
  'click .cta': function(evt) {
    evt.stopImmediatePropagation();
    var offset = $('#install').offset().top + 1;
    $("html, body").animate({ scrollTop: offset + 'px' });
  },
});
