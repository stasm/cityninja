Reports = new Mongo.Collection('reports');

numReports = function(line, dir, category) {
  var query = {
    line: line,
    expired: false
  };

  if (dir) {
    query.dir = dir;
  }

  if (category) {
    var names = allReportTypes.filter(function(report) {
      return report.category === category;
    }).map(function(report) {
      return report.name;
    });
    query.name = {$in: names};
  }

  return Reports.find(query).count();
};

Meteor.methods({
  saveReport: function (name, location, line, dir) {

    if (Meteor.isServer) {
      var rushHours = [7, 8, 16, 17];
      var currentUTCHour = (new Date()).getUTCHours();
      var query = {
        'profile.push-new-enabled': true
      };

      // if it's not rush hour, push to users how didn't select rush-hours-only
      if (rushHours.indexOf(currentUTCHour + 2) == -1) {
        query['profile.push-new-rushhours'] = { $ne: true };
      }

      var userIds = Meteor.users.find(
        query, { fields: { _id: 1 } }).map(
          function(user) { return user._id; });

      Push.send({
        from: 'push',
        title: line + ' ' + location,
        text: name,
        // send to all users for now
        query: {
          userId: {
            $in: userIds
          }
        }
      });
    }

    return Reports.insert({
      name: name,
      location: location,
      line: line,
      dir: dir,
      thanks: [],
      confirms: [],
      clears: [],
      createdAt: new Date(),
      createdBy: this.userId,
      expired: false,
      removed: false,
      weight: initialWeight
    });
  },
  thankReport: function(docId) {
    Reports.update(docId, {$addToSet: {thanks: this.userId}});
  },
  upvoteReport: function(docId) {
    // Cap weight to maxWeight
    var doc = Reports.findOne({_id: docId});
    Reports.update(docId, {
      $addToSet: {confirms: this.userId},
      $set: {weight: Math.min(doc.weight + upvoteWeight, maxWeight)}
    });
  },
  downvoteReport: function(docId) {
    Reports.update(docId, {
      $addToSet: {clears: this.userId},
      $inc: {weight: downvoteWeight}
    });
  },
  removeReport: function(docId) {
    Reports.update(docId, {
      $set: {
        expired: true,
        removed: true
      }
    });
  }
});
