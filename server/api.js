Meteor.startup(function() {
  var API = new Restivus({
    version: 'v1',
    useAuth: false,
    prettyJson: true
  });

  var publishedFields = {
    _id: 0,
    text: 1,
    tags: 1,
    createdAt: 1
  };

  API.addRoute('reports/current',
    {
      authRequired: false
    },
    {
      get: function() {
        return {
          statusCode:200, 
          body: {
            status: 'ok',
            data: Reports.find({
              expired: { $ne: true },
              removed: { $ne: true },
            }, {
              fields: publishedFields
            }).fetch()
          }
        };
      }
    }
  );

  API.addRoute('sms/receive',
    {
      authRequired: false
    },
    {
      get: function() {
        const msg = this.queryParams.msg;
        const from = this.queryParams.from;

        if (!msg) {
          return {
            statusCode: 500,
            body: {
              status: 'error',
              message: 'Error: Missing message text.'
            }
          };
        }

        if (!from) {
          return {
            statusCode: 500,
            body: {
              status: 'error',
              message: 'Error: Missing "from" number.'
            }
          };
        }

        const text = msg.trim();
        const createdBy = from.trim();
        const createdAt = new Date();

        const reportId = Reports.insert({
          source: 'sms',
          text: text,
          tags: [],
          thanks: [],
          upvotes: [],
          downvotes: [],
          createdAt: createdAt,
          createdBy: createdBy,
          sourceName: createdBy.slice(0, 3) + '******',
          expired: false,
          removed: false,
          token: Random.id(),
          weight: CONFIG.initialWeight
        });

        if (!reportId) {
          return {
            statusCode: 500,
            body: {
              status: 'error',
              message: 'Error: Cannot create a new report.'
            }
          };
        }

        return {
          statusCode: 200,
          body: {
            status: 'ok',
            data: {
              id: reportId,
              text: text,
              createdAt: createdAt
            }
          }
        };
      }
    }
  );
});

