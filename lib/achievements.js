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
    name: 'Pierwsze podziękowanie',
    desc: 'Ktoś Ci podziękował za zgłoszenie. Dobra robota.',
    cond: function(user) {
      return user.incoming['reports-thanked'].length >= 1;
    },
  },
  {
    name: 'Uprzejmie dziękuję',
    desc: 'Twoje zgłoszenia zebrały 5 podziękowań.',
    cond: function(user) {
      return user.incoming['reports-thanked'].length >= 5;
    },
  },
  {
    name: 'Lokalny bohater',
    desc: 'Twoje zgłoszenia zebrały 10 podziękowań.',
    cond: function(user) {
      return user.incoming['reports-thanked'].length >= 10;
    },
  },
  {
    name: 'Bohaterski Ninja',
    desc: 'Twoje zgłoszenia zebrały 50 podziękowań.',
    cond: function(user) {
      return user.incoming['reports-thanked'].length >= 50;
    },
  },
  {
    name: 'To takie łatwe, co nie?',
    desc: 'Twoje zgłoszenia zostały potwierdzone 1 raz.',
    cond: function(user) {
      return user.incoming['reports-upvoted'].length >= 1;
    },
  },
  {
    name: 'Uprzejmie donoszę',
    desc: 'Twoje zgłoszenia zostały potwierdzone 5 razy.',
    cond: function(user) {
      return user.incoming['reports-upvoted'].length >= 5;
    },
  },
  {
    name: 'Bardzo Lubię Informować Przyjaciół',
    desc: 'Twoje zgłoszenia zostały potwierdzone 10 razy.',
    cond: function(user) {
      return user.incoming['reports-upvoted'].length >= 10;
    },
  },
  {
    name: 'Reporter pierwsza klasa',
    desc: 'Twoje zgłoszenia zostały potwierdzone 50 razy.',
    cond: function(user) {
      return user.incoming['reports-upvoted'].length >= 50;
    },
  },
  {
    name: 'Zgłoszeniowy Ninja',
    desc: 'Twoje zgłoszenia zostały potwierdzone 50 razy.',
    cond: function(user) {
      return user.incoming['reports-upvoted'].length >= 100;
    },
  },/*
  {
    name: 'Poprawka',
    desc: 'Odwołałeś czyjeś zgłoszenie',
    cond: function(user) {
      return user.incoming[''].;
    },
  },
  {
    name: 'Na straży porządku',
    desc: 'Odwołałeś 5 zgłoszeń.',
    cond: function(user) {
      return user.incoming[''].;
    },
  },
  {
    name: 'Poszukiwacz prawdy',
    desc: 'Odwołałeś 10 zgłoszeń.',
    cond: function(user) {
      return user.incoming[''].;
    },
  },
  {
    name: 'Jestem wdzięczny',
    desc: 'Podziękowałeś za zgłoszenie - komuś będzie miło.',
    cond: function(user) {
      return user.incoming[''].;
    },
  },
  {
    name: 'Potrafię dziękować za pomoc',
    desc: 'Podziękowałeś za 5 zgłoszeń.',
    cond: function(user) {
      return user.incoming[''].;
    },
  },
  {
    name: 'Lubię jak innym jest miło',
    desc: 'Podziękowałeś za 10 zgłoszeń.',
    cond: function(user) {
      return user.incoming[''].;
    },
  },
  {
    name: 'Dziękujący Ninja',
    desc: 'Podziękowałeś za 50 zgłoszeń.',
    cond: function(user) {
      return user.incoming[''].;
    },
  },
  {
    name: 'Mój pierwszy Komć!',
    desc: 'Skomentowałeś zgłoszenie.',
    cond: function(user) {
      return user.incoming[''].;
    },
  },
  {
    name: 'Czasem odpisuje',
    desc: 'Skomentowałeś 5 zgłoszeń.',
    cond: function(user) {
      return user.incoming[''].;
    },
  },
  {
    name: 'Komentuję sprawy bieżące',
    desc: 'Skomentowałeś 10 zgłoszeń.',
    cond: function(user) {
      return user.incoming[''].;
    },
  },
  {
    name: 'Często dyskutuję',
    desc: 'Skomentowałeś 25 zgłoszeń.',
    cond: function(user) {
      return user.incoming[''].;
    },
  },
  {
    name: 'Niezła nawijka',
    desc: 'Skomentowałeś 50 zgłoszeń.',
    cond: function(user) {
      return user.incoming[''].;
    },
  },
  {
    name: 'Gaduła',
    desc: 'Skomentowałeś 100 zgłoszeń.',
    cond: function(user) {
      return user.incoming[''].;
    },
  },
  {
    name: 'Miałem kanał na IRC-u',
    desc: 'Skomentowałeś 250 zgłoszeń.',
    cond: function(user) {
      return user.incoming[''].;
    },
  },
  {
    name: 'Buzia mi się nie zamyka',
    desc: 'Skomentowałeś 500 zgłoszeń.',
    cond: function(user) {
      return user.incoming[''].;
    },
  },
  {
    name: 'Ninja komentator',
    desc: 'Skomentowałeś 1000 zgłoszeń.',
    cond: function(user) {
      return user.incoming[''].;
    },
  },
  {
    name: 'Brawo!',
    desc: 'Zagrałeś w grę.',
    cond: function() {
      return 
    },
  },
  {
    name: 'Czasem sobie pyknę...',
    desc: 'Zagrałeś w grę 5 razy.',
    cond: function() {
      return 
    },
  },
  {
    name: 'To wcale nie nałóg',
    desc: 'Zagrałeś w grę 10 razy.',
    cond: function() {
      return 
    },
  },
  {
    name: 'Hardkorowy graczu',
    desc: 'Zagrałeś w grę 15 razy.',
    cond: function() {
      return 
    },
  },*/
];
