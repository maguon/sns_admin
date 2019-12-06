import {createAction} from 'redux-actions';

export const getMessageList = createAction('GET_MESSAGE_LIST');
export const setStartNumber = createAction('SET_START_NUMBER');
export const setDataSize = createAction('SET_DATA_SIZE');
export const setConditionId = createAction('SET_CONDITION_MESSAGE_ID');
export const setConditionMsgType = createAction('SET_CONDITION_MESSAGE_TYPE');
export const setConditionReceiverId = createAction('SET_CONDITION_MESSAGE_RECEIVER_ID');
export const setConditionReceiverName = createAction('SET_CONDITION_MESSAGE_RECEIVER_NAME');
export const setConditionReceiverPhone = createAction('SET_CONDITION_MESSAGE_RECEIVER_PHONE');
export const setConditionArticleId = createAction('SET_CONDITION_MESSAGE_ARTICLE_ID');
export const setConditionCommentId = createAction('SET_CONDITION_MESSAGE_COMMENT_ID');
export const setConditionConnectId = createAction('SET_CONDITION_MESSAGE_CONNECT_ID');
export const setConditionCreatedOnStart = createAction('SET_CONDITION_MESSAGE_CREATED_ON_START');
export const setConditionCreatedOnEnd = createAction('SET_CONDITION_MESSAGE_CREATED_ON_END');