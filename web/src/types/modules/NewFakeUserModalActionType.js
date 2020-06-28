import {createAction} from 'redux-actions';

export const setNickName = createAction('SET_NEW_FAKE_USER_NAME');
export const setRealName = createAction('SET_NEW_FAKE_USER_REAL_NAME');
export const setPhone = createAction('SET_NEW_FAKE_USER_PHONE');
export const setPassword = createAction('SET_NEW_FAKE_USER_PASSWORD');
export const setGender = createAction('SET_NEW_FAKE_USER_GENDER');
export const setRemark = createAction('SET_NEW_FAKE_USER_REMARK');