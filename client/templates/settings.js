Template.settings.onCreated(trackPageView);
Template.settings.onRendered(function() {
  return;
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
