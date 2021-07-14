exports.handler = async (context, event, callback) => {
  const response = new Twilio.Response();

  console.log('CALL STATUS: ', event.CallStatus, ' at ', event.Timestamp);

  // Example of a call status callback handler.
  // Add code here to handle situations like the call to the survey failing.
  // Ex: if(even.CallStatus === 'failed'){ ... failure handler code here }

  return callback();
};
