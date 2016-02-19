Meteor.startup(function() {
  $('html').attr('lang', 'pl');

  if (Meteor.isCordova) {
    document.addEventListener("backbutton", function() {
      if (window.location.pathname === '/') {
        window.plugins.Suspend.suspendApp();
      } else {
        window.history.back();
      }
    }, false);
  }
});

trackPageView = function() {
  // XXX work around https://github.com/iron-meteor/iron-router/issues/1152
  const base = Meteor.absoluteUrl().slice(0, -1);
  const path = Router.current().url.replace(base, '');
  _paq.push(['trackPageView', base + path]);
};

trackEvent = function(cat, action, name) {
  _paq.push(['trackEvent', cat, action, name]);
};
