Template.profile.onCreated(function() {
  this.subscribe('userData');
});

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
});
