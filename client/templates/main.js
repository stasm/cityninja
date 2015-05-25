Template.main.onCreated(function() {
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
    return isFav(template.line, template.dir);
  }
});

Template.main.events = {
  'click .fav': function(event) {
    var template = Template.instance();

    if (toggleFav(template.line, template.dir)) {
      Materialize.toast('Dodano do ulubionych.', 2000);
    } else {
      Materialize.toast('Usunięto z ulubionych.', 2000);
    }
  }
};
