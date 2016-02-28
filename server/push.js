function isRushHour(date) {
  const rushDays = [1, 2, 3, 4, 5];
  const rushHours = [7, 8, 16, 17];

  if (rushDays.indexOf(date.getUTCDay()) === -1) {
    return false;
  }

  return rushHours.indexOf(date.getUTCHours + 2) > -1;
}

pushReport = function(report) {
  const query = {
    '_id': { $ne: report.createdBy },
    'profile.push-obs-new-reports': true,
    'profile.favs': {
      $in: report.tags.map(
        tag => tag.key
      )
    }
  };

  // if it's not rush hour, include users who want pushes anytime
  if (!isRushHour(new Date())) {
    query['profile.push-all-anytime'] = true;
  }

  const userIds = Meteor.users.find(
    query, { fields: { _id: 1 } }
  ).map(
    user => user._id
  );

  Push.send({
    from: 'push',
    title: 'Warszawski Ninja',
    text: 'Nowe zgłoszenie na Twoich obserwowanych: ' + report.text,
    query: {
      userId: { $in: userIds }
    }
  });
};

pushComment = function(report, text) {
  const reporter = report.createdBy;
  const participants = report.comments ?
    report.comments.map(
      comment => comment.createdBy
    ).concat(reporter) : [reporter]

  const muted = report.dismissedBy ?
    report.dismissedBy.concat(this.userId) : [this.userId];

  const query = {
    '_id': {
      $in: participants,
      $nin: muted,
    },
    'profile.push-comments': true,
  };

  // if it's not rush hour, include users who want pushes anytime
  if (!isRushHour(new Date())) {
    query['profile.push-all-anytime'] = true;
  }

  const receipients = Meteor.users.find(
    query, { fields: { _id: 1 } }
  ).map(
    user => user._id
  );

  if (-1 < receipients.indexOf(reporter)) {
    Push.send({
      from: 'push',
      title: 'Warszawski Ninja',
      text: 'Ktoś odpowiedział na Twoje zgłoszenie: ' + text,
      query: {
        userId: reporter,
      }
    });
  }

  Push.send({
    from: 'push',
    title: 'Warszawski Ninja',
    text: 'Ktoś odpowiedział na Twój komentarz: ' + text,
    query: {
      userId: {
        $in: receipients,
        $ne: reporter,
      }
    }
  });
};


pushThanks = function(docId, submitterId, thankerId) {
  const updated = Reports.update({
    _id: docId,
  }, {
    $addToSet: {
      allthanks: thankerId
    }
  });

  const user = Meteor.users.findOne({_id: submitterId});
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
