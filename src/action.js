const core = require("@actions/core");
const github = require("@actions/github");
const AWS = require("aws-sdk");


const AWS_ACCESS_KEY_ID = core.getInput("AWS_ACCESS_KEY_ID", { require: true });
const AWS_SECRET_ACCESS_KEY = core.getInput("AWS_SECRET_ACCESS_KEY", { require: true });
const AWS_REGION = core.getInput("AWS_REGION", { require: true });
const QUEUE_NAME = core.getInput("QUEUE_NAME", { require: true });
const ATTRIBUTE_NAMES = core.getInput("ATTRIBUTE_NAMES");

AWS.config.update({
  region: AWS_REGION,
  accessKeyId: AWS_ACCESS_KEY_ID,
  secretAccessKey: AWS_SECRET_ACCESS_KEY
});

const sqs = new AWS.SQS({ apiVersion: "2012-11-05" });

async function getQueues() {
  var queueParams = {
    QueueName: QUEUE_NAME
  };
  try {
    const result = await sqs.getQueueUrl(queueParams).promise()
    return result.QueueUrl
  } catch (err) {
    console.log(`err ${err.message}`)
  }
}

async function run() {
  try {

   const returnedUrl = getQueues()
   console.log(`RETURNED ${returnedUrl}`); 

   

  //  sqs.getQueueUrl(queueParams, (err, data) => {
  //     if (err) {
  //       core.debug(err.Message);
  //       core.setFailed(err.Message); 
  //     } else {
  //       console.log(`resp ${JSON.stringify(data, null, 2)}`);
  //       const { ResponseMetadata, QueueUrl } = data
  //       return { 
  //         ResponseMetadata,
  //         QueueUrl
  //       }
  //     }
  //   });

  } catch (error) {
    core.setFailed(error.message);
  }
}

module.exports = run;

/**istanbul ignore next */
if (require.main === module) {
  run();
}
