contains = function(haystack, needle) {
  return haystack ?
    haystack.indexOf(needle) > -1 : false;
}

isTweet = function(report) {
  return report.source === 'twitter';
};

isPSA = function(report) {
  return report.source === 'ninja';
};

isAuthor = function(report) {
  return report.createdBy === Meteor.userId();
};

getAuthor = function(doc) {
  return doc.source === 'sms' ?
    doc.sourceName + '…' : doc.sourceName + ':';
};

numThanks = function(doc) {
  return getThanksString(doc.thanks.length);
};

numVotes = function(doc) {
  return getVotesString(
    ' · ', ' · ', doc.upvotes.length, doc.downvotes.length);
};

has = function() {
  var args = Array.prototype.slice.call(arguments);
  return args.filter(Array.isArray).some(function(arr) {
    return contains(arr, Meteor.userId());
  });
};

toast = function(message, actionHandler, timeout = 3500) {
  const notification = document.querySelector('.nj-snackbar');
  Meteor.setTimeout(() =>
    notification.MaterialSnackbar.showSnackbar(
      {message, actionHandler, timeout, actionText: 'Cofnij'}
    ), 500
  );
};

queuedToasts = [];

flushQueuedToasts = function() {
  queuedToasts.forEach(([msg, fn]) => toast(msg, fn));
  queuedToasts = [];
};

autofocus = function(sel = '[autofocus]') {
  Array.prototype.forEach.call(
    document.querySelectorAll(sel),
    field => field.focus()
  );
}
