Template.profile.onCreated(trackPageView);

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
    return getAchievements(Meteor.user());
  }
});

Template.profile.events({
  'click .collapsible-item': function(evt) {
    var item= evt.currentTarget;
    item.classList.toggle('active');
    item.querySelector('.collapsible-header').classList.toggle('active');
  }
});
