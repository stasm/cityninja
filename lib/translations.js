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

howMany = function(num, trans) {
  return num + ' ' + trans[plural(num)];
};

numVotes = function(sep, confirms, clears) {
  return [
    [confirms, translations.confirms],
    [clears, translations.clears]
  ].filter(
    function(elem) { return elem[0] !== 0; }).map(
      Function.prototype.apply.bind(howMany, null)).join(sep);
};

numThanks = function(thanks) {
  return thanks === 1 ?
    'Dobra robota!' :
    'Masz już ' + thanks + ' ' + translations.thanksReceived[plural(thanks)];
};

translations = {
  confirms: {
    one: 'potwierdzenie',
    few: 'potwierdzenia',
    many: 'potwierdzeń',
  },
  clears: {
    one: 'odwołanie',
    few: 'odwołania',
    many: 'odwołań',
  },
  reports: {
    one: 'zgłoszenie',
    few: 'zgłoszenia',
    many: 'zgłoszeń',
  },
  peopleSent: {
    one: 'osoba wysłała',
    few: 'osoby wysłały',
    many: 'osób wysłało',
  },
  thanksReceived: {
    one: 'otrzymane podziękowanie.',
    few: 'otrzymane podziękowania.',
    many: 'otrzymanych podziękowań.',
  }
};

taunts = [
  'Wszystko OK.',
  'Jest super.',
  'Jest w porządku, serio.',
  'Brak zgłoszeń oznacza… brak zgłoszeń.',
  'Jeśli nie ma rozwiązania, to nie ma problemu.',
  'Dobrego dnia!',
];

toasts = {
  created: [
    'Dzięki!',
    'Zgłoszenie rozesłane.',
    'Dobra robota.',
    'Powodzenia.',
  ],
  upvoted: [
    'Dzięki, potwierdzone.',
    'Zgłoszenie potwierdzone.',
    'Dobra robota.',
    'A więc jednak.',
  ],
  downvoted: [
    'Dzięki, odwołane.',
    'Zgłoszenie odwołane.',
    'Dobra robota.',
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
