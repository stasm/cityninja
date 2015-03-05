Meteor.subscribe("reports");

Template.main.helpers({
  stations: function () {
    return currentStations();
  },
  currentLine: function() {
    return currentLine();
  },
  noReports: function() {
    return numReports(currentLine()) === 0;
  },
  numReports: function() {
    return numReports(currentLine());
  },
  lineColor: function() {
    var line = currentLine();

    if (line.indexOf("M1") > -1) {
      return "blue-line";
    }

    if (line.indexOf("M2") > -1) {
      return "red-line";
    }
  }
});

Template.main.rendered = function() {
  // Enable modal triggering with + button
  $('.modal-trigger').leanModal();

  setInterval(function(){
    var currentTime = moment().zone("+01:00").format("H:mm");
    $('#current-time').text(currentTime);
  }, 1000);
};
