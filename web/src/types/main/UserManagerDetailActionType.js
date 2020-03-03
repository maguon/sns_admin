import {createAction} from 'redux-actions';

export const getUserInfo = createAction('GET_USER_INFO');
export const getUserNoticeInfo = createAction('GET_USER_NOTICE_INFO');

export const getUserArticleList = createAction('GET_USER_DETAIL_USER_ARTICLE_LIST');
export const setArticleStartNumber = createAction('SET_USER_DETAIL_ARTICLE_START_NUMBER');
export const setArticleDataSize = createAction('SET_USER_DETAIL_ARTICLE_DATA_SIZE');

export const getUserCommentList = createAction('GET_USER_DETAIL_USER_COMMENT_LIST');
export const setCommentStartNumber = createAction('SET_USER_DETAIL_COMMENT_START_NUMBER');
export const setCommentDataSize = createAction('SET_USER_DETAIL_COMMENT_DATA_SIZE');

export const getUserVoteList = createAction('GET_USER_DETAIL_USER_VOTE_LIST');
export const setVoteStartNumber = createAction('SET_USER_DETAIL_VOTE_START_NUMBER');
export const setVoteDataSize = createAction('SET_USER_DETAIL_VOTE_DATA_SIZE');

export const getUserAttentionList = createAction('GET_USER_DETAIL_USER_ATTENTION_LIST');
export const setConditionAttentionType = createAction('SET_USER_DETAIL_ATTENTION_CONDITION_TYPE');
export const setAttentionStartNumber = createAction('SET_USER_DETAIL_ATTENTION_START_NUMBER');
export const setAttentionDataSize = createAction('SET_USER_DETAIL_ATTENTION_DATA_SIZE');

export const getUserMsgList = createAction('GET_USER_DETAIL_USER_MESSAGE_LIST');
export const setConditionMsgId = createAction('SET_USER_DETAIL_CONDITION_MESSAGE_ID');
export const setConditionMsgReceiverPhone = createAction('SET_USER_DETAIL_CONDITION_MESSAGE_RECEIVER_PHONE');
export const setConditionMsgCreatedOnStart = createAction('SET_USER_DETAIL_CONDITION_MESSAGE_CREATED_ON_START');
export const setConditionMsgCreatedOnEnd = createAction('SET_USER_DETAIL_CONDITION_MESSAGE_CREATED_ON_END');
export const setMsgStartNumber = createAction('SET_USER_DETAIL_MESSAGE_START_NUMBER');
export const setMsgDataSize = createAction('SET_USER_DETAIL_MESSAGE_DATA_SIZE');

export const getUserMsgCollList = createAction('GET_USER_DETAIL_USER_MESSAGE_COLL_LIST');
export const setMsgCollStartNumber = createAction('SET_USER_DETAIL_MESSAGE_COLL_START_NUMBER');
export const setMsgCollDataSize = createAction('SET_USER_DETAIL_MESSAGE_COLL_DATA_SIZE');

export const getUserAddressList = createAction('GET_USER_DETAIL_USER_ADDRESS_LIST');
export const setAddressStartNumber = createAction('SET_USER_DETAIL_ADDRESS_START_NUMBER');
export const setAddressDataSize = createAction('SET_USER_DETAIL_ADDRESS_DATA_SIZE');