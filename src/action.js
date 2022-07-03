const core = require('@actions/core');
const github = require('@actions/github');
const aws = require('aws-sdk');

// const sqs = new AWS.SQS({apiVersion: '2012-11-05'})


async function run() {
  try {
    const QueueName = core.getInput('queue-name', { require: true });
    console.log(`QUEUE URL => ${QueueName}`)
    var queueParams = {
      QueueName: QueueName
    }

    const sqs = new aws.SQS(); 
    sqs.getQueueUrl(queueParams, (err, data) => {
      if (err) {
        console.log(err, err.stack)
        throw err;
      } else {
        console.log(`resp ${JSON.stringify(data, null, 2)}`);
      }
    });
   

  } catch(error) {
    core.setFailed(error.message)
  }
}

module.exports = run;

/**istanbul ignore next */
if(require.main === module) {
  run()
}