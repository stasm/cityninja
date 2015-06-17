Template.fab.helpers({
  isQuickAdding: function() {
    return Session.equals('quickadding', true);
  },
  reportTypes: function() {
    return reportTypes.common;
  }
});

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

Template.fab.events({
  'click .btn-floating': function(evt) {
    evt.currentTarget.parentNode.classList.remove('no-anim');
    toggleQuickAddButton(evt.currentTarget.parentNode);
  },
  'click .dimmer': function() {
    toggleQuickAddButton();
  },
  'click li': function() {
    openQuickAddForm();
  }
});

Template.quickadd.events({
  'click .close': function() {
    closeQuickAddForm();
  }
});

