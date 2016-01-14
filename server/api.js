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
        const createdBy = '+' + from.trim();
        const createdAt = new Date();

        const reportId = Reports.insert({
          source: 'sms',
          text: text,
          tags: [],
          thanks: [],
          allthanks: [],
          upvotes: [],
          downvotes: [],
          createdAt: createdAt,
          createdBy: createdBy,
          sourceName: createdBy.slice(0, 6) + '******',
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

  API.addRoute('reports',
    {
      authRequired: false
    },
    {
      post: function() {
        const msg = this.bodyParams.msg;
        const from = this.bodyParams.from;

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
              message: 'Error: Missing "from" nickname.'
            }
          };
        }

        const text = msg.trim();
        const sourceName = from.trim();
        const createdAt = new Date();

        const user = Meteor.users.findOne({
          'profile.nickname': sourceName
        });

        if (!user) {
          return {
            statusCode: 500,
            body: {
              status: 'error',
              message: 'Error: The user doesn\'t exist'
            }
          };
        }

        const reportId = Reports.insert({
          source: 'user',
          text: text,
          tags: [],
          thanks: [],
          allthanks: [],
          upvotes: [],
          downvotes: [],
          createdAt: createdAt,
          createdBy: user._id,
          sourceName: sourceName,
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
