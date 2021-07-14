const TokenValidator = require('twilio-flex-token-validator').functionValidator;

let path = Runtime.getFunctions()['survey-utils'].path;
let assets = require(path);

exports.handler = TokenValidator(async (context, event, callback) => {
  console.log('CALL SID: ', event.callSid);
  // let sample = { callerStatus: 'enqueued', message: 'survey connected' };
  // let body = new Promise(function (resolve, reject) {
  //   setTimeout(() => resolve(sample), 1000);
  // });

  const client = context.getTwilioClient();

  const response = await client.calls(event.callSid).update({
    twiml: `<Response><Enqueue>Hold for survey</Enqueue></Response>`,
  });

  const callObj = { callSid: await response.sid };
  console.log('UPDATED CALL', callObj);

  return callback(null, assets.response('json', callObj));
});
