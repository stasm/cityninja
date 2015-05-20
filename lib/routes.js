Router.route('/', function() {
  this.redirect('live');
});

Router.route('/live', function() {
  this.render('index', {
    data: {
      viewingNow: true
    }
  });
});

Router.route('/linie', function() {
  this.render('index', {
    data: {
      viewingLines: true
    }
  });
});

Router.route('/kolofon', function() {
  this.render('colophon');
});

Router.route('/:type/:line/:dir', function() {
  this.render('main');
}, {
  name: 'dir.show'
});
