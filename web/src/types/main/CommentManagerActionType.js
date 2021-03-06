import {createAction} from 'redux-actions';

export const getCommentList = createAction('GET_COMMENT_DATA_LIST');
export const setStartNumber = createAction('SET_START_NUMBER');
export const setDataSize = createAction('SET_DATA_SIZE');

export const setConditionCommentId = createAction('SET_CONDITION_COMMENT_ID');
export const setConditionType = createAction('SET_CONDITION_COMMENT_TYPE');
export const setConditionCommentUserPhone = createAction('SET_CONDITION_COMMENT_USER_PHONE');
export const setConditionArticleId = createAction('SET_CONDITION_COMMENT_ARTICLE_ID');
export const setConditionCreatedOnStart = createAction('SET_CONDITION_COMMENT_CREATED_ON_START');
export const setConditionCreatedOnEnd = createAction('SET_CONDITION_COMMENT_CREATED_ON_END');
export const setConditionStatus = createAction('SET_CONDITION_COMMENT_STATUS');