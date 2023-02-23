const AWS = require("aws-sdk");
const dynamoDB = new AWS.DynamoDB.DocumentClient();

/**
 * @param {import("aws-lambda").APIGatewayEvent} event
 * @param {import("aws-lambda").Context} context
 */
exports.handler = async (event, context) => {
  try {
    const { projectId } = event.queryStringParameters;

    if (!projectId) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: "Invalid request: it must have projectId in query params",
        }),
      };
    }

    console.log("Event:", event);
    const dynamoResult = await dynamoDB
      .query({
        TableName: "tasks-table",
        ScanIndexForward: true,
        FilterExpression: "#projectId = :projectId",
        ExpressionAttributeNames: {
          "#projectId": "projectId",
        },
        ExpressionAttributeValues: {
          ":projectId": projectId,
        },
      })
      .promise();
    console.log("dynamoResult:", dynamoResult);

    const tasks = dynamoResult.Items ?? [];
    console.log("tasks:", tasks);

    return {
      statusCode: 200,
      body: JSON.stringify(tasks),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: error.message,
      }),
    };
  }
};
