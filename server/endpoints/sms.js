smsReceiveEndpoint = {
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
    const createdByNumber = '+' + from.trim();
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
      createdBy: null,
      createdByNumber: createdByNumber,
      sourceName: createdByNumber.slice(0, 6),
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
};
