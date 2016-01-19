Meteor.startup(function() {
  $('html').attr('lang', 'pl');

  if (Meteor.isCordova) {
    document.addEventListener("backbutton", function() {
      if (window.location.pathname === '/live') {
        window.plugins.Suspend.suspendApp();
      } else {
        window.history.back();
      }
    }, false);

    document.addEventListener('deviceready', function() {
      if (device.platform === 'iOS' && parseFloat(device.version) >= 7.0) {
        $(document.body).css('margin-top', '20px');
        $('.nj-latest__header-row').css('top', '20px');
      }
    }, false);
  }
});

trackPageView = function(url) {
  _paq.push(['trackPageView', url || Router.current().url]);
};

trackEvent = function(cat, action, name) {
  _paq.push(['trackEvent', cat, action, name]);
};
