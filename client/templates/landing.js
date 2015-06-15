Template.landing.events({
  'click .install-link': function(evt) {
    evt.stopImmediatePropagation();
    var offset = $('#install').offset().top + 1;
    $("html, body").animate({ scrollTop: offset + 'px' });
  },
});
