Template.index.onCreated(trackPageView);
Template.index.helpers({
  showFavInfo: function() {
    return viewingFavs() && !hasFavs();
  },
});

Template.tabs.onRendered(function() {
  $('ul.tabs').tabs();
});

Template.tabs.helpers({
  currentTab: function(name) {
    return Session.equals('current tab', name);
  }
});

Template.tabs.events({
  'click .tab a': function(evt) {
    var route = evt.target.dataset.route;
    Session.set('current tab', route);
    window.history.replaceState(route, null, route);
    trackPageView(route);
  }
});
