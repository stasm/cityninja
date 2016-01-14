Template.drawer.onRendered(() => {
  $('.mdl-collapse__content').each(function() {
    const content = $(this);
    content.css('margin-top', -content.outerHeight(true));
  })
});

Template.drawer.helpers({
  isActive(route) {
    return Router.current().route.getName() === route ?
      'is-active' : null;
  },
  nickname() {
    const user = Meteor.user();
    return user && user.profile.nickname;
  }
});

Template.drawer.events({
  ['click .mdl-collapse__button'](evt) {
    $(evt.currentTarget)
      .parents('.mdl-collapse')
      .toggleClass('mdl-collapse--opened');
  }
});
