(function(){

reportCategories = [
  {
    name: 'normal',
    textcolor: 'light-green',
    icon: 'mdi-action-done',
  },
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

var allReportTypes = [
  {
    category: 'normal',
    name: 'Wszystko OK',
    color: 'light-green',
    icon: 'mdi-action-done'
  },
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
    name: 'Pociąg nie kursuje dalej',
    color: 'amber darken-2',
    icon: 'mdi-navigation-cancel'
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
  }
];

reportTypes = {
  metro: allReportTypes,
  wkd: allReportTypes.slice(0, 5),
  skm: allReportTypes.slice(0, 5),
  km: allReportTypes.slice(0, 5)
};

})();
