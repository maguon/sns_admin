import {createAction} from 'redux-actions';

export const setVoteTitle = createAction('SET_NEW_VOTE_TITLE');
export const setVoteInfo = createAction('SET_NEW_VOTE_INFO');
export const setVoteMaxNum = createAction('SET_NEW_VOTE_MAX_NUM');
export const setVoteStartTime = createAction('SET_NEW_VOTE_START_TIME');
export const setVoteEndTime = createAction('SET_NEW_VOTE_END_TIME');

export const setVoteInputOption = createAction('SET_NEW_VOTE_INPUT_OPTION');
export const setVoteOptions = createAction('SET_NEW_VOTE_OPTIONS');