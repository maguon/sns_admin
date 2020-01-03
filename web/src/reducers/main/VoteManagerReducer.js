import {handleActions} from 'redux-actions';
import {VoteManagerActionType} from '../../types';

const initialState = {
    // 开始位置
    start: 0,
    // 每页数量
    size: 11,
    // 检索结果数量
    dataSize: 0,

    // 检索条件：投票编号
    conditionVoteId: '',
    // 检索条件：内容检索
    conditionTitle: '',
    // 检索条件：最多选项数
    conditionMaxNum: '',
    // 检索条件：状态
    conditionStatus: null,
    // 检索条件：发布时间(始)
    conditionCreatedOnStart: '',
    // 检索条件：发布时间(终)
    conditionCreatedOnEnd: '',

    // 投票管理 结果列表
    voteArray: []
};

export default handleActions({
    [VoteManagerActionType.getVoteList]: (state, action) => {
        return {
            ...state,
            voteArray: action.payload
        }
    },
    [VoteManagerActionType.setStartNumber]: (state, action) => {
        return {
            ...state,
            start: action.payload
        }
    },
    [VoteManagerActionType.setDataSize]: (state, action) => {
        return {
            ...state,
            dataSize: action.payload
        }
    },
    [VoteManagerActionType.setConditionVoteId]: (state, action) => {
        return {
            ...state,
            conditionVoteId: action.payload
        }
    },
    [VoteManagerActionType.setConditionTitle]: (state, action) => {
        return {
            ...state,
            conditionTitle: action.payload
        }
    },
    [VoteManagerActionType.setConditionMaxNum]: (state, action) => {
        return {
            ...state,
            conditionMaxNum: action.payload
        }
    },
    [VoteManagerActionType.setConditionStatus]: (state, action) => {
        return {
            ...state,
            conditionStatus: action.payload
        }
    },
    [VoteManagerActionType.setConditionCreatedOnStart]: (state, action) => {
        return {
            ...state,
            conditionCreatedOnStart: action.payload
        }
    },
    [VoteManagerActionType.setConditionCreatedOnEnd]: (state, action) => {
        return {
            ...state,
            conditionCreatedOnEnd: action.payload
        }
    }
}, initialState)