import {createAction} from 'redux-actions';

export const getUserList = createAction('GET_USER_LIST');
export const setStartNumber = createAction('SET_START_NUMBER');
export const setDataSize = createAction('SET_DATA_SIZE');
export const setConditionUserId = createAction('SET_CONDITION_USER_ID');
export const setConditionPhone = createAction('SET_CONDITION_PHONE');
export const setConditionNickname = createAction('SET_CONDITION_NICKNAME');
export const setConditionStatus = createAction('SET_CONDITION_STATUS');