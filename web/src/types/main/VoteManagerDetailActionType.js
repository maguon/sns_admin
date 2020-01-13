import {createAction} from 'redux-actions';

export const getVoteInfo = createAction('GET_VOTE_DETAIL_INFO');

export const setVoteTitle = createAction('SET_EDIT_VOTE_TITLE');
export const setVoteInfo = createAction('SET_EDIT_VOTE_INFO');
export const setVoteMaxNum = createAction('SET_EDIT_VOTE_MAX_NUM');
export const setVoteStartTime = createAction('SET_EDIT_VOTE_START_TIME');
export const setVoteEndTime = createAction('SET_EDIT_VOTE_END_TIME');
export const setVoteInputOption = createAction('SET_EDIT_VOTE_INPUT_OPTION');
export const setVoteOptions = createAction('SET_EDIT_VOTE_OPTIONS');

export const getVoteItemList = createAction('GET_VOTE_DETAIL_ITEM_LIST');
export const setConditionVoteItem = createAction('SET_EDIT_VOTE_CONDITION_VOTE_ITEM');
export const setConditionPhone = createAction('SET_EDIT_VOTE_CONDITION_PHONE');
export const getUserVoteList = createAction('GET_VOTE_DETAIL_USER_VOTE_LIST');
export const setStartNumber = createAction('SET_OTE_DETAIL_START_NUMBER');
export const setDataSize = createAction('SET_OTE_DETAIL_DATA_SIZE');