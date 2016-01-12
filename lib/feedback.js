Feedbacks = new Mongo.Collection('feedbacks');

Meteor.methods({
  createFeedback: function(text) {
    var feedback = Feedbacks.insert({
      createdAt: new Date(),
      createdBy: this.userId,
      version: VERSION,
      text: text,
    });

    if (Meteor.isServer) {
      Meteor.users.update(this.userId, {
        $addToSet: {'outgoing.feedbacks-created': feedback}
      });
    }
  },
});
