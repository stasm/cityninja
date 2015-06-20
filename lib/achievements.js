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
    icon: 'mdi-action-favorite yellow-text',
    desc: 'Wiesz, jak dodawać linie do ulubionych.',
    cond: function(user) {
      return user.achievements.indexOf('fav1') > -1;
    },
  },
  {
    name: '1 podziękowanie',
    icon: 'mdi-action-thumb-up yellow-text',
    desc: 'Twoje zgłoszenia zebrały 1 podziękowanie.',
    cond: function(user) {
      return user.incoming.thanks >= 1;
    },
  },
  {
    name: '5 podziękowań',
    icon: 'mdi-action-thumb-up amber-text',
    desc: 'Twoje zgłoszenia zebrały 5 podziękowań.',
    cond: function(user) {
      return user.incoming.thanks >= 5;
    },
  },
  {
    name: '10 podziękowań',
    icon: 'mdi-action-thumb-up orange-text',
    desc: 'Twoje zgłoszenia zebrały 10 podziękowań.',
    cond: function(user) {
      return user.incoming.thanks >= 10;
    },
  },
  {
    name: '50 podziękowań',
    icon: 'mdi-action-thumb-up deep-orange-text',
    desc: 'Twoje zgłoszenia zebrały 50 podziękowań.',
    cond: function(user) {
      return user.incoming.thanks >= 50;
    },
  },
  {
    name: '1 potwierdzenie',
    icon: 'mdi-action-grade yellow-text',
    desc: 'Twoje zgłoszenia zostały potwierdzone 1 raz.',
    cond: function(user) {
      return user.incoming.confirms >= 1;
    },
  },
  {
    name: '5 potwierdzeń',
    icon: 'mdi-action-grade amber-text',
    desc: 'Twoje zgłoszenia zostały potwierdzone 5 razy.',
    cond: function(user) {
      return user.incoming.confirms >= 5;
    },
  },
  {
    name: '10 potwierdzeń',
    icon: 'mdi-action-grade orange-text',
    desc: 'Twoje zgłoszenia zostały potwierdzone 10 razy.',
    cond: function(user) {
      return user.incoming.confirms >= 10;
    },
  },
  {
    name: '50 potwierdzeń',
    icon: 'mdi-action-grade deep-orange-text',
    desc: 'Twoje zgłoszenia zostały potwierdzone 50 razy.',
    cond: function(user) {
      return user.incoming.confirms >= 50;
    },
  },
];
