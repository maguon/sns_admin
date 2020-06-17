import {createAction} from 'redux-actions';

export const getArticleList = createAction('GET_ARTICLE_DATA_LIST');
export const setStartNumber = createAction('SET_START_NUMBER');
export const setDataSize = createAction('SET_DATA_SIZE');

export const setConditionArticleId = createAction('SET_CONDITION_ARTICLE_ID');
export const setConditionNickName = createAction('SET_CONDITION_ARTICLE_NICK_NAME');
export const setConditionType = createAction('SET_CONDITION_ARTICLE_TYPE');
export const setConditionCarrier = createAction('SET_CONDITION_ARTICLE_CARRIER');
export const setConditionCreatedOnStart = createAction('SET_CONDITION_ARTICLE_CREATED_ON_START');
export const setConditionCreatedOnEnd = createAction('SET_CONDITION_ARTICLE_CREATED_ON_END');