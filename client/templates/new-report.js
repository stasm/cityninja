Template.newReport.onCreated(trackPageView);
Template.newReport.onRendered(function() {
  const taginput = makeTagInput('#new-report-stop-view', {
    type: 'stop'
  });
  taginput.on('itemRemoved', function(evt) {
    trackEvent('New Report', 'New Report: Remove stop in main', evt.item.key);
    Router.current().state.set('new-report-stops', []);
    Router.current().state.set('new-report-lines', []);
  });
  this.autorun(() => updateSelectedStopInput(taginput));

  TagSubs.subscribe('tagLabelsWithTypes');
});

Template.newReport.helpers({
  seenHint() {
    return Meteor.user().profile['seen-new-report-hint-1'];
  },
  isStopSelected() {
     return Router.current().state.get('new-report-stops').length;
  },
  getTagName: function(key) {
    return Tags.findOne({key}).name;
  },
  fav: function(key) {
    return isFav(key) ?
      'nj-tag--fav' : null;
  },
});

Template.newReport.events({
  'click .nj-new-report__understood': function(evt) {
    evt.preventDefault();
    trackEvent('New Report', 'New Report: Dismiss hint');
    Meteor.users.update(Meteor.userId(), {
      $set: {
        'profile.seen-new-report-hint-1': true
      }
    });
  },
  'keyup [type="text"]': function(_, template) {
    checkValid(template.find('form'));
  },
  'click .nj-new-report__select-stop': function(evt) {
    trackEvent('New Report', 'New Report: Open select stop modal');
    Router.current().state.set('modal-stop-active', true);
  },
  'click .nj-new-report__select-lines': function(evt) {
    trackEvent('New Report', 'New Report: Open select lines modal');
    Router.current().state.set('modal-lines-active', true);
  },
  'click .nj-new-report__lines .nj-tag__remove': function(evt) {
    const dir = evt.currentTarget.parentNode.dataset.dir;
    trackEvent('New Report', 'New Report: Remove line in main', dir);
    const state = Router.current().state;
    const lines = state.get('new-report-lines');
    const pos = lines.indexOf(dir);
    Router.current().state.set('new-report-lines',
      [...lines.slice(0, pos), ...lines.slice(pos + 1)]);
  },
  'submit form': function(evt) {
    evt.preventDefault();
    trackEvent('New Report', 'New Report: Submit');
    const state = Router.current().state;
    Meteor.call(
      'createReport',
      evt.target['new-report-text'].value,
      [...state.get('new-report-stops'), ...state.get('new-report-lines')]
    );
    queuedToasts.push([pickRandom(toasts.created)]);
    Router.go('feed.all');
  },
});


/* Select stop modal */

Template.newReportStop.onRendered(function() {
  const taginput = makeTagInput('#new-report-stop-edit', {
    type: 'stop'
  });
  $('.nj-new-report-stop .tt-input').focus();
  taginput.on('itemAdded', function(evt) {
    trackEvent('New Report', 'New Report: Add stop in modal', evt.item.key);
    Router.current().state.set('new-report-stops', [evt.item.key]);
    Router.current().state.set('modal-stop-active', false);
  });

  updateSelectedStopInput(taginput);
});

Template.newReportStop.events({
  'click .nj-new-report-stop__back': function(evt, template) {
    trackEvent('New Report', 'New Report: Cancel select stop modal');
    Router.current().state.set('modal-stop-active', false);
  },
});


/* Select lines modal */

Template.newReportLines.onCreated(function() {
  const [stopKey] = Router.current().state.get('new-report-stops');
  this.subscribe('stopData', stopKey);

  const state = Router.current().state;
  state.set('new-report-lines-selecting',
    state.get('new-report-lines'));
});

Template.newReportLines.helpers({
  stop() {
    const [key] = Router.current().state.get('new-report-stops');
    return Tags.findOne({key});
  },
  getDirName: function(key) {
    return Tags.findOne({key}).name;
  },
  selected: function(key) {
    const allSelected = Router.current().state
      .get('new-report-lines-selecting');
    return contains(allSelected, key) ?
      'nj-new-report-lines__dir--selected' : null;
  },
  fav: function(key) {
    return isFav(key) ?
      'nj-tag--fav' : null;
  }
});

Template.newReportLines.events({
  'click .nj-new-report-lines__back': function(evt, template) {
    trackEvent('New Report', 'New Report: Cancel select lines modal');
    const state = Router.current().state;
    state.set('new-report-lines-selecting', []);
    state.set('modal-lines-active', false);
  },
  'click .nj-new-report-lines__done': function(evt, template) {
    trackEvent('New Report', 'New Report: Confirm select lines modal');
    const state = Router.current().state;
    state.set('new-report-lines', state.get('new-report-lines-selecting'));
    state.set('new-report-lines-selecting', []);
    state.set('modal-lines-active', false);
  },
  'click .nj-new-report-lines__dir': function(evt) {
    const state = Router.current().state;
    const key = evt.currentTarget.dataset.dir;
    const prev = state.get('new-report-lines-selecting');
    if (contains(prev, key)) {
      trackEvent('New Report', 'New Report: Add line in modal', key);
      const pos = prev.indexOf(key);
      state.set('new-report-lines-selecting',
        [...prev.slice(0, pos), ...prev.slice(pos + 1)]);
    } else {
      trackEvent('New Report', 'New Report: Remove line in modal', key);
      state.set('new-report-lines-selecting', [...prev, key]);
    }
  },
  ['click .mdl-collapse__trigger'](evt) {
    trackEvent('New Report', 'New Report: Toggle line group');
    $(evt.currentTarget)
      .parents('.mdl-collapse')
      .toggleClass('mdl-collapse--opened');
  }
});
