import {createAction} from 'redux-actions';

export const getArticleInfo = createAction('GET_ARTICLE_DETAIL_INFO');
export const getCommentInfo = createAction('GET_ARTICLE_DETAIL_COMMENT_INFO');
export const getCommentLv2Info = createAction('GET_ARTICLE_DETAIL_COMMENT_LV2_INFO');
export const getPraiseInfo = createAction('GET_ARTICLE_DETAIL_PRAISE_INFO');