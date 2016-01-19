Cache = new SubsManager();

Router.configure({
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound'
});

Router.route('/', {
  name: 'feed.all',
  waitOn: function() {
    return [
      Cache.subscribe('tagLabels'),
      Cache.subscribe('currentReports'),
      Cache.subscribe('currentAnnouncements'),
    ];
  },
  action: function() {
    this.render('latest');
  },
});

Router.route('/zgloszenie/:_id', {
  name: 'report.detail',
  waitOn: function() {
    return [
      Cache.subscribe('tagLabels'),
      Cache.subscribe('reportDetail', this.params._id),
    ];
  },
  action: function() {
    this.render('detail');
  },
  data: function() {
    return Reports.findOne({
      _id: this.params._id
    });
  },
});

Router.route('/archiwum', {
  name: 'feed.archive',
  waitOn: function() {
    return [
      Cache.subscribe('tagLabels'),
      Cache.subscribe('archivedReports'),
    ];
  },
  action: function() {
    this.render('archive');
  },
});

Router.route('/zglos', {
  name: 'report.add',
  waitOn: function() {
    return [
      Cache.subscribe('tagLabelsWithTypes'),
    ];
  },
  action: function() {
    this.state.set('new-report-stops', []);
    this.state.set('new-report-lines', []);
    this.state.set('new-report-lines-selecting', []);
    this.render('newReport');
  },
});

Router.route('/uwagi', {
  name: 'feedback.add',
  action: function() {
    this.render('newFeedback');
  },
});

Router.route('/aktywnosc', {
  name: 'activity.show',
  waitOn: function() {
    return Cache.subscribe('userActivity');
  },
  action: function() {
    this.render('activity');
  },
});

Router.route('/ustawienia', {
  name: 'settings.show',
  waitOn: function() {
    return [
      Cache.subscribe('tagLabels'),
    ];
  },
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

Router.route('/regulamin', {
  name: 'eula.show',
  action: function() {
    this.render('eula');
  }
});

Router.route('/_mod/:token', {
  name: 'report.edit',
  waitOn: function() {
    return [
      Cache.subscribe('tagLabels'),
      Cache.subscribe('queuedReport', this.params.token)
    ];
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
    return Cache.subscribe('queuedAnnouncement', this.params.token);
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
