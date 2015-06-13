Template.profile.onCreated(function() {
  this.subscribe('userReports');
});

function getReports(userId) {
  return Reports.find({
    createdBy: userId
  });
}

function total(type) {
  var user = Meteor.userId();

  if (type === 'all') {
    return getReports(user).count();
  }

  var runningTotal = 0;
  getReports(user).forEach(function(doc) {
    runningTotal += doc[type].length;
  });
  return runningTotal;
}

Template.profile.helpers({
  all: total.bind(null, 'all'),
  thanks: total.bind(null, 'thanks'),
  confirms: total.bind(null, 'confirms'),
  clears: total.bind(null, 'clears'),
  plural: function(key, num) {
    return translations[key][plural(num)];
  },
  numVotes: numVotes.bind(null, ' i '),
  isChecked: function(name) {
    return Meteor.user().profile[name] ? 'checked' : null;
  },
  isDisabled: function() {
    return Meteor.user().profile['push-enabled'] ? null : 'disabled';
  }
});

Template.profile.events({
  'change input': function(evt) {
    var settingName = evt.currentTarget.dataset.setting;
    var set = {};
    set['profile.' + settingName] = evt.currentTarget.checked;
    Meteor.users.update(Meteor.userId(), {
      $set: set
    });
  },
});
