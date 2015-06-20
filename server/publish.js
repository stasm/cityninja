Meteor.publish('currentReports', function () {
  heartbeat(this.userId);
  this.connection.onClose(heartbeat.bind(this, this.userId));
  //Meteor._sleepForMs(2000);
  return Reports.find(
    {expired: false},
    {fields: {removed: 0, weight: 0}});
});

Meteor.publish('userData', function() {
  if (!this.userId) {
    return this.ready();
  }

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
