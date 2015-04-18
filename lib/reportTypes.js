(function(){
  
reportTypes = {
  subway: [
    {
      name: 'Wszystko OK',
      color: 'light-green',
      icon: 'mdi-action-done'
    },
    {
      name: 'Pociąg stoi',
      color: 'amber darken-4',
      icon: 'mdi-av-pause-circle-fill'
    },
    {
      name: 'Pociąg jedzie powoli',
      color: 'amber darken-3',
      //icon: 'mdi-content-gesture'
      //icon: 'mdi-device-access-time'
      icon: 'mdi-image-timelapse'
    },
    {
      name: 'Pociąg jest zatłoczony',
      color: 'amber darken-2',
      icon: 'mdi-social-people'
    },
    {
      name: 'Pociąg uległ awarii',
      color: 'amber darken-1',
      icon: 'mdi-image-flash-on'
    },
    {
      name: 'Pociąg nie kursuje dalej',
      color: 'amber',
      icon: 'mdi-navigation-cancel'
    },
    {
      name: 'Kontroler na stacji',
      color: 'amber lighten-1',
      //icon: 'mdi-content-flag'
      icon: 'mdi-action-accessibility'
    },
    {
      name: 'Kontroler wsiadł do pociągu',
      color: 'amber lighten-2',
      icon: 'mdi-action-visibility'
    }
  ]
};

})();
