makeTagInput = function(sel) {
  var tags = new Bloodhound({
    datumTokenizer: Bloodhound.tokenizers.obj.nonword('name'),
    queryTokenizer: Bloodhound.tokenizers.nonword,
    identify: function(tag) { return tag.key; },
    limit: Infinity,
    local: function() {
      return Tags.find().fetch();
    },
  });

  const tagsinput = $(sel);

  tagsinput.materialtags({
    itemValue: 'key',
    itemText: 'name',
    tagClass: tag =>
      isFav(tag.key) ? 'chip chip--fav' : 'chip',
    typeaheadjs: [
      {
        hint: false,
        highlight: true,
      },
      {
        name: 'tags',
        displayKey: 'name',
        limit: Infinity,
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
