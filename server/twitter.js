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

var KEYWORDS = [
  'tram', 'bus', 'metro', 'skm', 'kolej', 'km', 'utrudnienia', 'awaria',
  'odwołany', 'opóźniony',
];

// https://dev.twitter.com/streaming/overview/request-parameters
var params = {
  filter_level: 'none',
  follow: ACCOUNTS.join(','),
};

function isOwn(tweet) {
  // true if not a reply or reply to own tweet
  return ACCOUNTS.indexOf(tweet.user.id) !== -1 &&
    (tweet.in_reply_to_user_id === null ||
     tweet.in_reply_to_user_id === tweet.user.id);
}

function hasKeywords(tweet) {
  var text = tweet.text.toLowerCase();

  function inText(key) {
    return text.indexOf(key) !== -1;
  }

  return KEYWORDS.some(inText);
}

Twitter.streamAsync(client, 'statuses/filter', params, function(stream) {
  stream.on('data', Meteor.bindEnvironment(function(tweet) {
    if (isOwn(tweet) && hasKeywords(tweet)) {
      createReportFromTweet(tweet);
    }
  }));

  stream.on('error', Meteor.bindEnvironment(function(error) {
    Logs.insert({
      error: error,
      createdAt: new Date(),
    });
  }));
});

function createReportFromTweet(tweet) {
  tweet.entities.urls.forEach(function(link) {
    tweet.text = tweet.text.replace(link.url, link.display_url);
  });
  Reports.insert({
    source: 'twitter',
    sourceName: tweet.user.name,
    sourceUser: tweet.user.screen_name,
    sourceId: tweet.id_str,
    name: text,
    thanks: [],
    confirms: [],
    clears: [],
    createdAt: new Date(),
    createdBy: tweet.user.id_str,
    expired: false,
    removed: false,
    weight: 180 // 3h
  });
}
