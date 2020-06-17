import {createAction} from 'redux-actions';

export const getReportList = createAction('GET_REPORT_DATA_LIST');
export const setStartNumber = createAction('SET_START_NUMBER');
export const setDataSize = createAction('SET_DATA_SIZE');

export const setConditionStatus = createAction('SET_CONDITION_REPORT_STATUS');
export const setConditionValidResults = createAction('SET_CONDITION_REPORT_VALID_RESULTS');
export const setConditionCreatedOnStart = createAction('SET_CONDITION_REPORT_CREATED_ON_START');
export const setConditionCreatedOnEnd = createAction('SET_CONDITION_REPORT_CREATED_ON_END');