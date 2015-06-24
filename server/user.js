Accounts.onCreateUser(function(options, user) {
  user.lastSeen = user.createdAt;
  user.achievements = [];
  user.incoming = {};
  user.outgoing = {};
  if (options.profile) {
    user.profile = options.profile;
  }
  user.profile.favs = [];
  return user;
});
