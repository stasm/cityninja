Session.setDefault('favs', []);
Session.setDefault('favs count', 0);

hasFavs = function() {
  return !Session.equals('favs count', 0);
};

isFav = function(line, dir) {
  var favs = Session.get('favs');
  return favs.indexOf(line + '|' + dir) > -1;
};

toggleFav = function(line, dir) {
  var favs = Session.get('favs');
  var count = Session.get('favs count');

  var id = line + '|' + dir;
  var pos = favs.indexOf(id);
  var adding = pos === -1;

  if (adding) {
    favs.push(id);
    Session.setPersistent('favs count', count + 1);
  } else {
    favs.splice(pos, 1);
    Session.setPersistent('favs count', count - 1);
  }

  Session.setPersistent('favs', favs);
  return adding;
};

viewingFavs = function(state) {
  if (state === undefined) {
    return Session.get('viewing favs');
  }

  Session.setPersistent('viewing favs', state);
};

getFavs = function() {
  var favs = Session.get('favs');
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

