const TokenValidator = require('twilio-flex-token-validator').functionValidator;

let path = Runtime.getFunctions()['survey-utils'].path;
let assets = require(path);

exports.handler = TokenValidator(async (context, event, callback) => {
  setTimeout(() => {
    const surveyPhone = { phone: '16282673288' };
    console.log('SURVEY PHONE NUMBER: ', surveyPhone);
    return callback(null, assets.response('json', surveyPhone));
  }, 0);
});
