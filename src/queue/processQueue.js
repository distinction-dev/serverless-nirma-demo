/**
 * @param {import("aws-lambda").SQSEvent} event
 * @param {import("aws-lambda").Context} context
 */
exports.handler = async (event, context) => {
  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Go Serverless v1.0! Your function executed successfully!',
      input: event
    })
  };
  try {
    console.log('event: ', JSON.stringify(event));

    const body = JSON.parse(event.Records[0].body);

    response.message = `Received body: ${JSON.stringify(body)}`;

    console.log(response);
  }
  catch (err) {
    console.error(err);
    response.message = err;
  }
  return response;
};
