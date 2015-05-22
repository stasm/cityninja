Meteor.subscribe("reports");

isAuthor = function(doc) {
  return Session.equals(doc + ' created', true);
};

canThank = function(doc) {
  return !isAuthor(doc) && Session.equals(doc + ' thanked', undefined);
};

canUpvote = function(doc) {
  return doc === undefined ?
    false : !isAuthor(doc) && Session.equals(doc + ' voted', undefined);
};

canRemove = function(doc, createdAt) {
  return isAuthor(doc) &&
    Chronos.currentTime(5000) - new Date(createdAt) < 1000 * 30;
};

hasActions = function(doc) {
  return canUpvote(doc) || canThank(doc);
};

function relativeTime(time) {
  var diff = (Chronos.currentTime(30000) - new Date(time)) / 1000;
  if (diff < 31) {
    return 'teraz';
  } else if (diff < 60) {
    return '1m';
  } else if (diff < 3600) {
    return Math.floor(diff / 60) + 'm';
  } else {
    return Math.floor(diff / 3600) + 'g';
  }
}

Template.reportcard.helpers({
  isAuthor: isAuthor,
  hasActions: hasActions,
  relativeTime: relativeTime
});

Template.reportcard.events({
  'click .card-content.has-actions': function(evt) {
    $(evt.currentTarget).parent().toggleClass('active');
  },
  'click .upvote': function(evt) {
    evt.stopImmediatePropagation();
    if (canUpvote(this._id)) {
      // Prevent future upvotes
      Session.setPersistent(this._id + ' voted', 'up');
      Meteor.call("upvoteReport", this._id);
      Materialize.toast("Dzięki!", 2000);
    }
  },
  'click .downvote': function(evt) {
    evt.stopImmediatePropagation();
    if (canUpvote(this._id)) {
      Session.setPersistent(this._id + ' voted', 'down');
      Meteor.call("downvoteReport", this._id);
      Materialize.toast("Dzięki!", 2000);
    }
  },
  'click .remove': function(evt) {
    evt.stopImmediatePropagation();
    if (canRemove(this._id, this.createdAt)) {
      Session.clear(this._id + ' created', true);
      Meteor.call("removeReport", this._id);
      Materialize.toast("Puff!", 2000);
    }
  },
  'click .thank': function(evt) {
    evt.stopImmediatePropagation();
    if (canThank(this._id)) {
      Session.setPersistent(this._id + ' thanked', true);
      Meteor.call("thankReport", this._id);
      Materialize.toast("Podziękowanie wysłane!", 2000);
    }
  },
});

Template.cardactions.helpers({
  canUpvote: canUpvote,
  canRemove: canRemove,
  canThank: canThank
});

Template.cardactions.events({
  'click .upvote': function(evt) {
    evt.stopImmediatePropagation();
    if (canUpvote(this._id)) {
      // Prevent future upvotes
      Session.setPersistent(this._id + ' voted', 'up');
      Meteor.call("upvoteReport", this._id);
      Materialize.toast("Dzięki!", 2000);
    }
  },
  'click .downvote': function(evt) {
    evt.stopImmediatePropagation();
    if (canUpvote(this._id)) {
      Session.setPersistent(this._id + ' voted', 'down');
      Meteor.call("downvoteReport", this._id);
      Materialize.toast("Dzięki!", 2000);
    }
  },
  'click .remove': function(evt) {
    evt.stopImmediatePropagation();
    if (canRemove(this._id, this.createdAt)) {
      Session.clear(this._id + ' created', true);
      Meteor.call("removeReport", this._id);
      Materialize.toast("Puff!", 2000);
    }
  },
  'click .thank': function(evt) {
    evt.stopImmediatePropagation();
    if (canThank(this._id)) {
      Session.setPersistent(this._id + ' thanked', true);
      Meteor.call("thankReport", this._id);
      Materialize.toast("Podziękowanie wysłane!", 2000);
    }
  },
});
