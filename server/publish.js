Meteor.publish('reports', function () {
  heartbeat(this.userId);
  this.connection.onClose(heartbeat.bind(this, this.userId));
  return Reports.find({expired: false});
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
