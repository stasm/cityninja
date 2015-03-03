currentLine = function() {
  return Router.current().params.line;
};

currentStations = function () {
  return stations[currentLine()];
};

stations = {
  "Metro 1 (kierunek Kabaty)": [
    {name: 'Młociny'},
    {name: 'Wawrzyszew'},
    {name: 'Stare Bielany'},
    {name: 'Słodowiec'},
    {name: 'Marymont'},
    {name: 'Pl. Wilsona'},
    {name: 'Dw. Gdański'},
    {name: 'Ratusz Arsenał'},
    {name: 'Świętokrzyska'},
    {name: 'Centrum'},
    {name: 'Politechnika'},
    {name: 'Pole Mokotowskie'},
    {name: 'Racławicka'},
    {name: 'Wierzbno'},
    {name: 'Wilanowska'},
    {name: 'Służew'},
    {name: 'Ursynów'},
    {name: 'Stokłosy'},
    {name: 'Imielin'},
    {name: 'Natolin'},
    {name: 'Kabaty'}
  ],
  "Metro 1 (kierunek Młociny)": [
    {name: 'Kabaty'},
    {name: 'Natolin'},
    {name: 'Imielin'},
    {name: 'Stokłosy'},
    {name: 'Ursynów'},
    {name: 'Służew'},
    {name: 'Wilanowska'},
    {name: 'Wierzbno'},
    {name: 'Racławicka'},
    {name: 'Pole Mokotowskie'},
    {name: 'Politechnika'},
    {name: 'Centrum'},
    {name: 'Świętokrzyska'},
    {name: 'Ratusz Arsenał'},
    {name: 'Dw. Gdański'},
    {name: 'Pl. Wilsona'},
    {name: 'Marymont'},
    {name: 'Słodowiec'},
    {name: 'Stare Bielany'},
    {name: 'Wawrzyszew'},
    {name: 'Młociny'}
  ],
};
