import {createAction} from 'redux-actions';

export const getUserList = createAction('GET_USER_LIST');
export const setStartNumber = createAction('SET_START_NUMBER');
export const setDataSize = createAction('SET_DATA_SIZE');
export const setConditionUserId = createAction('SET_CONDITION_USER_ID');
export const setConditionPhone = createAction('SET_CONDITION_PHONE');
export const setConditionGender = createAction('SET_CONDITION_GENDER');
export const setConditionNickname = createAction('SET_CONDITION_NICKNAME');
export const setConditionCity = createAction('SET_CONDITION_CITY');
export const setConditionDrivingType = createAction('SET_CONDITION_DRIVING_TYPE');
export const setConditionCreatedOnStart = createAction('SET_CONDITION_CREATED_ON_START');
export const setConditionCreatedOnEnd = createAction('SET_CONDITION_CREATED_ON_END');