import {createAction} from 'redux-actions';

export const getAppList = createAction('GET_APP_LIST');
export const setStartNumber = createAction('SET_START_NUMBER');
export const setDataSize = createAction('SET_DATA_SIZE');
export const setConditionDeviceType = createAction('SET_CONDITION_APP_DEVICE_TYPE');
export const setConditionStatus = createAction('SET_CONDITION_APP_STATUS');