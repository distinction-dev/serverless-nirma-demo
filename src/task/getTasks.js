const AWS = require('aws-sdk');
const dynamoDB = new AWS.DynamoDB.DocumentClient();

/**
 * @param {import("aws-lambda").APIGatewayEvent} event
 * @param {import("aws-lambda").Context} context
 */
exports.handler = async (event) => {
  try {
    const { projectId } = event.queryStringParameters;

    if (!projectId) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: 'Invalid request: it must have projectId in query params'
        })
      };
    }

    console.log('Event:', event);
    const dynamoResult = await dynamoDB
      .query({
        TableName: process.env.TASKS_TABLE,
        ScanIndexForward: true,
        IndexName: 'task-project-index',
        KeyConditionExpression: '#projectId = :p_Id',
        ExpressionAttributeValues: {
          ':p_Id': projectId
        },
        ExpressionAttributeNames: {
          '#projectId': 'projectId'
        }
      })
      .promise();
    console.log('dynamoResult:', dynamoResult);

    const tasks = dynamoResult.Items ?? [];
    console.log('tasks:', tasks);

    return {
      statusCode: 200,
      body: JSON.stringify(tasks)
    };
  }
  catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: error.message
      })
    };
  }
};
