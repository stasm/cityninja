if (!Meteor.settings.twitter) {
  console.log(
    'Meteor.settings.twitter is not set. ' +
    'Running without Twitter integration.');
  return;
}

Logs = new Mongo.Collection('logs');

var client = new Twitter({
  consumer_key: Meteor.settings.twitter.consumer_key,
  consumer_secret: Meteor.settings.twitter.consumer_secret,
  access_token_key: Meteor.settings.twitter.access_token_key,
  access_token_secret: Meteor.settings.twitter.access_token_secret
});

var ACCOUNTS = [
  1707334088, // @ztm_warszawa
  1143227575  // @PruszkowWawa
];


// https://dev.twitter.com/streaming/overview/request-parameters
var params = {
  filter_level: 'medium',
  follow: ACCOUNTS.join(','),
  track: 'tram,bus,metro,skm,kolej,km,utrudnienia,awaria,odwołany,opóźniony',
};

function isOwn(tweet) {
  // check if author is in ACCOUNTS
  if (ACCOUNTS.indexOf(tweet.user.id) === -1) {
    return false;
  }

  // check if not a reply
  if (tweet.in_reply_to_user_id === null) {
    return true;
  }

  // check if reply to own tweet
  if (tweet.in_reply_to_user_id === tweet.user.id) {
    return true;
  }

  return false;
}

Twitter.streamAsync(client, 'statuses/filter', params, function(stream) {
  stream.on('data', Meteor.bindEnvironment(function(tweet) {
    if (isOwn(tweet)) {
      Reports.insert({
        source: 'twitter',
        name: tweet.text,
        thanks: [],
        confirms: [],
        clears: [],
        createdAt: new Date(),
        createdBy: tweet.user.name,
        expired: false,
        removed: false,
        weight: 180 // 3h
      });
    }
  }));

  stream.on('error', Meteor.bindEnvironment(function(error) {
    Logs.insert({
      error: error,
      createdAt: new Date(),
    });
  }));
});
