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


Template.report.helpers({
  canUpvote: canUpvote,
  canRemove: canRemove,
  canThank: canThank,
  isAuthor: isAuthor,
  hasActions: hasActions,
  positive: function(reportName) {
    return (reportName === 'Wszystko OK');
  },
  icon: function(name) {
    var repType = allReportTypes.filter(function(elem) {
      return elem.name === name;
    })[0];
    return repType.icon;
  }
});

Template.report.events({
  'click .card': function(evt) {
    $(evt.currentTarget).toggleClass('active');
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

Template.report.events({
  'click .create-nonetheless': function() {
    return openModal(this.location);
  }
});
