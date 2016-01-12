SlackBot = function(settings) {
  this.rules = [];
  this.slack = new Slack(settings.token, true, true);
};

SlackBot.prototype.init = function(callback) {
  var self = this;

  this.slack.on('error', Meteor.bindEnvironment(function(err) {
    console.error(err);
  }));

  this.slack.on('open', Meteor.bindEnvironment(function() {
    var slack = self.slack;
    console.log(
      'Welcome to ' + slack.team.name + ', ' + slack.self.name + '! ' +
      'Unread messages: ' + slack.getUnreadCount() + '.');

    self.reAtName = new RegExp('<@' + slack.self.id + '>');
    self.rePingAtName = new RegExp('^<@' + slack.self.id + '>:? ?');
    self.rePingPlainName = new RegExp('^' + slack.self.name + ':? ');

    if (callback) {
      callback();
    }

  }));

  this.slack.on('message', Meteor.bindEnvironment(function(message) {
    self.handle(message);
  }));

  this.slack.login();
};

SlackBot.prototype.on = function(regexp, callback) {
  this.rules.push([regexp, callback]);
};

SlackBot.prototype.triggers = function(message) {
  if (message.type !== 'message') {
    return false;
  }

  if (!message.text) {
    return false;
  }

  // direct message to the bot
  if (message.channel[0] === 'D') {
    return true;
  }

  return this.reAtName.test(message.text) ||
    this.rePingPlainName.test(message.text);
};

SlackBot.prototype.say = function(channel, text) {
  var msg = channel.send(text);
  channel.mark(msg.ts);
};

SlackBot.prototype.handle = function(message) {
  if (this.triggers(message)) {
    var channel = this.slack.getChannelGroupOrDMByID(message.channel);
    this.respond(channel, message);
  }
};

SlackBot.prototype.respond = function(channel, message) {
  var text = message.text
    .replace(this.rePingAtName, '')
    .replace(this.rePingPlainName, '');
  this.rules.some(function(rule) {
    var match = text.match(rule[0]);
    if (match) {
      rule[1].apply(this, [channel].concat(match.slice(1)));
      return true;
    }
    return false;
  }, this);
};
