Template.landing.onCreated(trackPageView);

Template.landing.events({
  'click .install-link': function(evt) {
    evt.stopImmediatePropagation();
    evt.preventDefault();
    var offset = $('#install').offset().top + 1;
    $("html, body").animate({ scrollTop: offset + 'px' });
  },
  'click .google-play': function() {
    trackEvent('Conversion', 'Clicked', 'Google Play');
  },
});
