const TokenValidator = require('twilio-flex-token-validator').functionValidator;
require('dotenv').config();
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
          twiml: `<Response><Leave /><Dial><Number statusCallback='${process.env.REACT_APP_SERVICE_BASE_URL}/survey-call-status' statusCallbackEvent='initiated ringing answered completed'>+${event.phone}</Number></Dial></Response>`,
        })
      : null;

  return callback(null, assets.response());
});
