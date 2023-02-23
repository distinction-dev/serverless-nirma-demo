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
    const body = JSON.parse(event.body);

    const getResult = await dynamoDB
      .get({
        TableName: "process.env.TASKS_TABLE",
        Key: { id },
      })
      .promise();
    console.log("getResult:", getResult);

    const task = getResult.Item;
    console.log("task:", task);

    if (!task) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: "Task not found!",
        }),
      };
    }

    const putResult = await dynamoDB
      .put({
        TableName: "process.env.TASKS_TABLE",
        Item: {
          ...task,
          ...body,
          id,
          updatedAt: new Date(),
        },
      })
      .promise();

    console.log("putResult:", putResult);

    const getUpdatedResult = await dynamoDB
      .get({
        TableName: "process.env.TASKS_TABLE",
        Key: { id },
      })
      .promise();
    console.log("getUpdatedResult:", getUpdatedResult);

    const updatedTask = getUpdatedResult.Item;
    console.log("updatedTask:", updatedTask);

    return {
      statusCode: 200,
      body: JSON.stringify(updatedTask),
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
