const AWS = require("aws-sdk");
const dynamoDB = new AWS.DynamoDB.DocumentClient();

/**
 * @param {import("aws-lambda").APIGatewayEvent} event
 * @param {import("aws-lambda").Context} context
 */
exports.handler = async (event, context) => {
  try {
    const { id } = event.pathParameters;
    console.log(event);
    const dynamoResult = await dynamoDB
      .get({
        TableName: "projects-table",
        Key: { id },
      })
      .promise();

    console.log("dynamoResult:", dynamoResult);

    const project = dynamoResult.Item;
    console.log("project:", project);

    if (!project) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: "Project not found!",
        }),
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify(project),
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
