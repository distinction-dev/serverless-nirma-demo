const AWS = require("aws-sdk");
const sqs = new AWS.SQS({ region: process.env.AWS_REGION })


/**
 * @param {import("aws-lambda").APIGatewayEvent} event
 * @param {import("aws-lambda").Context} context
 */
exports.handler = async (event) => {
  try {
    console.log("Event:", event);

    if (!event.body.payload) {
      return {
          statusCode: 400,
          body: JSON.stringify({
            message: "No payload available",
          }),
      }; 
    }

    const params = {
      MessageBody: JSON.stringify(event.body.payload),
      MessageGroupId: event.body.groupId ?? 'StandardGroup',
      QueueUrl: process.env.QUEUE_URL
    }
    const response = await sqs.sendMessage(params).promise()
    console.log("Response: ", response)

    return {
      statusCode: 200,
      body: JSON.stringify("Message has been pushed to queue"),
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
}