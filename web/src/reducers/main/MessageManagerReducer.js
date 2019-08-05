import {handleActions} from 'redux-actions';
import {MessageManagerActionType} from '../../types';

const initialState = {
    // 开始位置
    start: 0,
    // 每页数量
    size: 11,
    // 检索结果数量
    dataSize: 0,

    // 检索条件：消息ID
    conditionId: '',
    // 检索条件：用户ID
    conditionUserId: '',
    // 检索条件：消息类型
    conditionType: null,
    // 检索条件：状态
    conditionStatus: null,

    // 消息列表
    messageArray: []
};

export default handleActions({
    [MessageManagerActionType.getMessageList]: (state, action) => {
        return {
            ...state,
            messageArray: action.payload
        }
    },
    [MessageManagerActionType.setStartNumber]: (state, action) => {
        return {
            ...state,
            start: action.payload
        }
    },
    [MessageManagerActionType.setDataSize]: (state, action) => {
        return {
            ...state,
            dataSize: action.payload
        }
    },
    [MessageManagerActionType.setConditionId]: (state, action) => {
        return {
            ...state,
            conditionId: action.payload
        }
    },
    [MessageManagerActionType.setConditionUserId]: (state, action) => {
        return {
            ...state,
            conditionUserId: action.payload
        }
    },
    [MessageManagerActionType.setConditionMsgType]: (state, action) => {
        return {
            ...state,
            conditionType: action.payload
        }
    },
    [MessageManagerActionType.setConditionStatus]: (state, action) => {
        return {
            ...state,
            conditionStatus: action.payload
        }
    }
}, initialState)