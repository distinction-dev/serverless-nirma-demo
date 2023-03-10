const AWS = require("aws-sdk");
const dynamoDB = new AWS.DynamoDB.DocumentClient();

/**
 * @param {import("aws-lambda").APIGatewayEvent} event
 * @param {import("aws-lambda").Context} context
 */
exports.handler = async (event) => {
  try {
    console.log(event);
    const { id } = event.pathParameters;

    const getResult = await dynamoDB
      .get({
        TableName: "projects-table",
        Key: { id },
      })
      .promise();
    console.log("getResult:", getResult);

    const project = getResult.Item;
    console.log("project:", project);

    if (!project) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: "Project not found!",
        }),
      };
    }

    const deleteResult = await dynamoDB
      .delete({
        TableName: "projects-table",
        Key: { id },
      })
      .promise();
    console.log("deleteResult:", deleteResult);

    return {
      statusCode: 200,
      body: JSON.stringify(project),
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
