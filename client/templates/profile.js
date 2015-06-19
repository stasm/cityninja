function total(dir, type) {
  return Meteor.user()[dir][type] || 0;
}

Template.profile.helpers({
  all: total.bind(null, 'outgoing', 'created'),
  thanks: total.bind(null, 'incoming', 'thanks'),
  confirms: total.bind(null, 'incoming', 'confirms'),
  clears: total.bind(null, 'incoming', 'clears'),
  plural: function(key, num) {
    return translations[key][plural(num)];
  },
  numVotes: numVotes.bind(null, ' i '),
  achievements: function() {
    var completed = [];
    var user = Meteor.user();

    if (user.profile.favs.length > 0) {
      completed.push({
        name: 'Ulubieniec',
        desc: 'Masz przynajmniej jedną linię w ulubionych.'
      });
    }

    if (user.incoming.thanks >= 1) {
      completed.push({
        name: '1 podziękowanie',
        desc: 'Twoje zgłoszenia zebrały 1 podziękowanie.'
      });
    }

    if (user.incoming.thanks >= 5) {
      completed.push({
        name: '5 podziękowań',
        desc: 'Twoje zgłoszenia zebrały 5 podziękowań.'
      });
    }

    if (user.incoming.thanks >= 10) {
      completed.push({
        name: '10 podziękowań',
        desc: 'Twoje zgłoszenia zebrały 10 podziękowań.'
      });
    }

    if (user.incoming.thanks >= 50) {
      completed.push({
        name: '50 podziękowań',
        desc: 'Twoje zgłoszenia zebrały 50 podziękowań.'
      });
    }

    if (user.incoming.confirms >= 1) {
      completed.push({
        name: '1 potwierdzenie',
        desc: 'Twoje zgłoszenia zostały potwierdzone 1 raz.'
      });
    }

    if (user.incoming.confirms >= 5) {
      completed.push({
        name: '5 potwierdzeń',
        desc: 'Twoje zgłoszenia zostały potwierdzone 5 razy.'
      });
    }

    if (user.incoming.confirms >= 10) {
      completed.push({
        name: '10 potwierdzeń',
        desc: 'Twoje zgłoszenia zostały potwierdzone 10 razy.'
      });
    }

    if (user.incoming.confirms >= 50) {
      completed.push({
        name: '50 potwierdzeń',
        desc: 'Twoje zgłoszenia zostały potwierdzone 50 razy.'
      });
    }

    return completed;

  }
});

Template.profile.events({
  'click .collapsible-header': function(evt) {
    evt.currentTarget.classList.toggle('active');
  }
});
