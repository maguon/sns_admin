import {handleActions} from 'redux-actions';
import {VoteManagerDetailActionType} from '../../types';

const initialState = {
    // 投票管理 详细 结果
    voteInfo: [],

    // 投票标题
    title: '',
    // 投票内容
    info: '',
    // 最多选项数
    maxNum: '',
    // 开始时间
    startTime: '',
    // 结束时间
    endTime: '',
    // 输入投票选项
    inputOption: '',
    // 投票选项列表
    options: [],

    // 投票选项列表
    voteItemList: [],
    // 检索条件：性别
    conditionVoteItem: null,
    // 检索条件：电话
    conditionPhone: '',
    // 检索条件：用户投票列表
    userVoteList: [],
    // 开始位置
    start: 0,
    // 每页数量
    size: 11,
    // 检索结果数量
    dataSize: 0
};

export default handleActions({
    [VoteManagerDetailActionType.getVoteInfo]: (state, action) => {
        return {
            ...state,
            voteInfo: action.payload
        }
    },
    [VoteManagerDetailActionType.setVoteTitle]: (state, action) => {
        return {
            ...state,
            title: action.payload
        }
    },
    [VoteManagerDetailActionType.setVoteInfo]: (state, action) => {
        return {
            ...state,
            info: action.payload
        }
    },
    [VoteManagerDetailActionType.setVoteMaxNum]: (state, action) => {
        return {
            ...state,
            maxNum: action.payload
        }
    },
    [VoteManagerDetailActionType.setVoteStartTime]: (state, action) => {
        return {
            ...state,
            startTime: action.payload
        }
    },
    [VoteManagerDetailActionType.setVoteEndTime]: (state, action) => {
        return {
            ...state,
            endTime: action.payload
        }
    },
    [VoteManagerDetailActionType.setVoteInputOption]: (state, action) => {
        return {
            ...state,
            inputOption: action.payload
        }
    },
    [VoteManagerDetailActionType.setVoteOptions]: (state, action) => {
        return {
            ...state,
            options: action.payload
        }
    },
    [VoteManagerDetailActionType.getVoteItemList]: (state, action) => {
        let voteItemList = [];
        action.payload.forEach((item, index) => {
            voteItemList.push({value: index, label: item.txt})
        });
        return {
            ...state,
            voteItemList: voteItemList
        }
    },
    [VoteManagerDetailActionType.setConditionVoteItem]: (state, action) => {
        return {
            ...state,
            conditionVoteItem: action.payload
        }
    },
    [VoteManagerDetailActionType.setConditionPhone]: (state, action) => {
        return {
            ...state,
            conditionPhone: action.payload
        }
    },
    [VoteManagerDetailActionType.getUserVoteList]: (state, action) => {
        return {
            ...state,
            userVoteList: action.payload
        }
    },
    [VoteManagerDetailActionType.setStartNumber]: (state, action) => {
        return {
            ...state,
            start: action.payload
        }
    },
    [VoteManagerDetailActionType.setDataSize]: (state, action) => {
        return {
            ...state,
            dataSize: action.payload
        }
    }
}, initialState)