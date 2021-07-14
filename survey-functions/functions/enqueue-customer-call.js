const TokenValidator = require('twilio-flex-token-validator').functionValidator;

let path = Runtime.getFunctions()['survey-utils'].path;
let assets = require(path);

exports.handler = TokenValidator(async (context, event, callback) => {
  console.log('CALL SID TO ENQUEUE: ', event.callSid);

  const client = context.getTwilioClient();

  const response = await client.calls(event.callSid).update({
    twiml: `<Response><Enqueue>Hold for survey</Enqueue></Response>`,
  });

  const callObj = { callSid: await response.sid };
  console.log('UPDATED CALL', callObj);

  return callback(null, assets.response('json', callObj));
});
