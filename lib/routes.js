Router.route('/', function() {
  this.redirect('live');
});

Router.route('/live', {
  loadingTemplate: 'loading',
  waitOn: function() {
    return Meteor.subscribe('currentReports');
  },
  action: function() {
    Session.set('current tab', 'live');
    this.render('index');
  },
});

Router.route('/linie', function() {
  Session.set('current tab', 'linie');
  this.render('index');
});

Router.route('/kolofon', function() {
  this.render('colophon');
});

Router.route('/profil', function() {
  this.render('profile');
});

Router.route('/:type/:line/:dir', function() {
  this.render('main');
}, {
  name: 'dir.show'
});
