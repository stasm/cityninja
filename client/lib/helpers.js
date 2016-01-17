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

makeTagInput = function(sel) {
  var directions = new Bloodhound({
    datumTokenizer: Bloodhound.tokenizers.obj.whitespace('name'),
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    limit: Infinity,
    local: function() {
      return Object.keys(ztm).map(function(key) {
        return { id: key, name: ztm[key].name };
      });
    },
  });

  directions.initialize();

  var el = $(sel);

  function removeSelected(selected, tag) {
    return selected.indexOf(tag.id) === -1;
  }

  el.materialtags({
    itemValue: 'id',
    itemText: 'name',
    typeaheadjs: {
      name: 'dirs',
      displayKey: 'name',
      source: function(query, callback) {
        directions.search(query, function(suggestions) {
          var selected = el.val();
          callback(
            suggestions.filter(
              removeSelected.bind(null, selected)).slice(0, 5));
        });
      },
    }
  });

  return el;
};

autofocus = function() {
  Array.prototype.forEach.call(
    document.querySelectorAll('[autofocus]'),
    field => field.focus()
  );
}
