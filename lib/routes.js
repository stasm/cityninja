Router.configure({
  loadingTemplate: 'loading',
  waitOn: function() {
    return Meteor.subscribe('userData');
  },
});

Router.route('/', function() {
  if (Meteor.isCordova) {
    this.redirect('live');
  } else {
    this.render('landing');
  }
});

Router.route('/live', {
  waitOn: function() {
    return Meteor.subscribe('currentReports');
  },
  action: function() {
    Session.set('current tab', 'live');
    this.render('index');
  },
});

Router.route('/linie', {
  waitOn: function() {
    return Meteor.subscribe('currentReports');
  },
  action: function() {
    Session.set('current tab', 'linie');
    this.render('index');
  },
});

Router.route('/profil', function() {
  this.render('profile');
});

Router.route('/ustawienia', function() {
  this.render('settings');
});

Router.route('/informacje', function() {
  this.render('colophon');
});

Router.route('/:type/:line/:dir', function() {
  this.render('main');
}, {
  name: 'dir.show'
});
