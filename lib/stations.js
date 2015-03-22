currentLine = function() {
  return Router.current().params.line;
};

currentTransitType = function() {
  return Router.current().params.type;
};

currentStations = function () {
  return stations[currentLine()];
};

listOfLines = function() {
  return {
    subway: [
      {
        line: "Metro M1",
        color: "blue-line",
        type: "subway",
        directions: [
          {direction: "Kierunek Kabaty", path: "M1 → Kabaty"},
          {direction: "Kierunek Młociny", path: "M1 → Młociny"}
        ]
      },
      {
        line: "Metro M2",
        color: "red-line",
        type: "subway",
        directions: [
          {direction: "Kierunek Dworzec Wileński", path: "M2 → Dworzec Wileński"},
          {direction: "Kierunek Rondo Daszyńskiego", path: "M2 → Rondo Daszyńskiego"}
        ]
      },
    ]
  };
};

stations = {
  "M1 → Kabaty": [
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
  "M1 → Młociny": [
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
  "M2 → Dworzec Wileński": [
    {name: 'Rondo Daszyńskiego'},
    {name: 'Rondo ONZ'},
    {name: 'Świętokrzyska'},
    {name: 'Nowy Świat — Uniwersytet'},
    {name: 'Centrum Nauki Kopernik'},
    {name: 'Standion Narodowy'},
    {name: 'Dworzec Wileński'}
  ],
  "M2 → Rondo Daszyńskiego": [
    {name: 'Dworzec Wileński'},
    {name: 'Standion Narodowy'},
    {name: 'Centrum Nauki Kopernik'},
    {name: 'Nowy Świat — Uniwersytet'},
    {name: 'Świętokrzyska'},
    {name: 'Rondo ONZ'},
    {name: 'Rondo Daszyńskiego'}
  ],
};

