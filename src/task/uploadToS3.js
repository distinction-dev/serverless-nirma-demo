const AWS = require('aws-sdk');
const s3 = new AWS.S3();
const multipart = require('parse-multipart-data');
const dynamoDB = new AWS.DynamoDB.DocumentClient();

// eslint-disable-next-line no-unused-vars
exports.handler = async (event, _context) => {
  try {
    console.log(event);
    const body = event.body;

    const taskId = event.pathParameters.id;

    const getResult = await dynamoDB
      .get({
        TableName: process.env.TASKS_TABLE,
        Key: { id: taskId }
      })
      .promise();
    console.log('getResult:', getResult);

    const task = getResult.Item;
    console.log('task:', task);

    if (!task) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: 'Task not found!'
        })
      };
    }

    // Get form data from body string
    const bodyBuffer = Buffer.from(body, 'utf8');

    // headers keys are case-insensitive set 'Content-Type' in axios headers key
    let boundary = '';
    if (event.headers['Content-Type']) {
      boundary = event.headers['Content-Type'].split('boundary=')[1];
    }
    else if (event.headers['content-type']) {
      boundary = event.headers['content-type'].split('boundary=')[1];
    }
    else {
      console.error('Enter correct "Content-Type" key in headers!');
      throw new Error('Enter correct "Content-Type" key in headers!');
    }

    const formDataArray = multipart.parse(bodyBuffer, boundary);
    // log formDataArray to see form data
    console.log('\nformDataArray: ', formDataArray);

    const formFile = formDataArray[0];

    const fileName = `${taskId}/${formFile.filename}`;
    console.log(fileName);

    // Upload file to S3 bucket
    const bucket = process.env.BUCKET_NAME;
    console.log('Bucket: ', bucket);

    const bodyStr = formFile.data.toString('utf8').trim();
    const params = {
      Bucket: bucket,
      Key: fileName,
      Body: bodyStr
    };

    // call S3 to retrieve upload file to specified bucket
    await s3.upload(params).promise();

    const putResult = await dynamoDB
      .put({
        TableName: process.env.TASKS_TABLE,
        Item: {
          ...task,
          id: taskId,
          attachments: formFile.filename,
          updatedAt: new Date().toISOString()
        }
      })
      .promise();

    console.log('putResult:', putResult);

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: event.body
      })
    };
  }
  catch (error) {
    console.error(error);
  }
};
