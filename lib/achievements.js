Meteor.methods({
  achieve: function (name) {
    Meteor.users.update(this.userId, {
      $addToSet: { 'achievements': name }
    });
  }
});

getAchievements = function(user) {
  return achievements.filter(function(achvmt) {
    return achvmt.cond(user);
  });
};

var achievements = [
  {
    name: 'Ulubieniec',
    desc: 'Wiesz, jak dodawać linie do ulubionych.',
    cond: function(user) {
      return user.achievements.indexOf('fav1') > -1;
    },
  },
  {
    name: '1 podziękowanie',
    desc: 'Twoje zgłoszenia zebrały 1 podziękowanie.',
    cond: function(user) {
      return user.incoming['reports-thanked'].length >= 1;
    },
  },
  {
    name: '5 podziękowań',
    desc: 'Twoje zgłoszenia zebrały 5 podziękowań.',
    cond: function(user) {
      return user.incoming['reports-thanked'].length >= 5;
    },
  },
  {
    name: '10 podziękowań',
    desc: 'Twoje zgłoszenia zebrały 10 podziękowań.',
    cond: function(user) {
      return user.incoming['reports-thanked'].length >= 10;
    },
  },
  {
    name: '50 podziękowań',
    desc: 'Twoje zgłoszenia zebrały 50 podziękowań.',
    cond: function(user) {
      return user.incoming['reports-thanked'].length >= 50;
    },
  },
  {
    name: '1 potwierdzenie',
    desc: 'Twoje zgłoszenia zostały potwierdzone 1 raz.',
    cond: function(user) {
      return user.incoming['reports-upvoted'].length >= 1;
    },
  },
  {
    name: '5 potwierdzeń',
    desc: 'Twoje zgłoszenia zostały potwierdzone 5 razy.',
    cond: function(user) {
      return user.incoming['reports-upvoted'].length >= 5;
    },
  },
  {
    name: '10 potwierdzeń',
    desc: 'Twoje zgłoszenia zostały potwierdzone 10 razy.',
    cond: function(user) {
      return user.incoming['reports-upvoted'].length >= 10;
    },
  },
  {
    name: '50 potwierdzeń',
    desc: 'Twoje zgłoszenia zostały potwierdzone 50 razy.',
    cond: function(user) {
      return user.incoming['reports-upvoted'].length >= 50;
    },
  },
];
