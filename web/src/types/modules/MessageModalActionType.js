import {createAction} from 'redux-actions';

export const setPageType = createAction('SET_MESSAGE_MODAL_PAGE_TYPE');
export const setMsgUserType = createAction('SET_MESSAGE_MODAL_MSG_USER_TYPE');
export const setPhone = createAction('SET_MESSAGE_MODAL_PHONE');
export const setMsgContent = createAction('SET_MESSAGE_MODAL_MSG_CONTENT');

export const setMsgUserNickName = createAction('SET_MESSAGE_MODAL_MSG_USER_NICK_NAME');
export const setMsgUserId = createAction('SET_MESSAGE_MODAL_MSG_USER_ID');
export const setMsgCreateDate = createAction('SET_MESSAGE_MODAL_MSG_CREATE_DATE');