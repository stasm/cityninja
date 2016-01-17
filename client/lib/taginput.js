makeTagInput = function(sel) {
  var tags = new Bloodhound({
    datumTokenizer: Bloodhound.tokenizers.obj.nonword('name'),
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    limit: Infinity,
    local: function() {
      return Tags.find().fetch();
    },
  });

  tags.initialize();

  const tagsinput = $(sel);

  tagsinput.materialtags({
    itemValue: 'key',
    itemText: 'name',
    typeaheadjs: {
      name: 'tags',
      displayKey: 'name',
      source: function(query, callback) {
        tags.search(query, function(suggestions) {
          var selected = tagsinput.val();
          callback(
            suggestions.filter(
              removeSelected.bind(null, selected)).slice(0, 5));
        });
      },
    }
  });

  return tagsinput;

  function removeSelected(selected, tag) {
    return selected.indexOf(tag.key) === -1;
  }
};

