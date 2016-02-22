Template.settings.onCreated(trackPageView);
Template.settings.onRendered(function() {
  const tags = makeTagInput('#observed-tags-view');
  tags.on('itemRemoved', function(evt) {
    trackEvent('Profile', 'Settings: Removed a fav', evt.item.key);
    Meteor.users.update(Meteor.userId(), {
      $pull: { 'profile.favs': evt.item.key }
    });
  });

  Tracker.autorun(updateTagInputs);
});

Template.settings.helpers({
  isChecked(name) {
    const user = Meteor.user();
    return (user && user.profile[name]) ?
      'checked' : null;
  },
});

Template.settings.events({
  'change input[type="checkbox"]': function(evt) {
    const settingName = evt.currentTarget.getAttribute('id');
    trackEvent('Profile', 'Settings: Toggled setting', settingName);
    Meteor.users.update(Meteor.userId(), {
      $set: {
        ['profile.' + settingName]: evt.currentTarget.checked,
      }
    });
  },
  'click .nj-tagsinput--fake .nj-tagsinput__label': function(evt) {
    Router.current().state.set('modal-obs-active', true);
  },
});

/* Observed modal */

Template.settingsObserved.onRendered(function() {
  const tags = makeTagInput('#observed-tags-edit');
  $('.nj-settings-obs .tt-input').focus();
  tags.on('itemAdded', function(evt) {
    trackEvent('Profile', 'Settings: Added a fav', evt.item.key);
  });

  tags.on('itemRemoved', function(evt) {
    trackEvent('Profile', 'Settings: Removed a fav', evt.item.key);
  });

  Tracker.autorun(updateTagInputs);
});

Template.settingsObserved.events({
  'click .nj-settings-obs__back': function(evt, template) {
    Router.current().state.set('modal-obs-active', false);
  },
  'click .nj-settings-obs__done': function(evt, template) {
    const tagsinput = $(template.find('#observed-tags-edit'));
    const keys = tagsinput.materialtags('items').map(
      tag => tag.key);
    if (keys.length) {
      Meteor.call('achieve', 'fav1');
    }
    Meteor.users.update(Meteor.userId(), {
      $set: { 'profile.favs': keys }
    });
    Router.current().state.set('modal-obs-active', false);
  },
});
