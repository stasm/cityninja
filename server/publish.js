Meteor.publish('currentReports', function() {
  heartbeat(this.userId);
  this.connection.onClose(heartbeat.bind(this, this.userId));
  // Meteor._sleepForMs(2000);

  return Reports.find({
    expired: { $ne: true },
    removed: { $ne: true },
    dismissedBy: { $ne: this.userId },
  }, {
    fields: {removed: 0, weight: 0, token: 0, comments: 0}
  });
});

Meteor.publish('archivedReports', function() {
  // only show archived reports from last 7 days
  var oldest = new Date();
  oldest.setDate(oldest.getDate() - 7);
  return Reports.find({
    createdAt: { $gt: oldest },
    $or: [
      {expired: true},
      {dismissedBy: this.userId}
    ]
  }, {
    fields: {removed: 0, weight: 0, token: 0, comments: 0}
  });
});

Meteor.publish('reportDetail', function(id) {
  return Reports.find({
    _id: id,
    expired: { $ne: true },
    removed: { $ne: true },
    dismissedBy: { $ne: this.userId },
  }, {
    fields: {removed: 0, weight: 0, token: 0}
  });
});

Meteor.publish('queuedReport', function(token) {
  return Reports.find({
    expired: { $ne: true },
    removed: { $ne: true },
    token: token
  }, {
    fields: {removed: 0, weight: 0}
  });
});

Meteor.publish('currentAnnouncements', function() {
  return Announcements.find({
    published: true,
    dismissedBy: { $ne: this.userId },
  }, {
    fields: {token: 0}
  });
});

Meteor.publish('queuedAnnouncement', function(token) {
  return Announcements.find({
    token: token
  });
});

Meteor.publish('userData', function() {
  return Meteor.users.find(
    {_id: this.userId},
    {fields: {incoming: 1, outgoing: 1, achievements: 1}});
});

function heartbeat(userId) {
  Meteor.users.update(userId, {
    $set: {
      lastSeen: new Date()
    }
  });
}

Meteor.users._ensureIndex(
  {'lastSeen': 1}, {expireAfterSeconds: 15552000}); // 180 days
