import {createAction} from 'redux-actions';

export const getMessageList = createAction('GET_MESSAGE_LIST');
export const setStartNumber = createAction('SET_START_NUMBER');
export const setDataSize = createAction('SET_DATA_SIZE');
export const setConditionId = createAction('SET_CONDITION_MESSAGE_ID');
export const setConditionUserId = createAction('SET_CONDITION_MESSAGE_USER_ID');
export const setConditionMsgType = createAction('SET_CONDITION_MESSAGE_TYPE');
export const setConditionStatus = createAction('SET_CONDITION_MESSAGE_STATUS');