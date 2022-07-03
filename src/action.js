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

    var queueParams = {
      QueueName: QUEUE_NAME
    };

    const sqs = new AWS.SQS({ apiVersion: "2012-11-05" });

    const { ResponseMetadata, QueueUrl } =  sqs.getQueueUrl(queueParams, (err, data) => {
      if (err) {
        core.debug(err.Message);
        core.setFailed(err.Message); 
      } else {
        console.log(`resp ${JSON.stringify(data, null, 2)}`);
        const { ResponseMetadata, QueueUrl } = data
        return { 
          ResponseMetadata,
          QueueUrl
        }
      }
    });

    console.log(`QUEUE NAME => ${QueueUrl}`)
    console.log(`METADATA => ${ResponseMetadata}`)
  } catch (error) {
    core.setFailed(error.message);
  }
}

module.exports = run;

/**istanbul ignore next */
if (require.main === module) {
  run();
}
