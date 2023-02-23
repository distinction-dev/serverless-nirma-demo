const AWS = require('aws-sdk');
const dynamoDB = new AWS.DynamoDB.DocumentClient();

/**
 * @param {import("aws-lambda").APIGatewayEvent} event
 * @param {import("aws-lambda").Context} context
 */
exports.handler = async (event) => {
  try {
    const { id } = event.pathParameters;
    console.log(event);
    const dynamoResult = await dynamoDB
      .get({
        TableName: process.env.PROJECTS_TABLE,
        Key: { id }
      })
      .promise();

    console.log('dynamoResult:', dynamoResult);

    const project = dynamoResult.Item;
    console.log('project:', project);

    if (!project) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: 'Project not found!'
        })
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify(project)
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
