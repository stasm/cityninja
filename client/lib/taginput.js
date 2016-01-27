const ws = /[\s.-]+/;
const testDiacritics = /([ĄĆĘŁŃÓŚŹŻ])/;
const replDiacritics = /([ĄĆĘŁŃÓŚŹŻ])/g;
const letters = {
  'Ą': 'A',
  'Ć': 'C',
  'Ę': 'E',
  'Ł': 'L',
  'Ń': 'N',
  'Ó': 'O',
  'Ś': 'S',
  'Ź': 'Z',
  'Ż': 'Z',
};

function withLatin(words) {
  const withDia = words.filter(
    word => testDiacritics.test(word)
  );
  return [
    ...words,
    ...withDia.map(
      word => word.replace(replDiacritics, match => letters[match])
    )
  ];
}

makeTagInput = function(sel, query = {}) {
  const tags = new Bloodhound({
    datumTokenizer: datum => withLatin(datum.name.split(ws)),
    queryTokenizer: query => query.split(ws),
    identify: tag => tag.key,
    local: function() {
      return Tags.find(query).map(
        tag => ({key: tag.key, name: tag.name})
      );
    },
  });

  const tagsinput = $(sel);

  tagsinput.materialtags({
    itemValue: 'key',
    itemText: 'name',
    tagClass: tag =>
      isFav(tag.key) ? 'chip nj-tag nj-tag--fav' : 'chip nj-tag',
    typeaheadjs: [
      {
        hint: false,
        highlight: true,
      },
      {
        name: 'tags',
        displayKey: 'name',
        limit: 100,
        notFound: 'Brak pasujących wyników',
        source: function(query, callback) {
          tags.search(query, function(suggestions) {
            var selected = tagsinput.val();
            callback(
              suggestions.filter(
                tag => selected.indexOf(tag.key) === -1));
          });
        },
      }
    ],
  });

  return tagsinput;
};

updateTagInputs = function() {
  const user = Meteor.user();
  if (!user) {
    return;
  }

  const taginputs = [
    ...document.querySelectorAll('.nj-tagsinput__raw')
  ].map(
    input => $(input)
  );

  taginputs.forEach(taginput => {
    taginput.materialtags('removeAll');
    user.profile.favs.forEach(key => {
      taginput.materialtags('add', {
        key: key,
        name: Tags.findOne({key}).name
      })
    });
  });
}

updateSelectedStopInput = function(taginput) {
  const [key] = Router.current().state.get('new-report-stops');
  if (!key) {
    return;
  }

  taginput.materialtags('removeAll');
  taginput.materialtags('add', {
    key,
    name: Tags.findOne({key}).name
  });
}
