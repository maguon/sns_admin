import {handleActions} from 'redux-actions';
import {UserManagerActionType} from '../../types';

const initialState = {
    // 开始位置
    start: 0,
    // 每页数量
    size: 11,
    // 检索结果数量
    dataSize: 0,

    // 检索条件：用户ID
    conditionUserId: '',
    // 检索条件：用户电话
    conditionPhone: '',
    // 检索条件：用户昵称
    conditionNickname: '',
    // 检索条件：状态
    conditionStatus: null,

    // 结果列表
    userArray: []
};

export default handleActions({
    [UserManagerActionType.getUserList]: (state, action) => {
        return {
            ...state,
            userArray: action.payload
        }
    },
    [UserManagerActionType.setStartNumber]: (state, action) => {
        return {
            ...state,
            start: action.payload
        }
    },
    [UserManagerActionType.setDataSize]: (state, action) => {
        return {
            ...state,
            dataSize: action.payload
        }
    },
    [UserManagerActionType.setConditionUserId]: (state, action) => {
        return {
            ...state,
            conditionUserId: action.payload
        }
    },
    [UserManagerActionType.setConditionPhone]: (state, action) => {
        return {
            ...state,
            conditionPhone: action.payload
        }
    },
    [UserManagerActionType.setConditionNickname]: (state, action) => {
        return {
            ...state,
            conditionNickname: action.payload
        }
    },
    [UserManagerActionType.setConditionStatus]: (state, action) => {
        return {
            ...state,
            conditionStatus: action.payload
        }
    }
}, initialState)