Template.line.onCreated(function() {
  this.subscribe('reports');
});

Template.line.helpers({
  badReportCategories: function(type, line, dir) {
    return reportCategories.filter(function(category) {
      if (category.name === 'normal') {
        return false;
      }

      return numReports(line, dir, category.name, type);
    });
  }
});
