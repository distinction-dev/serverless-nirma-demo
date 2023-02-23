const AWS = require('aws-sdk');
const dynamoDB = new AWS.DynamoDB.DocumentClient();


/**
 * @param {import("aws-lambda").SQSEvent} event
 * @param {import("aws-lambda").Context} context
 */
exports.handler = async (event, context) => {
  try {
    console.log('event: ', JSON.stringify(event));
    const { projectId } = JSON.parse(event.Records[0].body);

    const deleteResult = await dynamoDB
      .delete({
        TableName: process.env.TASKS_TABLE,
        Key: { projectId }
      })
      .promise();
    console.log('deleteResult:', deleteResult);

    const body = JSON.parse(event.Records[0].body);

    const response = {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Success!'
      })
    };
    response.message = `Received body: ${JSON.stringify(body)}`;

    console.log(response);
    return response;
  }
  catch (err) {
    console.error(err);
    const response = {
      statusCode: 200,
      body: JSON.stringify({
        message: err.message
      })
    };

    return response;
  }
};
