const AWS = require('aws-sdk');
const dynamoDB = new AWS.DynamoDB.DocumentClient();

/**
 * @param {import("aws-lambda").APIGatewayEvent} event
 * @param {import("aws-lambda").Context} context
 */
exports.handler = async (event) => {
  try {
    console.log(event);
    const { id } = event.pathParameters;
    const body = JSON.parse(event.body);

    const getResult = await dynamoDB
      .get({
        TableName: process.env.PROJECTS_TABLE,
        Key: { id }
      })
      .promise();
    console.log('getResult:', getResult);

    const project = getResult.Item;
    console.log('project:', project);

    if (!project) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: 'Project not found!'
        })
      };
    }

    const putResult = await dynamoDB
      .put({
        TableName: process.env.PROJECTS_TABLE,
        Item: {
          ...project,
          ...body,
          id,
          updatedAt: new Date().toISOString()
        }
      })
      .promise();

    console.log('putResult:', putResult);

    const getUpdatedResult = await dynamoDB
      .get({
        TableName: process.env.PROJECTS_TABLE,
        Key: { id }
      })
      .promise();
    console.log('getUpdatedResult:', getUpdatedResult);

    const updatedProject = getUpdatedResult.Item;
    console.log('updatedProject:', updatedProject);

    return {
      statusCode: 200,
      body: JSON.stringify(updatedProject)
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
