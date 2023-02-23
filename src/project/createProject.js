const AWS = require("aws-sdk");
const { uuid } = require("uuidv4");
const dynamoDB = new AWS.DynamoDB.DocumentClient();

/**
 * @param {import("aws-lambda").APIGatewayEvent} event
 * @param {import("aws-lambda").Context} context
 */
exports.handler = async (event) => {
  try {
    console.log(event);

    const body = JSON.parse(event.body);

    const id = uuid();
    console.log({
      ...body,
      id,
      status: "Not Started",
    });

    const putResult = await dynamoDB
      .put({
        TableName: process.env.PROJECTS_TABLE,
        Item: {
          ...body,
          id,
          status: "Not Started",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      })
      .promise();
    console.log("putResult:", putResult);

    const getResult = await dynamoDB
      .get({
        TableName: process.env.PROJECTS_TABLE,
        Key: { id },
      })
      .promise();
    console.log("getResult:", getResult);

    const project = getResult.Item;
    console.log("project:", project);

    return {
      statusCode: 200,
      body: JSON.stringify(project),
    };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: error.message,
      }),
    };
  }
};
