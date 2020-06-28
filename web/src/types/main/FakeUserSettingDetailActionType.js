import {createAction} from 'redux-actions';

export const setFakeUserId = createAction('SET_EDIT_FAKE_USER_ID');
export const setPhone = createAction('SET_EDIT_FAKE_USER_PHONE');
export const setNickName = createAction('SET_EDIT_FAKE_USER_NICK_NAME');
export const setRealName = createAction('SET_EDIT_FAKE_USER_REAL_NAME');
export const setGender = createAction('SET_EDIT_FAKE_USER_GENDER');
export const setRemark = createAction('SET_EDIT_FAKE_USER_REMARK');