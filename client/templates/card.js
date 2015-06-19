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

function isTwitter(source) {
  return source === 'twitter';
}

var cardHelpers = {
  hasActions: hasActions,
  relativeTime: relativeTime,
  numThanks: function(thanks) {
    return thanks.length;
  },
  numVotes: function(confirms, clears) {
    return numVotes(', ', confirms.length, clears.length);
  },
  isTwitter: isTwitter,
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
  isTwitter: isTwitter,
  isAuthor: isAuthor,
  canVote: canVote,
  canThank: canThank
});

Template.cardactions.events({
  'click .opentweet': function(evt) {
    evt.stopImmediatePropagation();
    window.open(
      'https://twitter.com/' + this.sourceUser + '/status/' +
        this.sourceId, '_system');
  },
  'click .upvote': function(evt) {
    evt.stopImmediatePropagation();
    if (canVote(this)) {
      Meteor.call("upvoteReport", this._id, this.createdBy);
      toast(pickRandom(toasts.upvoted));
    }
  },
  'click .downvote': function(evt) {
    evt.stopImmediatePropagation();
    if (canVote(this)) {
      Meteor.call("downvoteReport", this._id, this.createdBy);
      toast(pickRandom(toasts.downvoted));
    }
  },
  'click .remove': function(evt) {
    evt.stopImmediatePropagation();
    if (isAuthor(this)) {
      Meteor.call("removeReport", this._id);
      toast(pickRandom(toasts.removed));
    }
  },
  'click .thank': function(evt) {
    evt.stopImmediatePropagation();
    if (canThank(this)) {
      Meteor.call("thankReport", this._id, this.createdBy);
      toast(pickRandom(toasts.thanked));
    }
  },
});
