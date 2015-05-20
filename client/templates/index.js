Meteor.subscribe("reports");

Template.index.onRendered(function() {
  $('ul.tabs').tabs();
});

Template.index.events({
  'click .tab a': function(evt) {
    var route = evt.target.dataset.route;
    window.history.replaceState(route, null, route);

  }
});
