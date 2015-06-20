Template.main.onCreated(trackPageView);
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
    trackEvent('Profile', 'Fav on direction view');
    var template = Template.instance();
    toggleFav(template.line, template.dir);
  }
};
