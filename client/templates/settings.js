Template.settings.onCreated(trackPageView);
Template.settings.onRendered(function() {
  var tags = makeTagInput('input#tags');

  var user = Meteor.user();
  if (!user) {
    return;
  }

  user.profile.favs.forEach(function(fav) {
    tags.materialtags('add', {
      id: fav,
      name: ztm[fav].name
    });
  });

  tags.on('itemAdded', function(event) {
    trackEvent('Profile', 'Added a fav', event.item.id);
    Meteor.call('achieve', 'fav1');
    Meteor.users.update(Meteor.userId(), {
      $addToSet: { 'profile.favs': event.item.id }
    }, showFavToast.bind(null, 'Dodano do obserwowanych'));
  });

  tags.on('itemRemoved', function(event) {
    trackEvent('Profile', 'Removed a fav', event.item.id);
    Meteor.users.update(Meteor.userId(), {
      $pull: { 'profile.favs': event.item.id }
    }, showFavToast.bind(null, 'Usunięto z obserwowanych'));
  });
});

function showFavToast(msg, err) {
  if (err) {
    toast('O nie, wystąpił błąd!');
  } else {
    toast(msg);
  }
}

Template.settings.helpers({
  isChecked: function(name) {
    var user = Meteor.user();
    return (user && user.profile[name]) ?
      'checked' : null;
  },
  isDisabled: function() {
    var user = Meteor.user();
    return (user && user.profile['push-report-new-enabled']) ?
      null : 'disabled';
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
