// Main route
Router.route('/', function() {
  this.render('index');
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
