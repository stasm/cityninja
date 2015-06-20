Template.settings.onCreated(trackPageView);

Template.settings.helpers({
  isChecked: function(name) {
    return Meteor.user().profile[name] ? 'checked' : null;
  },
  isDisabled: function() {
    return Meteor.user().profile['push-new-enabled'] ? null : 'disabled';
  }
});

Template.settings.events({
  'change input': function(evt) {
    var settingName = evt.currentTarget.dataset.setting;
    trackEvent('Profile', 'Toggled setting', settingName);
    var set = {};
    set['profile.' + settingName] = evt.currentTarget.checked;
    Meteor.users.update(Meteor.userId(), {
      $set: set
    });
  },
});
