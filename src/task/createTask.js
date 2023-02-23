const AWS = require('aws-sdk');
const { uuid } = require('uuidv4');
const dynamoDB = new AWS.DynamoDB.DocumentClient();

/**
 * @param {import("aws-lambda").APIGatewayEvent} event
 * @param {import("aws-lambda").Context} context
 */
exports.handler = async (event) => {
  try {
    console.log(event);

    const body = JSON.parse(event.body);

    if (!body.projectId) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: 'Invalid request: it must have projectId'
        })
      };
    }

    const id = uuid();

    const putResult = await dynamoDB
      .put({
        TableName: process.env.TASKS_TABLE,
        Item: {
          ...body,
          id,
          status: 'Not Started',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }
      })
      .promise();
    console.log('putResult:', putResult);

    const getResult = await dynamoDB
      .get({
        TableName: process.env.TASKS_TABLE,
        Key: { id }
      })
      .promise();
    console.log('getResult:', getResult);

    const task = getResult.Item;
    console.log('task:', task);

    return {
      statusCode: 200,
      body: JSON.stringify(task)
    };
  }
  catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: error.message
      })
    };
  }
};
