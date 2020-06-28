import {createAction} from 'redux-actions';

export const getFakeUserList = createAction('GET_FAKE_USER_LIST');
export const setStartNumber = createAction('SET_START_NUMBER');
export const setDataSize = createAction('SET_DATA_SIZE');
export const setConditionPhone = createAction('SET_CONDITION_FAKE_PHONE');
export const setConditionStatus = createAction('SET_CONDITION_FAKE_STATUS');