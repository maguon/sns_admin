import {createAction} from 'redux-actions';

export const setAdminName = createAction('SET_NEW_ADMIN_NAME');
export const setAdminRealName = createAction('SET_NEW_ADMIN_REAL_NAME');
export const setPhone = createAction('SET_NEW_ADMIN_PHONE');
export const setPassword = createAction('SET_NEW_ADMIN_PASSWORD');
export const setAdminGender = createAction('SET_NEW_ADMIN_GENDER');