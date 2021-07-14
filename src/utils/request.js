import { Manager } from '@twilio/flex-ui';
import axios from 'axios';

const manager = Manager.getInstance();
const { REACT_APP_SERVICE_BASE_URL } = process.env;

console.debug('REQUEST BASE URL: ', process.env.REACT_APP_SERVICE_BASE_URL);

const enqueueCall = async (callSid, taskSid) => {
  const resp = await axios({
    method: 'post',
    url: `${REACT_APP_SERVICE_BASE_URL}/enqueue-customer-call`,
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
    url: `${REACT_APP_SERVICE_BASE_URL}/retrieve-survey-phone`,
    data: {
      Token: manager.store.getState().flex.session.ssoTokenPayload.token,
    },
  });

  return await resp;
};

const dialNumber = async (callSid, phone) => {
  const resp = await axios({
    method: 'post',
    url: `${REACT_APP_SERVICE_BASE_URL}/dial-survey`,
    data: {
      Token: manager.store.getState().flex.session.ssoTokenPayload.token,
      callSid,
      phone,
    },
  });

  return await resp;
};

export { enqueueCall, getNumber, dialNumber };
