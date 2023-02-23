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

    const putResult = await dynamoDB
      .put({
        TableName: "tasks-table",
        Item: {
          ...body,
          id,
          status: "Not Started",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      })
      .promise();
    console.log("putResult:", putResult);

    const getResult = await dynamoDB
      .get({
        TableName: "tasks-table",
        Key: { id },
      })
      .promise();
    console.log("getResult:", getResult);

    const task = getResult.Item;
    console.log("task:", task);

    return {
      statusCode: 200,
      body: JSON.stringify(task),
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
