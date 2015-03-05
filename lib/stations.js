currentLine = function() {
  return Router.current().params.line;
};

currentStations = function () {
  return stations[currentLine()];
};

stations = {
  "Metro M1 (kierunek Kabaty)": [
    {name: 'Młociny'},
    {name: 'Wawrzyszew'},
    {name: 'Stare Bielany'},
    {name: 'Słodowiec'},
    {name: 'Marymont'},
    {name: 'Plac Wilsona'},
    {name: 'Dworzec Gdański'},
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
  "Metro M1 (kierunek Młociny)": [
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
    {name: 'Dworzec Gdański'},
    {name: 'Plac Wilsona'},
    {name: 'Marymont'},
    {name: 'Słodowiec'},
    {name: 'Stare Bielany'},
    {name: 'Wawrzyszew'},
    {name: 'Młociny'}
  ],
  "Metro M2 (kierunek Dworzec Wileński)": [
    {name: 'Rondo Daszyńskiego'},
    {name: 'Rondo ONZ'},
    {name: 'Świętokrzyska'},
    {name: 'Nowy Świat — Uniwersytet'},
    {name: 'Centrum Nauki Kopernik'},
    {name: 'Standion Narodowy'},
    {name: 'Dworzec Wileński'}
  ],
  "Metro M2 (kierunek Rondo Daszyńskiego)": [
    {name: 'Dworzec Wileński'},
    {name: 'Standion Narodowy'},
    {name: 'Centrum Nauki Kopernik'},
    {name: 'Nowy Świat — Uniwersytet'},
    {name: 'Świętokrzyska'},
    {name: 'Rondo ONZ'},
    {name: 'Rondo Daszyńskiego'}
  ],
};

