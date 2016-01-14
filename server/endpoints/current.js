const publishedFields = {
  _id: 0,
  text: 1,
  tags: 1,
  createdAt: 1
};

reportsCurrentEndpoint = {
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
};
