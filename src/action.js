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
  var params = {
    QueueName: QUEUE_NAME
  };
  try {
    const result = await sqs.getQueueUrl(params).promise()
    return result.QueueUrl
  } catch (err) {
    console.log(`err ${err.message}`)
  }
}


async function run() {
  try {
   const queueUrl = await  getQueues()
  //  console.log(`RETURNED ${queueUrl}`); 
  
   var params = {
    QueueUrl: queueUrl  
   }

   sqs.receiveMessage(params, (err, data) => {
      if (err) {
        // core.debug( err.Message);
        core.setFailed(err.Message);
        console.log(`err ${err.message}`) 
      } else {
        core.setOutput('messages', data.Messages[0].Body)
        console.log(`resp ${JSON.stringify(data.Messages[0].Body, null, 2)}`);
        // return data.Messages[0].Body
      }
    });

  } catch (error) {
    core.setFailed(error.message);
  }
}

module.exports = run;

/**istanbul ignore next */
if (require.main === module) {
  run();
}
