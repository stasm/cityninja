Template.activity.onCreated(trackPageView);
Template.activity.onRendered(() => {
  $('.nj-achievements .mdl-card__title').each(function() {
    $(this).css('background-position', rand() + '% ' + rand() + '%');
  })
});

Template.activity.helpers({
  all: total.bind(null, 'outgoing', 'reports-created'),
  thanks: total.bind(null, 'incoming', 'reports-thanked'),
  upvotes: total.bind(null, 'incoming', 'reports-upvoted'),
  downvotes: total.bind(null, 'incoming', 'reports-downvoted'),
  plural(key, num) {
    return translations[key][plural(num)];
  },
  numVotes() {
    return getVotesString(
      '', ' i ', total('incoming', 'reports-upvoted'),
      total('incoming', 'reports-downvoted'));
  },
  achievements() {
    var user = Meteor.user();
    return user ? getAchievements(user) : [];
  }
});

function rand() {
  return Math.random() * 100;
}

function total(dir, type) {
  var user = Meteor.user();
  return user ? user[dir][type].length : 0;
}
