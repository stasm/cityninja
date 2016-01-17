Template.settings.onCreated(trackPageView);
Template.settings.onRendered(function() {
  var tags = makeTagInput('#observed-tags');

  var user = Meteor.user();
  if (!user) {
    return;
  }

  user.profile.favs.forEach(function(key) {
    tags.materialtags('add', {
      key: key,
      name: Tags.findOne({key}).name
    });
  });

  tags.on('itemAdded', function(evt) {
    trackEvent('Profile', 'Added a fav', evt.item.key);
    Meteor.call('achieve', 'fav1');
    Meteor.users.update(Meteor.userId(), {
      $addToSet: { 'profile.favs': evt.item.key }
    }, (msg = 'Dodano do obserwowanych') => console.log(msg));
  });

  tags.on('itemRemoved', function(evt) {
    trackEvent('Profile', 'Removed a fav', evt.item.key);
    Meteor.users.update(Meteor.userId(), {
      $pull: { 'profile.favs': evt.item.key }
    }, (msg = 'Usunięto z obserwowanych') => console.log(msg));
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
