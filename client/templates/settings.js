Template.settings.onCreated(trackPageView);
Template.settings.onRendered(function() {
  var tags = makeTagInput('#observed-tags-view');

  Tracker.autorun(updateTagInputs);

  tags.on('itemRemoved', function(evt) {
    trackEvent('Profile', 'Removed a fav', evt.item.key);
    Meteor.users.update(Meteor.userId(), {
      $pull: { 'profile.favs': evt.item.key }
    });
  });
});

Template.settings.helpers({
  isChecked(name) {
    const user = Meteor.user();
    return (user && user.profile[name]) ?
      'checked' : null;
  },
});

Template.settings.events({
  'click .nj-tagsinput--trigger': function(evt) {
    evt.stopImmediatePropagation();
    evt.preventDefault();

    openModal('.nj-modal');
    updateTagInputs();
    $('.nj-settings-obs .tt-input').focus();
  },
  'change input': function(evt) {
    const settingName = evt.currentTarget.getAttribute('id');
    trackEvent('Profile', 'Toggled setting', settingName);
    Meteor.users.update(Meteor.userId(), {
      $set: {
        ['profile.' + settingName]: evt.currentTarget.checked,
      }
    });
  },
});

Template.settingsObserved.onRendered(function() {
  var tags = makeTagInput('#observed-tags-edit');

  tags.on('itemAdded', function(evt) {
    trackEvent('Profile', 'Added a fav', evt.item.key);
  });

  tags.on('itemRemoved', function(evt) {
    trackEvent('Profile', 'Removed a fav', evt.item.key);
  });
});

Template.settingsObserved.events({
  'click .nj-settings-obs__back': function(evt, template) {
    closeModal('.nj-modal');
  },
  'click .nj-settings-obs__done': function(evt, template) {
    closeModal('.nj-modal');
    const tagsinput = $(template.find('#observed-tags-edit'));
    const keys = tagsinput.materialtags('items').map(
      tag => tag.key);
    if (keys.length) {
      Meteor.call('achieve', 'fav1');
    }
    Meteor.users.update(Meteor.userId(), {
      $set: { 'profile.favs': keys }
    });
  },
});
