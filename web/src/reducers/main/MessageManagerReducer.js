import {handleActions} from 'redux-actions';
import {MessageManagerActionType} from '../../types';

const initialState = {
    // 开始位置
    start: 0,
    // 每页数量
    size: 11,
    // 检索结果数量
    dataSize: 0,

    // 模态画面显示标记
    showMsgModalFlg: false,

    // 检索条件：消息编号
    conditionId: '',
    // 检索条件：接收人手机
    conditionReceiverPhone: '',
    // 检索条件：发送时间(始)
    conditionCreatedOnStart: '',
    // 检索条件：发送时间(终)
    conditionCreatedOnEnd: '',

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
    [MessageManagerActionType.setShowMsgModalFlg]: (state, action) => {
        return {
            ...state,
            showMsgModalFlg: action.payload
        }
    },
    [MessageManagerActionType.setConditionId]: (state, action) => {
        return {
            ...state,
            conditionId: action.payload
        }
    },
    [MessageManagerActionType.setConditionReceiverPhone]: (state, action) => {
        return {
            ...state,
            conditionReceiverPhone: action.payload
        }
    },
    [MessageManagerActionType.setConditionCreatedOnStart]: (state, action) => {
        return {
            ...state,
            conditionCreatedOnStart: action.payload
        }
    },
    [MessageManagerActionType.setConditionCreatedOnEnd]: (state, action) => {
        return {
            ...state,
            conditionCreatedOnEnd: action.payload
        }
    }
}, initialState)