City Ninja
==========

City Ninja jest platformą wymiany informacji o bieżącym stanie komunikacji 
miejskiej.  Doniesienia o opóźnieniach i kłopotach na trasie są pojawią się 
w czasie rzeczywistym na telefonach wszystkich użytkowników.

W Warszawie, aplikacja działa pod nazwą _Warszawski Ninja_.

  - Strona WWW: [warszawskininja.pl][]
  - Facebook: [facebook.com/warszawski.ninja][]

[warszawskininja.pl]: https://warszawskininja.pl
[facebook.com/warszawski.ninja]: https://www.facebook.com/warszawski.ninja


Inspiracja
----------

Projekt City Ninja zainspirowany został konkursem [Dane po warszawsku][] oraz 
projektem [mbta.ninja][].

[Dane po warszawsku]: http://konkurs.danepowarszawsku.pl/
[mbta.ninja]: http://mbta.ninja


Instalacja
----------

  - Zainstaluj Meteor wg [instrukcji][]:

        curl https://install.meteor.com/ | sh

  - Sklonuj kod:

        git clone https://github.com/stasm/cityninja.git

  - Przejdź do nowo utworzonego katalogu:

        cd cityninja

  - Skopiuj i wyedytuj następujące pliki:

        cp config.push.json.sample config.push.json
        cp mobile-config.js.sample mobile-config.js
        cp client/meta.html.sample client/meta.html
        cp client/lib/custom.js.sample client/lib/custom.js
        cp client/tempates/view-eula.html.sample client/templates/view-eula.html

  - Uruchom lokalny serwer:

        meteor run

[instrukcji]: https://www.meteor.com/install


Licencja i kod źródłowy
-----------------------

Platforma City Ninja jest dostępna na licencji [AGPL3][].  Jeśli masz 
pomysł na usprawnienie działania albo nową funkcję, [zgłoś go][] albo wyślij 
pull requesta!

[AGPL3]: http://opensource.org/licenses/AGPL-3.0
[zgłoś go]: https://github.com/stasm/cityninja/issues


API
---

Platforma City Ninja udostępnia dane poprzez następujące API.

###GET /api/v1/reports/current

Zwraca listę bieżących zgłoszeń w formacie JSON.  Każde zgłoszenie opisane jest
następującymi polami:

  - `source` - źródło zgłoszenia: `user`, `twitter` lub `sms`,

  - `sourceName` - nazwa źródła, na przykład nazwa użytkownika, konta na
    Twitterze lub skrócony nr telefonu,

  - `createdAt` - data utworzenia zgłoszenia w formacie [ISO 8601][],

  - `text` - treść zgłoszenia,

  - `tags` - powiązane ze zgłoszeniem informacje o przystanku i liniach,
    których dotyczy zgłoszenie; tagi występują w postaci tablicy i każdy 
    opisany jest trzema polami:

    - `type` - typ taga: `stop` lub `line`,
    - `key` - unikatowy identyfikator taga, np. nr przystanku (grupy 
      przystanków) lub nr linii wraz z kierunkiem (`A` lub `B`),
    - `name` - czytelna nazwa taga.

W obecnej implementacji tylko jeden tag przypisany do danego zgłoszenia może 
mieć typ `stop`.

Przykład zwróconych danych:

    {
      "status": "ok",
      "data": [
        {
          "source": "user",
          "text": "114 spóźniony 7 min",
          "tags": [
            {
              "type": "line",
              "key": "114B",
              "name": "114 → BRÓDNO-PODGRODZIE"
            },
            {
              "type": "stop",
              "key": "6003",
              "name": "PL.WILSONA"
            }
          ],
          "createdAt": "2016-02-04T16:27:46.362Z",
          "sourceName": "zyrijy"
        },
        {
          "source": "twitter",
          "sourceName": "ZTM Warszawa",
          "text": "Utrudnienia w kursowaniu autobusów linii 136 ",
          "tags": [],
          "createdAt": "2016-02-04T16:48:06.455Z"
        }
      ]
    }

[ISO 8601]: http://www.ecma-international.org/ecma-262/6.0/#sec-date-time-string-format
