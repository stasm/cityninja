Meteor.subscribe("reports");

Template.index.rendered = function() {
  $('ul.tabs').tabs();
};
