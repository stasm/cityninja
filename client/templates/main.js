
Template.main.onCreated(function() {
  this.subscribe('reports');
  var params = Router.current().params;
  this.type = params.type;
  this.line = params.line;
  this.dir = params.dir;
});

Template.main.helpers({
  stations: function () {
    var self = Template.instance();
    return stations[self.dir];
  },
  line: function() {
    return Template.instance().line;
  },
  dir: function() {
    return Template.instance().dir;
  },
  noReports: function() {
    var self = Template.instance();
    return numReports(self.line, self.dir) === 0;
  },
  isFav: function() {
    var template = Template.instance();
    return Session.get('fav ' + template.line + template.dir);
  }
});

Template.main.events = {
  'click .fav': function(event) {
    var template = Template.instance();
    var count = Session.get('favs count') || 0;
    var favid = 'fav ' + template.line + template.dir;
    var toggle = Session.get(favid) ? false : true;
    Session.setPersistent(favid, toggle);
    if (toggle) {
      Session.setPersistent('favs count', count + 1);
      Materialize.toast('Dodano do ulubionych.', 2000);
    } else {
      Session.setPersistent('favs count', count - 1);
      Materialize.toast('Usunięto z ulubionych.', 2000);
    }
  }
};

Template.main.rendered = function() {
  setInterval(function(){
    var currentTime = moment().zone("+01:00").format("H:mm");
    $('#current-time').text(currentTime);
  }, 1000);
};
