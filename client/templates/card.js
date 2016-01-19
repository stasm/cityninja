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
  has: has,
  numVotes: numVotes,
  ident() {
    return this.lastComment.createdAt.valueOf();
  },
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
    toast(pickRandom(toasts.archived), () => {
      trackEvent('Report', 'Cancel Dismiss');
      Meteor.call('cancelDismiss', this._id);
    });
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
  has: has,
});

Template.tweetcard.events({
  'click .nj-card__thank': thankReport,
  'click .nj-card__open-tweet': function(evt) {
    evt.stopImmediatePropagation();
    trackEvent('Report', 'Open tweet', this.sourceId);
    window.open(
      'https://twitter.com/' + this.sourceUser + '/status/' +
        this.sourceId, '_system');
  },
});

Template.ninjacard.events({
  'click .nj-card__dismiss': function(evt) {
    evt.stopImmediatePropagation();
    trackEvent('Announcement', 'Dismiss');
    Meteor.call('dismissAnnouncement', this._id);
  },
});

Template.usercard.helpers({
  relativeTime: relativeTime,
  getAuthor: getAuthor,
  isAuthor: isAuthor,
  has: has,
  numThanks: numThanks,
  numVotes: numVotes,
});

Template.usercard.events({
  'click .nj-card__upvote': function(evt) {
    evt.stopImmediatePropagation();

    if (has(this.upvotes)) {
      trackEvent('Report', 'Cancel Upvote');
      Meteor.call('cancelUpvote', this._id);
    } else {
      trackEvent('Report', 'Upvote');
      Meteor.call('upvoteReport', this._id);
    }
  },
  'click .nj-card__downvote': function(evt) {
    evt.stopImmediatePropagation();
    if (has(this.downvotes)) {
      trackEvent('Report', 'Cancel Downvote');
      Meteor.call('cancelDownvote', this._id);
    } else {
      trackEvent('Report', 'Downvote');
      Meteor.call('downvoteReport', this._id);
    }
  },
  'click .nj-card__remove': function(evt) {
    evt.stopImmediatePropagation();
    trackEvent('Report', 'Remove');
    Meteor.call('removeReport', this._id);
    const cancel = () => {
      trackEvent('Report', 'Cancel Remove');
      Meteor.call('cancelRemove', this._id);
    };
    queuedToasts.push(
      [pickRandom(toasts.removed), cancel]
    );
    Router.go('feed.all');
  },
  'click .nj-card__thank': thankReport
});

Template.commentcard.helpers({
  ident() {
    return this.createdAt.valueOf();
  },
  relativeTime: relativeTime,
  getAuthor: getAuthor
});

Template.taglist.helpers({
  getName: function(key) {
    return Tags.findOne({key}).name;
  },
  fav: function(key) {
    return isFav(key) ?
      'nj-tag--fav' : null;
  }
});

function thankReport(evt) {
  evt.stopImmediatePropagation();
  if (has(this.thanks)) {
    trackEvent('Report', 'Cancel Thanks');
    Meteor.call('cancelThanks', this._id);
  } else {
    trackEvent('Report', 'Thank');
    Meteor.call('thankReport', this._id);
  }
}
