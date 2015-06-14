Accounts.onCreateUser(function(options, user) {
  user.incoming = {};
  user.outgoing = {};
   if (options.profile) {
     user.profile = options.profile;
   }
  return user;
});
