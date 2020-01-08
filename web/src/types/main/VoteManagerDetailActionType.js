import {createAction} from 'redux-actions';

export const getVoteInfo = createAction('GET_VOTE_DETAIL_INFO');

export const setVoteTitle = createAction('SET_EDIT_VOTE_TITLE');
export const setVoteInfo = createAction('SET_EDIT_VOTE_INFO');
export const setVoteMaxNum = createAction('SET_EDIT_VOTE_MAX_NUM');
export const setVoteStartTime = createAction('SET_EDIT_VOTE_START_TIME');
export const setVoteEndTime = createAction('SET_EDIT_VOTE_END_TIME');

export const setVoteInputOption = createAction('SET_EDIT_VOTE_INPUT_OPTION');
export const setVoteOptions = createAction('SET_EDIT_VOTE_OPTIONS');