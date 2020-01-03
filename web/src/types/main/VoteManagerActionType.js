import {createAction} from 'redux-actions';

export const getVoteList = createAction('GET_VOTE_DATA_LIST');
export const setStartNumber = createAction('SET_START_NUMBER');
export const setDataSize = createAction('SET_DATA_SIZE');

export const setConditionVoteId = createAction('SET_CONDITION_VOTE_ID');
export const setConditionTitle = createAction('SET_CONDITION_VOTE_TITLE');
export const setConditionMaxNum = createAction('SET_CONDITION_VOTE_MAX_NUM');
export const setConditionStatus = createAction('SET_CONDITION_VOTE_STATUS');
export const setConditionCreatedOnStart = createAction('SET_CONDITION_VOTE_CREATED_ON_START');
export const setConditionCreatedOnEnd = createAction('SET_CONDITION_VOTE_CREATED_ON_END');