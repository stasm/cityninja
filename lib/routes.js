Router.configure({
  loadingTemplate: 'loading',
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
    return [
      Meteor.subscribe('userData'),
      Meteor.subscribe('currentReports')
    ];
  },
  action: function() {
    Session.set('current tab', 'live');
    this.render('index');
  },
});

Router.route('/linie', {
  waitOn: function() {
    return [
      Meteor.subscribe('userData'),
      Meteor.subscribe('currentReports')
    ];
  },
  action: function() {
    Session.set('current tab', 'linie');
    this.render('index');
  },
});

Router.route('/profil', {
  waitOn: function() {
    return Meteor.subscribe('userData');
  },
  action: function() {
    this.render('profile');
  },
});

Router.route('/ustawienia', {
  waitOn: function() {
    return Meteor.subscribe('userData');
  },
  action: function() {
    this.render('settings');
  },
});

Router.route('/informacje', {
  action: function() {
    this.render('colophon');
  }
});

Router.route('/:type/:line/:dir', {
  name: 'dir.show',
  waitOn: function() {
    return [
      Meteor.subscribe('userData'),
      Meteor.subscribe('currentReports')
    ];
  },
  action: function() {
    this.render('main');
  },
});
