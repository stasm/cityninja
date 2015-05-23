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
    return Reports.insert({
      name: name,
      location: location,
      line: line,
      dir: dir,
      thanks: 0,
      votes: 0,
      clears: 0,
      createdAt: new Date(),
      expired: false,
      removed: false,
      weight: initialWeight
    });
  },
  thankReport: function(docId) {
    Reports.update(docId, {$inc: {thanks: 1}});
  },
  upvoteReport: function(docId) {
    // Cap weight to maxWeight
    var doc = Reports.findOne({_id: docId});
    Reports.update(docId, {
      $inc: {votes: 1},
      $set: {weight: Math.min(doc.weight + upvoteWeight, maxWeight)}
    });
  },
  downvoteReport: function(docId) {
    Reports.update(docId, {
      $inc: {
        clears: 1,
        weight: downvoteWeight
      }
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
