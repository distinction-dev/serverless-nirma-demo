const AWS = require('aws-sdk');
const dynamoDB = new AWS.DynamoDB.DocumentClient();
const sqs = new AWS.SQS({ region: process.env.AWS_REGION });

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

    const deleteResult = await dynamoDB
      .delete({
        TableName: process.env.PROJECTS_TABLE,
        Key: { id }
      })
      .promise();
    console.log('deleteResult:', deleteResult);


    const deleteCascadeParams = {
      MessageBody: JSON.stringify({
        projectId: id
      }),
      MessageGroupId: id,
      QueueUrl: process.env.PROJECT_DELETE_CASCADE_QUEUE_URL
    };
    const response = await sqs.sendMessage(deleteCascadeParams).promise();
    console.log('Response: ', response);

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
