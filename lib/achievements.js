Meteor.methods({
  achieve: function (name) {
    Meteor.users.update(this.userId, {
      $addToSet: { 'achievements': name }
    });
  }
});
