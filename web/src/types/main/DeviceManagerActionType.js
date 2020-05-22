import {createAction} from 'redux-actions';

export const getDeviceList = createAction('GET_DEVICE_DATA_LIST');
export const setStartNumber = createAction('SET_START_NUMBER');
export const setDataSize = createAction('SET_DATA_SIZE');

export const setConditionPhone = createAction('SET_CONDITION_DEVICE_PHONE');
export const setConditionDeviceType = createAction('SET_CONDITION_DEVICE_TYPE');
export const setConditionVersion = createAction('SET_CONDITION_DEVICE_VERSION');
export const setConditionStatus = createAction('SET_CONDITION_DEVICE_STATUS');