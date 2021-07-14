import React from 'react';
import { VERSION } from '@twilio/flex-ui';
import { FlexPlugin } from 'flex-plugin';
import { enqueueCall, getNumber, dialNumber } from './utils/request';

const PLUGIN_NAME = 'SurveyTransferPlugin';

export default class SurveyTransferPlugin extends FlexPlugin {
  constructor() {
    super(PLUGIN_NAME);
  }

  /**
   * This code is run when your plugin is being started
   * Use this to modify any UI components or attach to the actions framework
   *
   * @param flex { typeof import('@twilio/flex-ui') }
   * @param manager { import('@twilio/flex-ui').Manager }
   */
  init(flex, manager) {
    flex.Actions.addListener(
      'beforeHangupCall',
      async (payload, abortFunction) => {
        // Enqueue customer call SID.
        console.log('beforeHangupCall PAYLOAD: ', payload.task);
        const participantArray = payload.task.conference.participants.find(
          (results) => results.participantType === 'customer'
        );
        const customerCallSid = participantArray.callSid;
        console.log('CALL SID:', customerCallSid);

        // Enqueue customer call. This will end the conference call.
        const enqueueCustomer = async () => {
          try {
            const response = await enqueueCall(customerCallSid);
            console.log('ENQUEUE RESPONSE: ', response);
            return response;
          } catch (e) {
            console.log('ERROR ENQUEING CUSTOMER CALL');
            console.error(e);
          }
        };

        // Mock of retrieving survey phone number (2 second delay)
        const getSurveyNumber = async () => {
          try {
            const response = await getNumber();
            console.log('RETRIEVE SURVEY NUMBER RESPONSE: ', response);
            return response;
          } catch (e) {
            console.log('ERROR RETRIEVING SURVEY NUMBER');
            console.error(e);
          }
        };

        // Dial customer call to survey phone number
        const dialSurvey = async (callSid, phone) => {
          try {
            const response = await dialNumber(callSid, phone);
            console.log('DIAL SURVEY RESPONSE: ', response);
            return response;
          } catch (e) {
            console.log('ERROR DIALING SURVEY NUMBER');
            console.error(e);
          }
        };

        // Mock flag noting we want to send the caller to a survey.
        const sendToSurvey = true;

        if (sendToSurvey === true) {
          const {
            data: { callSid },
          } = await enqueueCustomer();
          console.log('CALL SID RESPONSE: ', callSid);

          // If enquing the call was successful get survey phone number
          if (callSid) {
            const {
              data: { phone },
            } = await getSurveyNumber();
            console.log('SURVEY PHONE NUMBER: ', phone);
            await dialSurvey(callSid, phone);
          }
        }
      }
    );
  }
}
