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

Template.nav.helpers({
  viewingFavs: function() {
    return viewingFavs() ? 'checked' : null;
  }
});

Template.nav.events({
  'change .show-favs': function(evt) {
    Session.setPersistent('viewing favs', evt.target.checked);
  },
  'click .logo': function(evt) {
    $("html, body").animate({ scrollTop: "0px" });
  }
});

Template.nav.onRendered(function() {
  $('.more').dropdown({
    inDuration: 300,
    outDuration: 225,
    constrain_width: false,
    belowOrigin: true,
    gutter: 0,
  });
});
