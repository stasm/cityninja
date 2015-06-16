Template.index.helpers({
  showFavInfo: function() {
    return viewingFavs() && !hasFavs();
  },
  reportTypes: function() {
    return reportTypes.common;
  }
});

Template.index.events({
  'click .btn-floating': function(evt) {
    evt.currentTarget.parentNode.classList.remove('no-anim');
    evt.currentTarget.parentNode.classList.toggle('collapsed');
    evt.currentTarget.parentNode.classList.toggle('expanded');
  }
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
  }
});
