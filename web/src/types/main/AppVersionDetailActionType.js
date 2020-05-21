import {createAction} from 'redux-actions';

export const setAppId = createAction('SET_EDIT_APP_ID');
export const setAppStatus = createAction('SET_EDIT_APP_STATUS');

export const setAppType = createAction('SET_EDIT_APP_TYPE');
export const setDeviceType = createAction('SET_EDIT_APP_DEVICE_TYPE');
export const setVersion = createAction('SET_EDIT_APP_VERSION');
export const setVersionNum = createAction('SET_EDIT_APP_VERSION_NUM');
export const setMinVersionNum = createAction('SET_EDIT_APP_MIN_VERSION_NUM');
export const setForceUpdate = createAction('SET_EDIT_APP_FORCE_UPDATE');
export const setUrl = createAction('SET_EDIT_APP_URL');
export const setRemark = createAction('SET_EDIT_APP_REMARK');