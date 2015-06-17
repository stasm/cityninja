function toggleQuickAddButton() {
  var fab = document.querySelector('.fab');
  fab.classList.toggle('collapsed');
  fab.classList.toggle('expanded');
}

function openQuickAddForm() {
  Session.set('quickadding', true);
  $('.quickaddform').openModal();
  toggleQuickAddButton();
}

function closeQuickAddForm() {
  Session.set('quickadding', false);
  $('.quickaddform').closeModal();
}

Template.fab.helpers({
  isQuickAdding: function() {
    return Session.equals('quickadding', true);
  },
  reportTypes: function() {
    return reportTypes.common;
  }
});

Template.fab.events({
  'click .btn-floating': function(evt) {
    evt.currentTarget.parentNode.classList.remove('no-anim');
    toggleQuickAddButton(evt.currentTarget.parentNode);
  },
  'click .dimmer': function() {
    toggleQuickAddButton();
  },
  'click .quick-report': function() {
    openQuickAddForm();
  }
});

function getLines(type) {
  return lines.km.map(function(elem) { return elem.line; });
}

function getLines(type) {
  return lines.km.map(function(elem) { return elem.line; });
}

var quickSteps = {
  'Co się dzieje?': function() {
    return allReportTypes.slice(0, -1);
  },
  'Gdzie?': function() {
    return [
      { name: 'Metro' },
      { name: 'WKD' },
      { name: 'SKM' },
      { name: 'KM' },
    ];
  },
  'Na której linii?': function() {

  },
  'W którym kierunku?': function() {

  }
};

Template.quickadd.helpers({
  stepComplete: function(step) {
    return Sessions.equals('quickadd complete: ' + step, true);
  },
  steps: Object.keys(quickSteps),
  choices: function() {
    return quickSteps['Co się dzieje?']();
  }
});

Template.quickadd.events({
  'click .close': function() {
    closeQuickAddForm();
  },
  'click .collapsible-header': function(evt) {
    var header = evt.currentTarget;
    header.classList.toggle('active');
    header.parentNode.classList.toggle('active');
  },
});

