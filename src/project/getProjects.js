const AWS = require("aws-sdk");
const dynamoDB = new AWS.DynamoDB.DocumentClient();

/**
 * @param {import("aws-lambda").APIGatewayEvent} event
 * @param {import("aws-lambda").Context} context
 */
exports.handler = async (event) => {
  try {
    console.log("Event:", event);
    const dynamoResult = await dynamoDB
      .scan({
        TableName: process.env.PROJECTS_TABLE,
      })
      .promise();
    console.log("dynamoResult:", dynamoResult);

    const projects = dynamoResult.Items ?? [];
    console.log("projects:", projects);

    return {
      statusCode: 200,
      body: JSON.stringify(projects),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: error.message,
      }),
    };
  }
};
