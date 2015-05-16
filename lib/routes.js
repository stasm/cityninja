// Main route
Router.route('/', function() {
  this.render('landing');
});

// Route for each individual line
Router.route(
  '/:type/:line/:dir',
  function() {
    this.render('main');
  },
  {
    name: 'dir.show'
  }
);
