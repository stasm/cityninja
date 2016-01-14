AccountsGuest.anonymous = true;

Accounts.onCreateUser(function(options, user) {
  user.lastSeen = user.createdAt;
  user.achievements = [];
  user.incoming = {
    'reports-thanked': [],
    'reports-upvoted': [],
    'reports-downvoted': [],
    'reports-commented': [],
  };
  user.outgoing = {
    'reports-created': [],
    'reports-thanked': [],
    'reports-upvoted': [],
    'reports-downvoted': [],
    'reports-commented': [],
  };
  if (options.profile) {
    user.profile = options.profile;
  }
  user.profile.favs = [];
  user.profile['push-report-new-enabled'] = true;
  user.profile['push-report-thanks-enabled'] = true;
  user.profile['push-all-anytime'] = false;
  user.profile.nickname = generateNickname(6);
  return user;
});

const vowels = 'aeiouy';
const consonants = 'bcdfghjklmnprstwz';

function buildString(seq) {
  return seq + pickRandom(
    seq.length % 2 ? vowels : consonants);
}

function generateNickname(len) {
  return Array.from(new Array(len)).reduce(buildString, '');
}
