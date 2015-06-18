function toggleQuickAddButton() {
  var fab = document.querySelector('.fab');
  fab.classList.toggle('collapsed');
  fab.classList.toggle('expanded');
}

function openQuickAddForm() {
  Session.set('quickadd current step', 0);
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
      return [
        { name: 'Metro' },
        { name: 'WKD' },
        { name: 'SKM' },
        { name: 'KM' },
      ];
    }
  },
  {
    name: 'Na której linii?', 
    choices: function() {},
  },
  {
    name: 'W którym kierunku?',
    choices: function() {}
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
    var stepIndex = Session.get('quickadd current step');
    return quickSteps[stepIndex].choices();
  },
  stepChoice: function(stepIndex) {
    return Session.get('quickadd choice ' + stepIndex);
  }
});

Template.quickadd.events({
  'click .close': function() {
    closeQuickAddForm();
  },
  'click .collapsible-header.complete': function(evt) {
    var stepIndex = parseInt(evt.currentTarget.dataset.stepIndex);
    Session.set('quickadd current step', stepIndex);
  },
  'click .collection-item': function(evt) {
    var choice = evt.currentTarget.dataset.choice;
    var stepIndex = Session.get('quickadd current step');
    Session.set('quickadd choice ' + stepIndex, choice);
    Session.set('quickadd current step', stepIndex + 1);
  },
});

