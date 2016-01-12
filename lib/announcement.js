Announcements = new Mongo.Collection('announcements');

Meteor.methods({
  updateAnnouncement: function(annId, token, fields) {
    if (Meteor.isServer) {
      fields.published = true;
      var updated = Announcements.update({
        _id: annId,
        token: token
      }, {
        $set: fields
      });

      if (updated === 0) {
        throw new Meteor.Error('bad-token', 'Zły żeton.');
      }
    }
  },

  dismissAnnouncement: function(annId) {
    Announcements.update(annId, {
      $addToSet: {
        dismissedBy: this.userId
      }
    });
  },
});
