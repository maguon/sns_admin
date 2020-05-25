import {createAction} from 'redux-actions';

export const setArticleId = createAction('SET_ARTICLE_MODAL_ID');
export const getArticleInfo = createAction('GET_ARTICLE_MODAL_INFO');
export const getCommentInfo = createAction('GET_ARTICLE_MODAL_COMMENT_INFO');
export const getCommentLv2Info = createAction('GET_ARTICLE_MODAL_COMMENT_LV2_INFO');
export const getPraiseInfo = createAction('GET_ARTICLE_MODAL_PRAISE_INFO');