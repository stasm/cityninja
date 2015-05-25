Meteor.publish('currentReports', function () {
  heartbeat(this.userId);
  this.connection.onClose(heartbeat.bind(this, this.userId));
  return Reports.find({expired: false}, {fields: {
    removed: 0,
    weight: 0
  }});
});

Meteor.publish('userReports', function () {
  return Reports.find({createdBy: this.userId}, {fields: {
    thanks: 1,
    confirms: 1,
    clears: 1
  }});
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
