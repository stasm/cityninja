Template.drawer.helpers({
  nickname() {
    return Meteor.user().profile.nickname;
  }
});
