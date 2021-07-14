const TokenValidator = require('twilio-flex-token-validator').functionValidator;

let path = Runtime.getFunctions()['survey-utils'].path;
let assets = require(path);

exports.handler = TokenValidator(async (context, event, callback) => {
  console.log('CALL SID: ', event.callSid);
  console.log('DIAL PHONE NUMBER: ', event.phone);
  const client = context.getTwilioClient();

  const enqueuedCallDetails = await client.calls(event.callSid).fetch();

  console.log('ENQUEUED CALL STATUS: ', enqueuedCallDetails.status);

  const response =
    enqueuedCallDetails.status === 'in-progress'
      ? await client.calls(event.callSid).update({
          twiml: `<Response><Leave /><Dial>+${event.phone}</Dial></Response>`,
        })
      : null;

  return callback(null, assets.response());
});
