import {createAction} from 'redux-actions';

export const getUserInfo = createAction('GET_USER_INFO');
export const getUserNoticeInfo = createAction('GET_USER_NOTICE_INFO');

export const getUserArticleList = createAction('GET_USER_DETAIL_USER_ARTICLE_LIST');
export const setArticleStartNumber = createAction('SET_USER_DETAIL_ARTICLE_START_NUMBER');
export const setArticleDataSize = createAction('SET_USER_DETAIL_ARTICLE_DATA_SIZE');

export const getUserCommentList = createAction('GET_USER_DETAIL_USER_COMMENT_LIST');
export const setCommentStartNumber = createAction('SET_USER_DETAIL_COMMENT_START_NUMBER');
export const setCommentDataSize = createAction('SET_USER_DETAIL_COMMENT_DATA_SIZE');

export const getUserVoteList = createAction('GET_USER_DETAIL_USER_VOTE_LIST');
export const setVoteStartNumber = createAction('SET_USER_DETAIL_VOTE_START_NUMBER');
export const setVoteDataSize = createAction('SET_USER_DETAIL_VOTE_DATA_SIZE');


