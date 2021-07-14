import { Manager } from '@twilio/flex-ui';
import axios from 'axios';

const manager = Manager.getInstance();
const { REACT_APP_SERVICE_BASE_URL } = process.env;

const enqueueCall = async (callSid, taskSid) => {
  const resp = await axios({
    method: 'post',
    url: 'https://survey-functions-3074-dev.twil.io/enqueue-customer-call',
    data: {
      Token: manager.store.getState().flex.session.ssoTokenPayload.token,
      callSid,
      taskSid,
    },
  });

  return await resp;
};

const getNumber = async () => {
  const resp = await axios({
    method: 'post',
    url: 'https://survey-functions-3074-dev.twil.io/retrieve-survey-phone',
    data: {
      Token: manager.store.getState().flex.session.ssoTokenPayload.token,
    },
  });

  return await resp;
};

const dialNumber = async (callSid, phone) => {
  const resp = await axios({
    method: 'post',
    url: 'https://survey-functions-3074-dev.twil.io/dial-survey',
    data: {
      Token: manager.store.getState().flex.session.ssoTokenPayload.token,
      callSid,
      phone,
    },
  });

  return await resp;
};

export { enqueueCall, getNumber, dialNumber };
