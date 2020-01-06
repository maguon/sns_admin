import {handleActions} from 'redux-actions';
import {NewVoteModalActionType} from '../../types';

// 画面用初期数据
const initialState = {
    // 投票标题
    title: '',
    // 投票内容
    info: '',
    // 最多选项数
    maxNum: null,
    // 开始时间
    startTime: '',
    // 结束时间
    endTime: '',

    // 输入投票选项
    inputOption: '',
    // 投票选项列表
    options: []
};

export default handleActions({
    [NewVoteModalActionType.setVoteTitle]: (state, action) => {
        return {
            ...state,
            title: action.payload
        }
    },
    [NewVoteModalActionType.setVoteInfo]: (state, action) => {
        return {
            ...state,
            info: action.payload
        }
    },
    [NewVoteModalActionType.setVoteMaxNum]: (state, action) => {
        return {
            ...state,
            maxNum: action.payload
        }
    },
    [NewVoteModalActionType.setVoteStartTime]: (state, action) => {
        return {
            ...state,
            startTime: action.payload
        }
    },
    [NewVoteModalActionType.setVoteEndTime]: (state, action) => {
        return {
            ...state,
            endTime: action.payload
        }
    },
    [NewVoteModalActionType.setVoteInputOption]: (state, action) => {
        return {
            ...state,
            inputOption: action.payload
        }
    },
    [NewVoteModalActionType.setVoteOptions]: (state, action) => {
        return {
            ...state,
            options: action.payload
        }
    }
}, initialState)