function isBetween(n, start, end) {
  return typeof n === typeof start && start <= n && n <= end;
}

plural = function(n) {
  if ((isBetween((n % 10), 2, 4)) && !(isBetween((n % 100), 12, 14))) {
    return 'few';
  }
  if (n !== 1 && (isBetween((n % 10), 0, 1)) ||
      (isBetween((n % 10), 5, 9)) ||
        (isBetween((n % 100), 12, 14))) {
    return 'many';
  }
  if (n === 1) {
    return 'one';
  }
  return 'other';
};

pickRandom = function(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
};

translations = {
  confirms: {
    one: 'potwierdzenie',
    few: 'potwierdzenia',
    many: 'potwierdzeń',
    other: 'potwierdzenia',
  },
  clears: {
    one: 'odwołanie',
    few: 'odwołania',
    many: 'odwołań',
    other: 'odwołania',
  },
};

taunts = [
  'Jest w miarę okej.',
  'Jest nie najgorzej.',
  'Jest całkiem całkiem.',
  'Jest w porządku, serio.',
  'Jest dobrze. Póki co.'
];

toasts = {
  created: [
    'Dzięki!.',
    'Zgłoszenie rozesłane.',
    'Dobra robota.',
    'Powodzenia.',
  ],
  upvoted: [
    'Dzięki, potwierdzone.',
    'Zgłoszenie potwierdzone.',
    'Dobra robota.',
  ],
  downvoted: [
    'Dzięki, odwołane.',
    'Zgłoszenie odwołane.',
    'Uff!',
  ],
  removed: [
    'Puff!',
    'Było — i nie ma.',
    'Zgłoszenie usunięte',
    'Pomyłka?',
    'I po problemie.',
  ],
  thanked: [
    'Dobrego dnia!',
    'Komuś będzie miło.',
    'Sprzyjających wiatrów!',
  ],
};
