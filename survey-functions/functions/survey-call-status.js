let path = Runtime.getFunctions()['survey-utils'].path;
let assets = require(path);

exports.handler = async (context, event, callback) => {
  console.log('CALL STATUS: ', event);
  return callback(null, assets);
};
