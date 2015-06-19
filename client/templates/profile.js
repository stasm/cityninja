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
        icon: 'mdi-action-favorite amber-text',
        desc: 'Masz przynajmniej jedną linię w ulubionych.'
      });
    }

    if (user.incoming.thanks >= 1) {
      completed.push({
        name: '1 podziękowanie',
        icon: 'mdi-action-thumb-up amber-text',
        desc: 'Twoje zgłoszenia zebrały 1 podziękowanie.'
      });
    }

    if (user.incoming.thanks >= 5) {
      completed.push({
        name: '5 podziękowań',
        icon: 'mdi-action-thumb-up amber-text',
        desc: 'Twoje zgłoszenia zebrały 5 podziękowań.'
      });
    }

    if (user.incoming.thanks >= 10) {
      completed.push({
        name: '10 podziękowań',
        icon: 'mdi-action-thumb-up amber-text',
        desc: 'Twoje zgłoszenia zebrały 10 podziękowań.'
      });
    }

    if (user.incoming.thanks >= 50) {
      completed.push({
        name: '50 podziękowań',
        icon: 'mdi-action-thumb-up amber-text',
        desc: 'Twoje zgłoszenia zebrały 50 podziękowań.'
      });
    }

    if (user.incoming.confirms >= 1) {
      completed.push({
        name: '1 potwierdzenie',
        icon: 'mdi-action-grade amber-text',
        desc: 'Twoje zgłoszenia zostały potwierdzone 1 raz.'
      });
    }

    if (user.incoming.confirms >= 5) {
      completed.push({
        name: '5 potwierdzeń',
        icon: 'mdi-action-grade amber-text',
        desc: 'Twoje zgłoszenia zostały potwierdzone 5 razy.'
      });
    }

    if (user.incoming.confirms >= 10) {
      completed.push({
        name: '10 potwierdzeń',
        icon: 'mdi-action-grade amber-text',
        desc: 'Twoje zgłoszenia zostały potwierdzone 10 razy.'
      });
    }

    if (user.incoming.confirms >= 50) {
      completed.push({
        name: '50 potwierdzeń',
        icon: 'mdi-action-grade amber-text',
        desc: 'Twoje zgłoszenia zostały potwierdzone 50 razy.'
      });
    }

    return completed;

  }
});

Template.profile.events({
  'click .collapsible-item': function(evt) {
    var item= evt.currentTarget;
    item.classList.toggle('active');
    item.querySelector('.collapsible-header').classList.toggle('active');
  }
});
