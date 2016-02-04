function isRushHour(date) {
  var rushDays = [1, 2, 3, 4, 5];
  var rushHours = [7, 8, 16, 17];

  if (rushDays.indexOf(date.getUTCDay()) === -1) {
    return false;
  }

  return rushHours.indexOf(date.getUTCHours + 2) > -1;
}

pushReport = function(report) {
  var query = {
    '_id': { $ne: report.createdBy },
    'profile.push-obs-new-reports': true,
    'profile.favs': {
      $in: report.tags.map(
        tag => tag.key
      )
    }
  };

  // if it's not rush hour, include user who want pushes anytime
  if (!isRushHour(new Date())) {
    query['profile.push-all-anytime'] = true;
  }

  var userIds = Meteor.users.find(
    query, { fields: { _id: 1 } }).map(
    function(user) { return user._id; });

  Push.send({
    from: 'push',
    title: 'Utrudnienia na Twojej trasie',
    text: report.text,
    query: {
      userId: { $in: userIds }
    }
  });
};

pushThanks = function(docId, submitterId, thankerId) {
  var updated = Reports.update({
    _id: docId,
  }, {
    $addToSet: {
      allthanks: thankerId
    }
  });

  var user = Meteor.users.findOne({_id: submitterId});
  if (user && user.profile['push-thanks']) {

    if (isRushHour(new Date()) || user.profile['push-all-anytime']) {
      Push.send({
        from: 'push',
        title: 'Dobra robota!',
        text: 'Ktoś podziękował Ci za zgłoszenie.',
        query: {
          userId: submitterId
        }
      });
    }
  }
};
