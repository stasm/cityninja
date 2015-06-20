function toggleQuickAddButton() {
  var toastContainer = document.querySelector('#toast-container');
  Array.prototype.forEach.call(
    toastContainer.querySelectorAll('.toast'),
    function(toast) { toastContainer.removeChild(toast); });
  var fab = document.querySelector('.fab');
  fab.classList.toggle('collapsed');
  fab.classList.toggle('expanded');
}

function openQuickAddForm(startingStep) {
  Session.set('quickadd current step', startingStep || 0);
  $('.quickaddform').openModal();
  toggleQuickAddButton();
}

function closeQuickAddForm() {
  Session.set('quickadd current step', -1);
  $('.quickaddform').closeModal();
}

Template.fab.helpers({
  isQuickAdding: function() {
    return !Session.equals('quickadd current step', -1);
  },
  reportTypes: function() {
    return reportTypes.common;
  }
});

Template.fab.events({
  'click .fab': function(evt) {
    trackEvent('Quickadd', evt.currentTarget.classList.contains('expanded') ?
      'Button tap close' : 'Button tap open');
    evt.stopImmediatePropagation();
    evt.currentTarget.classList.remove('no-anim');
    toggleQuickAddButton();
  },
  'click .dimmer': function(evt) {
    trackEvent('Quickadd', 'Dimmer tap');
    evt.stopImmediatePropagation();
    toggleQuickAddButton();
  },
  'click .quick-report': function(evt) {
    trackEvent('Quickadd', 'Report tap');
    evt.stopImmediatePropagation();
    var reportCategory = evt.currentTarget.dataset.reportCategory;
    var reportName = evt.currentTarget.dataset.reportName;
    if (reportCategory === 'other') {
      openQuickAddForm(0);
    } else {
      Session.set('quickadd choice 0', reportName);
      openQuickAddForm(1);
    }
  }
});

var transportTypes = {
  'Metro': { slug: 'metro', icon: 'mdi-maps-directions-subway' },
  'WKD': { slug: 'wkd', icon: 'mdi-maps-directions-train' },
  'SKM': { slug: 'skm', icon: 'mdi-maps-directions-train' },
  'KM': { slug: 'km', icon: 'mdi-maps-directions-train' },
};

var quickSteps = [
  {
    name: 'Co się dzieje?',
    choices: function() {
      return allReportTypes.slice(0, -1);
    }
  },
  {
    name: 'Gdzie?',
    choices: function() {
      return Object.keys(transportTypes).map(function(elem) {
        return { name: elem, icon: transportTypes[elem].icon };
      });
    }
  },
  {
    name: 'Na której linii?', 
    choices: function() {
      var type = Session.get('quickadd choice 1');
      return lines[transportTypes[type].slug];
    },
  },
  {
    name: 'W którym kierunku?',
    choices: function() {
      var type = Session.get('quickadd choice 1');
      var line = Session.get('quickadd choice 2');
      return lines[transportTypes[type].slug].filter(function(elem) {
        return elem.name === line;
      })[0].directions;
    }
  },
  {
    name: 'Na której stacji?',
    choices: function() {
      var dir = Session.get('quickadd choice 3');
      return stations[dir];
    }
  }
];

Template.quickadd.helpers({
  isCurrentStep: function(stepIndex) {
    return Session.equals('quickadd current step', stepIndex);
  },
  isStepComplete: function(stepIndex) {
    return Session.get('quickadd current step') > stepIndex;
  },
  steps: quickSteps.map(function(step, i) {
    return { name: step.name, index: i };
  }),
  choices: function() {
    // spacebars don't accept args in {{#each}} block tag; use a session global
    var stepIndex = Session.get('quickadd current step');
    if (quickSteps[stepIndex]) {
      return quickSteps[stepIndex].choices();
    }
  },
  stepChoice: function(stepIndex) {
    return Session.get('quickadd choice ' + stepIndex);
  }
});

Template.quickadd.events({
  'click .close': function(evt) {
    trackEvent('Quickadd', 'Form close');
    evt.stopImmediatePropagation();
    closeQuickAddForm();
  },
  'click .collapsible-header.complete': function(evt) {
    evt.stopImmediatePropagation();
    var stepIndex = parseInt(evt.currentTarget.dataset.stepIndex);
    trackEvent('Quickadd', 'Form edit', stepIndex);
    Session.set('quickadd current step', stepIndex);
  },
  'click .collection-item': function(evt) {
    evt.stopImmediatePropagation();
    var choice = evt.currentTarget.dataset.choice;
    var stepIndex = Session.get('quickadd current step');
    trackEvent('Quickadd', 'Form advance', stepIndex);
    Session.set('quickadd choice ' + stepIndex, choice);
    if (stepIndex === 1 && choice === 'WKD') {
      // wkd has only one line; take a shortcut
      Session.set('quickadd choice 2', 'WKD');
      Session.set('quickadd current step', 3);
    } else {
      Session.set('quickadd current step', stepIndex + 1);
    }
  },
  'click .btn.pointer': function(evt) {
    evt.stopImmediatePropagation();
    var report = Session.get('quickadd choice 0');
    var line = Session.get('quickadd choice 2');
    var dir = Session.get('quickadd choice 3');
    var location = Session.get('quickadd choice 4');
    trackEvent('Report', 'Created in quickadd');
    trackEvent('Quickadd', 'Report created');
    createReport(report, line, dir, location);
    closeQuickAddForm();
  }
});

