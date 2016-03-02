Meteor.startup(function() {
  $('html').attr('lang', 'pl');

  if (Meteor.isCordova) {
    document.addEventListener("backbutton", function() {
      if (window.location.pathname === Router.path('feed.all')) {
        window.plugins.Suspend.suspendApp();
      } else {
        window.history.back();
      }
    }, false);
  }
});

colorStatusBar = function() {
  const current = Router.current().route.getName();
  switch (current) {
    case 'feed.archive':
    case 'feedback.add':
    case 'colophon.show':
    case 'eula.show':
      matchStatusBarColor('cyan');
      break;
    case 'activity.show':
    case 'settings.show':
      matchStatusBarColor('magenta');
      break;
    case 'report.add':
      matchStatusBarColor('yellow');
      break;
    case 'report.detail':
      matchStatusBarColor('white');
      break;
    case 'feed.all':
    default:
      matchStatusBarColor('black');
  }
}

function matchStatusBarColor(color) {
  if (!Meteor.isCordova) {
    return;
  }

  if (cordova.platformId === 'android') {
    switch (color) {
      case 'cyan':
        StatusBar.backgroundColorByHexString("#1171AE");
        break;
      case 'magenta':
        StatusBar.backgroundColorByHexString("#AF0058");
        break;
      case 'yellow':
        StatusBar.backgroundColorByHexString("#C9BA0C");
        break;
      case 'white':
        StatusBar.backgroundColorByHexString("#000000");
        break;
      case 'black':
      default:
        StatusBar.backgroundColorByHexString("#000000");
    }
  } else {
    switch (color) {
      case 'cyan':
        StatusBar.styleLightContent();
        StatusBar.backgroundColorByHexString("#009fe3");
        break;
      case 'magenta':
        StatusBar.styleLightContent();
        StatusBar.backgroundColorByHexString("#e6007e");
        break;
      case 'yellow':
        StatusBar.styleDefault();
        StatusBar.backgroundColorByHexString("#ffed00");
        break;
      case 'white':
        StatusBar.styleDefault();
        StatusBar.backgroundColorByHexString("#ffffff");
        break;
      case 'black':
      default:
        StatusBar.styleLightContent();
        StatusBar.backgroundColorByHexString("#000000");
    }
  }
}
