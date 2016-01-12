Template.profile.onCreated(trackPageView);

function total(dir, type) {
  var user = Meteor.user();
  return user ? user[dir][type].length : 0;
}

Template.profile.helpers({
  all: total.bind(null, 'outgoing', 'reports-created'),
  thanks: total.bind(null, 'incoming', 'reports-thanked'),
  upvotes: total.bind(null, 'incoming', 'reports-upvoted'),
  downvotes: total.bind(null, 'incoming', 'reports-downvoted'),
  plural: function(key, num) {
    return translations[key][plural(num)];
  },
  numVotes: function() {
    return getVotesString(
      '', ' i ', total('incoming', 'reports-upvoted'),
      total('incoming', 'reports-downvoted'));
  },
  achievements: function() {
    var user = Meteor.user();
    return user ? getAchievements(user) : [];
  }
});

Template.profile.events({
  'click .collapsible-item': function(evt) {
    var item= evt.currentTarget;
    item.classList.toggle('active');
    item.querySelector('.collapsible-header').classList.toggle('active');
  }
});
