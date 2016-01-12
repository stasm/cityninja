SyncedCron.config({
  log: false,
  collectionTTL: 172800, // autoremove logs after 48h
});

// Task to expire old reports. It checks every minute to see if there are
// tasks reported/confirmed more than 30 minutes ago.
SyncedCron.add({
  name: 'expire',
  schedule: function(parser) {
    return parser.text('every 1 minute');
  },
  job: function() {
    Reports.update({
      source: { $in: ['user', 'sms', 'twitter']},
      expired: { $ne: true },
      removed: { $ne: true },
    }, {
      $inc: {weight: -1}
    }, {
      multi: true
    });

    // Expire the ones with 0 or negative weights
    Reports.update({
      weight: { $lte: 0 }
    }, {
      $set: { expired: true }
    }, {
      multi: true
    });
  }
});

SyncedCron.start();

