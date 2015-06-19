reportCategories = [
  {
    name: 'traffic',
    textcolor: 'amber-text darken-2',
    icon: 'mdi-alert-warning',
  },
  {
    name: 'control',
    color: 'light-blue-text',
    icon: 'mdi-action-visibility',
  }
];

allReportTypes = [
  {
    category: 'traffic',
    name: 'Pociąg stoi',
    color: 'amber darken-2',
    icon: 'mdi-av-pause-circle-fill'
  },
  {
    category: 'traffic',
    name: 'Pociąg jedzie powoli',
    color: 'amber darken-2',
    icon: 'mdi-image-timelapse'
  },
  {
    category: 'traffic',
    name: 'Pociąg jest zatłoczony',
    color: 'amber darken-2',
    icon: 'mdi-social-people'
  },
  {
    category: 'traffic',
    name: 'Pociąg uległ awarii',
    color: 'amber darken-2',
    icon: 'mdi-image-flash-on'
  },
  {
    category: 'traffic',
    name: 'Pociąg jest opóźniony',
    color: 'amber darken-2',
    icon: 'mdi-hardware-watch'
  },
  {
    category: 'control',
    name: 'Kontroler na stacji',
    color: 'light-blue',
    icon: 'mdi-action-accessibility'
  },
  {
    category: 'control',
    name: 'Kontroler wsiadł do pociągu',
    color: 'light-blue',
    icon: 'mdi-action-visibility'
  },
  {
    category: 'other',
    name: 'Zgłoś coś innego…',
    color: 'amber',
    icon: 'mdi-alert-warning'
  }
];

reportTypes = {
  common: [
    allReportTypes[0],
    allReportTypes[1],
    allReportTypes[4],
    allReportTypes[7]
  ],
  metro: allReportTypes.slice(0, 4).concat(allReportTypes.slice(-3, -1)),
  wkd: allReportTypes.slice(0, 5),
  skm: allReportTypes.slice(0, 5),
  km: allReportTypes.slice(0, 5)
};
