Meteor.startup(function() {
  Restivus.configure({
    useAuth: false,
    prettyJson:true
  });

  //GET api/reports
  Restivus.addRoute('reports/current',
    {
      authRequired: false
    },
    {
      get: function() {
        return {
          statusCode:200, 
          body: {
            data: Reports.find({expired: false}).fetch()
          }
        };
      }
    }
  );
});

