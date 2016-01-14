Router.configure({
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound'
});

Router.route('/', {
  name: 'feed.all',
  waitOn: function() {
    return [
      Meteor.subscribe('currentReports'),
      Meteor.subscribe('currentAnnouncements')
    ];
  },
  action: function() {
    this.render('latest');
  },
});

Router.route('/archiwum', {
  name: 'feed.archive',
  waitOn: function() {
    return [
      Meteor.subscribe('archivedReports'),
    ];
  },
  action: function() {
    this.render('archive');
  },
});

Router.route('/zgłoś', {
  name: 'report.add',
  action: function() {
    this.render('newReport');
  },
});

Router.route('/uwagi', {
  name: 'feedback.add',
  action: function() {
    this.render('newFeedback');
  },
});

Router.route('/aktywność', {
  name: 'profile.show',
  waitOn: function() {
    return Meteor.subscribe('userData');
  },
  action: function() {
    this.render('profile');
  },
});

Router.route('/ustawienia', {
  name: 'settings.show',
  action: function() {
    this.render('settings');
  },
});

Router.route('/informacje', {
  name: 'colophon.show',
  action: function() {
    this.render('colophon');
  }
});

Router.route('/zgłoszenie/:_id', {
  name: 'report.detail',
  waitOn: function() {
    return Meteor.subscribe('reportDetail', this.params._id);
  },
  action: function() {
    this.render('reportDetail');
  },
  data: function() {
    return Reports.findOne({
      _id: this.params._id
    });
  },
});

Router.route('/_mod/:token', {
  name: 'report.edit',
  waitOn: function() {
    return Meteor.subscribe('queuedReport', this.params.token);
  },
  action: function() {
    this.render('editReport');
  },
  data: function() {
    return Reports.findOne({
      token: this.params.token
    });
  },
});

Router.route('/_psa/:token', {
  name: 'announcement.edit',
  waitOn: function() {
    return Meteor.subscribe('queuedAnnouncement', this.params.token);
  },
  action: function() {
    this.render('editAnnouncement');
  },
  data: function() {
    return Announcements.findOne({
      token: this.params.token
    });
  },
});

Router.plugin('dataNotFound', {
  notFoundTemplate: 'notFound',
  only: [
    'report.detail',
    'report.edit',
    'announcement.edit'
  ]
});
