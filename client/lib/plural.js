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
