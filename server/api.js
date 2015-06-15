Meteor.startup(function() {
  Restivus.configure({
    useAuth: false,
    prettyJson:true
  });

  var publishedFields = {
    _id: 0,
    name: 1,
    location: 1,
    line: 1,
    dir: 1,
    createdAt: 1
  };

  //GET api/reports/current
  Restivus.addRoute('reports/current',
    {
      authRequired: false
    },
    {
      get: function() {
        return {
          statusCode:200, 
          body: {
            data: Reports.find(
              {expired: false},
              {fields: publishedFields}).fetch()
          }
        };
      }
    }
  );
});

