Reports = new Mongo.Collection('reports');

numReports = function(line, dir, category, type) {
  var nameQuery;

  if (category) {
    var names = reportTypes[type].filter(function(report) {
      return report.category === category;
    }).map(function(report) {
      return report.name;
    });
    nameQuery = {$in: names};
  } else {
    nameQuery = {$ne: 'Wszystko OK'};
  }

  return Reports.find({
    line: line,
    dir: dir,
    name: nameQuery,
    expired: false
  }).count();
};

Meteor.methods({
  saveReport: function (name, location, line, dir) {
    // Create a new report
    var newReport =  Reports.insert({
      name: name,
      location: location,
      line: line,
      dir: dir,
      votes: 0,
      clears: 0,
      createdAt: new Date(),
      lastConfirmedAt: new Date(),
      expired: false,
      weight: initialWeight
    });

    if (name === 'Wszystko OK') {
      // Normal conditions expire all alerts
      Reports.update(
        {
          line: line,
          dir: dir,
          location: location,
          name: {$ne: 'Wszystko OK'},
          expired: false
        },
        {$set: {expired: true}},
        {multi: true}
      );
    } else {
      // Any alert expires normal conditions
      // We have to search first, cannot run mass update in untrusted code
      nc_report = Reports.findOne({
        line: line,
        dir: dir,
        location: location,
        name: 'Wszystko OK',
        expired: false
      });
      if (nc_report)
        Reports.update(nc_report._id, {$set: {expired: true}});
    }
    return newReport;
  },
  upvoteReport: function(docId) {
    Reports.update(docId, {$inc: {votes: 1}});
    // Cap weight to maxWeight
    doc = Reports.findOne({_id: docId});
    var newWeight = doc.weight + upvoteWeight;
    if (newWeight > maxWeight)
      newWeight = maxWeight;
    Reports.update(docId,
      {$set: {weight: newWeight, lastConfirmedAt: new Date()}});
  },
  downvoteReport: function(docId) {
    Reports.update(docId, {$inc: {clears: 1}});
    Reports.update(docId, {$set: {lastClearedAt: new Date()}});
    Reports.update(docId, {$inc: {weight: downvoteWeight}});
  },
  removeReport: function(docId) {
    Reports.remove({_id: docId});
  }
});
