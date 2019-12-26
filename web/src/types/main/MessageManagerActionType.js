import {createAction} from 'redux-actions';

export const getMessageList = createAction('GET_MESSAGE_LIST');
export const setStartNumber = createAction('SET_START_NUMBER');
export const setDataSize = createAction('SET_DATA_SIZE');
export const setShowMsgModalFlg = createAction('SET_SHOW_MESSAGE_MODAL_FLAG');
export const setConditionId = createAction('SET_CONDITION_MESSAGE_ID');
export const setConditionReceiverPhone = createAction('SET_CONDITION_MESSAGE_RECEIVER_PHONE');
export const setConditionCreatedOnStart = createAction('SET_CONDITION_MESSAGE_CREATED_ON_START');
export const setConditionCreatedOnEnd = createAction('SET_CONDITION_MESSAGE_CREATED_ON_END');