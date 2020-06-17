import {createAction} from 'redux-actions';

export const getReportInfo = createAction('GET_REPORT_DETAIL_INFO');
export const getArticleInfo = createAction('GET_REPORT_DETAIL_ARTICLE_INFO');
export const setValidResults = createAction('SET_REPORT_DETAIL_VALID_RESULTS');
export const setReportReview = createAction('SET_REPORT_DETAIL_REVIEW');