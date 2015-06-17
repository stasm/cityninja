Template.fab.helpers({
  reportTypes: function() {
    return reportTypes.common;
  }
});

Template.fab.events({
  'click .btn-floating': function(evt) {
    evt.currentTarget.parentNode.classList.remove('no-anim');
    evt.currentTarget.parentNode.classList.toggle('collapsed');
    evt.currentTarget.parentNode.classList.toggle('expanded');
  },
  'click .dimmer': function(evt) {
    evt.currentTarget.parentNode.classList.toggle('collapsed');
    evt.currentTarget.parentNode.classList.toggle('expanded');
  }
});

