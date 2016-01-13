function relativeTime(time) {
  var diff = (Chronos.currentTime(30000) - new Date(time)) / 1000;
  if (diff < 31) {
    return 'teraz';
  } else if (diff < 60) {
    return '1 min';
  } else if (diff < 3600) {
    return Math.floor(diff / 60) + ' min';
  } else if (diff < 3600 * 36) {
    return Math.floor(diff / 3600) + ' godz';
  } else if (diff < 3600 * 24 * 9) {
    return Math.floor(diff / (3600 * 24)) + ' dni';
  } else {
    return Math.floor(diff / (3600 * 24 * 7)) + ' tyg';
  }
}

Template.feedcard.helpers({
  relativeTime: relativeTime,
  isTweet: isTweet,
  getAuthor: getAuthor,
  isFav: isFav,
  has: has,
  numVotes: numVotes,
});

Template.feedcard.events({
  'click .nj-card': function(evt) {
    trackEvent('Report', 'Detail');
    evt.stopImmediatePropagation();
    Router.go('report.detail', { _id: this._id });
  },
  'click .nj-card__dismiss': function(evt) {
    evt.stopImmediatePropagation();
    trackEvent('Report', 'Dismiss');
    Meteor.call('dismissReport', this._id);
  },
});

Template.archivecard.helpers({
  relativeTime: relativeTime,
  isTweet: isTweet,
  getAuthor: getAuthor,
  numVotes: numVotes,
});

Template.tweetcard.helpers({
  relativeTime: relativeTime,
  getAuthor: getAuthor,
  isFav: isFav,
  has: has,
});

Template.tweetcard.events({
  'click .thank.pointer': thankReport,
  'click .opentweet': function(evt) {
    evt.stopImmediatePropagation();
    trackEvent('Report', 'Open tweet', this.sourceId);
    window.open(
      'https://twitter.com/' + this.sourceUser + '/status/' +
        this.sourceId, '_system');
  },
});

Template.ninjacard.events({
  'click .dismiss': function(evt) {
    evt.stopImmediatePropagation();
    trackEvent('Announcement', 'Dismiss');
    Meteor.call('dismissAnnouncement', this._id);
  },
});

Template.usercard.helpers({
  relativeTime: relativeTime,
  getAuthor: getAuthor,
  isAuthor: isAuthor,
  isFav: isFav,
  has: has,
  numThanks: numThanks,
  numVotes: numVotes,
});

Template.usercard.events({
  'click .upvote': function(evt) {
    evt.stopImmediatePropagation();

    if (has(this.upvotes)) {
      trackEvent('Report', 'Cancel Upvote');
      Meteor.call('cancelUpvote', this._id);
      toast(pickRandom(toasts.canceled));
    } else {
      trackEvent('Report', 'Upvote');
      Meteor.call('upvoteReport', this._id);
      toast(pickRandom(toasts.upvoted));
    }
  },
  'click .downvote': function(evt) {
    evt.stopImmediatePropagation();
    if (has(this.downvotes)) {
      trackEvent('Report', 'Cancel Downvote');
      Meteor.call('cancelDownvote', this._id);
      toast(pickRandom(toasts.canceled));
    } else {
      trackEvent('Report', 'Downvote');
      Meteor.call('downvoteReport', this._id);
      toast(pickRandom(toasts.downvoted));
    }
  },
  'click .remove': function(evt) {
    evt.stopImmediatePropagation();
    trackEvent('Report', 'Remove');
    Meteor.call('removeReport', this._id);
    toast(pickRandom(toasts.removed));
  },
  'click .thank.pointer': thankReport
});

Template.commentcard.helpers({
  relativeTime: relativeTime,
  getAuthor: getAuthor
});

Template.taglist.helpers({
  getTagName: function(tag) {
    return ztm[tag].name;
  }
});

function thankReport(evt) {
  evt.stopImmediatePropagation();
  if (has(this.thanks)) {
    return;
  }

  trackEvent('Report', 'Thank');
  Meteor.call('thankReport', this._id);
  toast(pickRandom(toasts.thanked));
}
