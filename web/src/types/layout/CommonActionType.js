import {createAction} from 'redux-actions';

export const getLoginUserInfo = createAction('GET_LOGIN_USER_INFO');
export const getUserByPhoneList = createAction('GET_USER_BY_PHONE_LIST');
export const getAppVersionList = createAction('GET_APP_VERSION_LIST');
export const getFakeUserList = createAction('GET_FAKE_USER_LIST');