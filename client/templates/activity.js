Template.activity.onCreated(trackPageView);
Template.activity.onRendered(() => {
  $('.mdl-collapse__content').each(function() {
    const content = $(this);
    content.css('margin-top', -content.outerHeight(true));
  })
});

function total(dir, type) {
  var user = Meteor.user();
  return user ? user[dir][type].length : 0;
}

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

Template.activity.events({
  ['click .mdl-collapse__button'](evt) {
    $(evt.currentTarget)
      .parents('.mdl-collapse')
      .toggleClass('mdl-collapse--opened');
  }
});
