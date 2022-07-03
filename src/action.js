// const core = require('@actions/core');
// const github = require('@actions/github');
// const AWS = require('aws-sdk');

// AWS.config.update({
//   region: "eu-west-2",
//   accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//   secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
// });

// const sqs = new AWS.SQS({apiVersion: '2012-11-05'})

// async function run() {
//   try {
//     const QueueName = core.getInput('queue-name', { require: true });
//     console.log(`QUEUE URL => ${QueueName}`)
//     var queueParams = {
//       QueueName: QueueName
//     }
//     const queueUrl = sqs.getQueueUrl(queueParams, function(err, data) {
//       if (err) {
//         console.log(err, err.stack)
//         return err.stack
//       } else {
//         console.log(data)
//         return data
//       }
//     });
//     console.log(``)
//     const attributeNames = core.getInput('attribute-names')
//     const params = {

//     }

//   } catch(error) {
//     core.setFailed(error.message)
//   }
// }

const core = require("@actions/core");
const github = require("@actions/github");
const AWS = require("aws-sdk");

async function run() {
  try {
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

    console.log(`QUEUE URL => ${QUEUE_NAME}`);
    var queueParams = {
      QueueName: QUEUE_NAME
    };

    const sqs = new AWS.SQS({ apiVersion: "2012-11-05" });

    sqs.getQueueUrl(queueParams, (err, data) => {
      if (err) {
        console.log(err, err.stack);
        throw err;
      } else {
        console.log(`resp ${JSON.stringify(data, null, 2)}`);
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
