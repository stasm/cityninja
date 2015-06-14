Accounts.onCreateUser(function(options, user) {
  user.incoming = {};
  user.outgoing = {};
  if (options.profile) {
    user.profile = options.profile;
  }
  user.profile.favs = [];
  return user;
});
