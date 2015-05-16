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
    wkd: [
      {
        line: "WKD",
        color: "purple-line",
        icon: "mdi-maps-directions-train",
        type: "wkd",
        directions: [
          {direction: "Grodzisk Mazowiecki → Warszawa", path: "Grodzisk Mazowiecki → Warszawa"},
          {direction: "Warszawa → Grodzisk Mazowiecki", path: "Warszawa → Grodzisk Mazowiecki"},
          {direction: "Milanówek → Warszawa", path: "Milanówek → Warszawa"},
          {direction: "Warszawa → Milanówek", path: "Warszawa → Milanówek"}
        ]
      },
    ],
    metro: [
      {
        line: "Metro M1",
        color: "blue-line",
        icon: "mdi-maps-directions-subway",
        type: "metro",
        directions: [
          {direction: "→ Kabaty", path: "M1 → Kabaty"},
          {direction: "→ Młociny", path: "M1 → Młociny"}
        ]
      },
      {
        line: "Metro M2",
        color: "red-line",
        icon: "mdi-maps-directions-subway",
        type: "metro",
        directions: [
          {direction: "→ Dworzec Wileński", path: "M2 → Dworzec Wileński"},
          {direction: "→ Rondo Daszyńskiego", path: "M2 → Rondo Daszyńskiego"}
        ]
      },
    ]
  };
};

stations = {
  "Warszawa → Grodzisk Mazowiecki": [
    {name: "Warszawa Śródmieście WKD"},
    {name: "Warszawa Ochota WKD"},
    {name: "Warszawa Zachodnia WKD"},
    {name: "Warszawa Reduta Ordona"},
    {name: "Warszawa Aleje Jerozolimskie"},
    {name: "Warszawa Raków"},
    {name: "Warszawa Salomea"},
    {name: "Opacz"},
    {name: "Michałowice"},
    {name: "Reguły"},
    {name: "Malichy"},
    {name: "Tworki"},
    {name: "Pruszków WKD"},
    {name: "Komorów"},
    {name: "Nowa Wieś Warszawska"},
    {name: "Kanie Helenowskie"},
    {name: "Otrębusy"},
    {name: "Podkowa Leśna Wschodnia"},
    {name: "Podkowa Leśna Główna"},
    {name: "Podkowa Leśna Zachodnia"},
    {name: "Kazimierówka"},
    {name: "Brzózki"},
    {name: "Grodzisk Maz. Okrężna"},
    {name: "Grodzisk Maz. Piaskowa"},
    {name: "Grodzisk Maz. Jordanowice"},
    {name: "Grodzisk Maz. Radońska"},

  ],
  "Grodzisk Mazowiecki → Warszawa": [
    {name: "Grodzisk Maz. Radońska"},
    {name: "Grodzisk Maz. Jordanowice"},
    {name: "Grodzisk Maz. Piaskowa"},
    {name: "Grodzisk Maz. Okrężna"},
    {name: "Brzózki"},
    {name: "Kazimierówka"},
    {name: "Podkowa Leśna Zachodnia"},
    {name: "Podkowa Leśna Główna"},
    {name: "Podkowa Leśna Wschodnia"},
    {name: "Otrębusy"},
    {name: "Kanie Helenowskie"},
    {name: "Nowa Wieś Warszawska"},
    {name: "Komorów"},
    {name: "Pruszków WKD"},
    {name: "Tworki"},
    {name: "Malichy"},
    {name: "Reguły"},
    {name: "Michałowice"},
    {name: "Opacz"},
    {name: "Warszawa Salomea"},
    {name: "Warszawa Raków"},
    {name: "Warszawa Aleje Jerozolimskie"},
    {name: "Warszawa Reduta Ordona"},
    {name: "Warszawa Zachodnia WKD"},
    {name: "Warszawa Ochota WKD"},
    {name: "Warszawa Śródmieście WKD"},
  ],
  "Milanówek → Warszawa": [
    {name: "Milanówek Grudów"},
    {name: "Polesie"},
    {name: "Podkowa Leśna Zachodnia"},
    {name: "Podkowa Leśna Główna"},
    {name: "Podkowa Leśna Wschodnia"},
    {name: "Otrębusy"},
    {name: "Kanie Helenowskie"},
    {name: "Nowa Wieś Warszawska"},
    {name: "Komorów"},
    {name: "Pruszków WKD"},
    {name: "Tworki"},
    {name: "Malichy"},
    {name: "Reguły"},
    {name: "Michałowice"},
    {name: "Opacz"},
    {name: "Warszawa Salomea"},
    {name: "Warszawa Raków"},
    {name: "Warszawa Aleje Jerozolimskie"},
    {name: "Warszawa Reduta Ordona"},
    {name: "Warszawa Zachodnia WKD"},
    {name: "Warszawa Ochota WKD"},
    {name: "Warszawa Śródmieście WKD"},
  ],
  "Warszawa → Milanówek": [
    {name: "Warszawa Śródmieście WKD"},
    {name: "Warszawa Ochota WKD"},
    {name: "Warszawa Zachodnia WKD"},
    {name: "Warszawa Reduta Ordona"},
    {name: "Warszawa Aleje Jerozolimskie"},
    {name: "Warszawa Raków"},
    {name: "Warszawa Salomea"},
    {name: "Opacz"},
    {name: "Michałowice"},
    {name: "Reguły"},
    {name: "Malichy"},
    {name: "Tworki"},
    {name: "Pruszków WKD"},
    {name: "Komorów"},
    {name: "Nowa Wieś Warszawska"},
    {name: "Kanie Helenowskie"},
    {name: "Otrębusy"},
    {name: "Podkowa Leśna Wschodnia"},
    {name: "Podkowa Leśna Główna"},
    {name: "Podkowa Leśna Zachodnia"},
    {name: "Polesie"},
    {name: "Milanówek Grudów"},
  ],
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
    {name: 'Stadion Narodowy'},
    {name: 'Dworzec Wileński'}
  ],
  "M2 → Rondo Daszyńskiego": [
    {name: 'Dworzec Wileński'},
    {name: 'Stadion Narodowy'},
    {name: 'Centrum Nauki Kopernik'},
    {name: 'Nowy Świat — Uniwersytet'},
    {name: 'Świętokrzyska'},
    {name: 'Rondo ONZ'},
    {name: 'Rondo Daszyńskiego'}
  ],
};

