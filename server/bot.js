if (!Meteor.settings.slack) {
  console.log(
    'Meteor.settings.slack is not set. ' +
    'Running without Slack integration.');
  return;
}

var bot = new SlackBot(Meteor.settings.slack);

bot.on(/^pomocy/, function(channel) {
  this.say(channel, 'Co się porobiło?');
});

bot.on(/(.*), prawda\?$/, function(channel, p1) {
  this.say(channel, p1);
});

bot.on(/^zrób psa:?(.*)$/, createPSA.bind(bot));

bot.on(/./, function(channel) {
  this.say(channel, 'Jestem pieskiem.');
});

bot.init(function() {
  Reports.find({
    expired: { $ne: true },
    removed: { $ne: true },
    pushed: { $ne: true },
  }).observe({
    added: postReport.bind(bot)
  });

  var oldest = new Date();
  oldest.setHours(oldest.getHours() - 1);
  Feedbacks.find({
    createdAt: { $gt: oldest }
  }).observe({
    added: postFeedback.bind(bot)
  });
});

function postReport(doc) {
  var channel = this.slack.getChannelGroupOrDMByName(
    Meteor.settings.slack.channel_name);

  var url = Router.routes['report.edit'].url(
    { token: doc.token });

  if (doc.source === 'twitter') {
    this.say(channel, 'Nowy tweet: ' + doc.text + '\n' +
      'Otaguj go: ' + url + '\n' +
      'Więcej informacji: ' +
      'https://twitter.com/' + doc.sourceUser + '/status/' + doc.sourceId);
  } else {
    this.say(channel, 'Nowe zgłoszenie: ' + doc.text + '\n' +
      'Otaguj je: ' + url);
  }
}

function postFeedback(doc) {
  var channel = this.slack.getChannelGroupOrDMByName(
    Meteor.settings.slack.channel_name);

  this.say(channel,
    'Uwaga, nowa uwaga: ' + doc.text + ' (wersja ' + doc.version + ')');
}

function createPSA(channel, text) {
  var token = Random.id();

  Announcements.insert({
    text: text ? text.trim() : '',
    createdAt: new Date(),
    sourceName: 'ninja',
    published: false,
    token: token
  });

  var url = Router.routes['announcement.edit'].url(
    { token: token });

  this.say(channel, 'Utworzyłem nowe ogłoszenie: ' + url);
}
