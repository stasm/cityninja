Template.line.onCreated(function() {
  this.subscribe('reports');
});

Template.line.helpers({
  hasBadReports: function(type, line, dir) {
    return reportCategories.reduce(function(sum, cur) {
      if (cur.name === 'normal') {
        return sum;
      }

      return sum + numReports(line, dir, cur.name, type);
    }, 0);
  }
});
