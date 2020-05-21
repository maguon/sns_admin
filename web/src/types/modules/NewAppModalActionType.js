import {createAction} from 'redux-actions';

export const setAppType = createAction('SET_NEW_APP_TYPE');
export const setDeviceType = createAction('SET_NEW_APP_DEVICE_TYPE');
export const setVersion = createAction('SET_NEW_APP_VERSION');
export const setVersionNum = createAction('SET_NEW_APP_VERSION_NUM');
export const setMinVersionNum = createAction('SET_NEW_APP_MIN_VERSION_NUM');
export const setForceUpdate = createAction('SET_NEW_APP_FORCE_UPDATE');
export const setUrl = createAction('SET_NEW_APP_URL');
export const setRemark = createAction('SET_NEW_APP_REMARK');