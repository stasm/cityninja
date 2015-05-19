Meteor.subscribe("reports");

Template.nowitem.helpers({
  icon: function(name) {
    var repType = allReportTypes.filter(function(elem) {
      return elem.name === name;
    })[0];
    return repType.icon;
  },
  isFav: function(line, dir) {
    return isFav(line, dir);
  }
});
