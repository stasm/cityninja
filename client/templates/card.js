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

hasActions = function(doc) {
  return canUpvote(doc) && canThank(doc);
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

function howMany(votes) {
  var trans = votes > 0 ? translations.confirms : translations.clears;
  var num = Math.abs(votes);
  return num + ' ' + trans[plural(Math.abs(num))];
}

var cardHelpers = {
  hasActions: hasActions,
  relativeTime: relativeTime,
  howMany: function(confirms, clears) {
    return [confirms, clears].filter(
      function(elem) { return elem !== 0; }).map(
        howMany).join(', ');
  }
};

var cardEvents = {
  'click .card-content.pointer': function(evt) {
    $(evt.currentTarget).parent().toggleClass('active');
  },
};

Template.reportcard.helpers(cardHelpers);
Template.reportcard.events(cardEvents);

Template.feedcard.helpers(cardHelpers);
Template.feedcard.events(cardEvents);

Template.cardactions.helpers({
  isAuthor: isAuthor,
  canUpvote: canUpvote,
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
    if (isAuthor(this._id)) {
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
