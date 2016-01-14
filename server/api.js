Meteor.startup(function() {
  var API = new Restivus({
    version: 'v1',
    useAuth: false,
    prettyJson: true
  });

  API.addRoute('reports/current',
    {
      authRequired: false
    },
    reportsCurrentEndpoint
  );

  API.addRoute('sms/receive',
    {
      authRequired: false
    },
    smsReceiveEndpoint
  );

  API.addRoute('reports',
    {
      authRequired: false
    },
    reportsEndpoint
  );
});
