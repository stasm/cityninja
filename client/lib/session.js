function contains(haystack, needle) {
  return haystack ?
    haystack.indexOf(needle) > -1 : false;
}

hasFavs = function() {
  return Meteor.user().profile.favs.length > 0;
};

isFav = function(line, dir) {
  return contains(Meteor.user().profile.favs, getDirId(line, dir));
};

toggleFav = function(line, dir) {
  var id = getDirId(line, dir);
  var alreadyExisted = contains(Meteor.user().profile.favs, id);

  function cb(err, num) {
    if (err) {
      toast('O nie, wystąpił błąd!');
    } else {
      toast(alreadyExisted ?
        'Usunięto z ulubionych.' : 'Dodano do ulubionych.');
    }
  }

  if (!alreadyExisted) {
    Meteor.call('achieve', 'fav1');
    Meteor.users.update(
      Meteor.userId(), { $addToSet: { 'profile.favs': id } }, cb);
  } else {
    Meteor.users.update(
      Meteor.userId(), { $pull: { 'profile.favs': id } }, cb);
  }
};

viewingFavs = function(state) {
  if (state === undefined) {
    return Session.get('viewing favs');
  }

  Session.setPersistent('viewing favs', state);
};

getFavs = function() {
  var favs = Meteor.user().profile.favs;
  var seq = {
    lines: [],
    dirs: []
  };
  return favs.reduce(function(seq, cur) {
    var parts = cur.split('|');
    seq.lines.push(parts[0]);
    seq.dirs.push(parts[1]);
    return seq;
  }, seq);
};

isAuthor = function(doc) {
  return doc.createdBy === Meteor.userId();
};

canThank = function(doc) {
  return !isAuthor(doc) && !contains(doc.thanks, Meteor.userId());
};

canVote = function(doc) {
  var userId = Meteor.userId();
  return doc === undefined ? false :
    !isAuthor(doc) && !contains(doc.confirms, userId) &&
      !contains(doc.clears, userId);
};

hasActions = function(doc) {
  return canVote(doc) && canThank(doc);
};

