// Main route
Router.route('/', function() {
  this.render('index');
});

Router.route('/kolofon', function() {
  this.render('colophon');
}, {
  onBeforeAction: function() {
    $('body').addClass('colophon');
    this.next();
  },
  onStop: function() {
    $('body').removeClass('colophon');
  },
});

// Route for each individual line
Router.route('/:type/:line/:dir', function() {
  this.render('main');
}, {
  name: 'dir.show'
});
