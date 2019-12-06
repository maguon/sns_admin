import {handleActions} from 'redux-actions';
import {MessageManagerActionType} from '../../types';

const initialState = {
    // 开始位置
    start: 0,
    // 每页数量
    size: 11,
    // 检索结果数量
    dataSize: 0,

    // 检索条件：消息编号
    conditionId: '',
    // 检索条件：消息类型
    conditionType: null,
    // 检索条件：接收人ID
    conditionReceiverId: '',
    // 检索条件：接收人昵称
    conditionReceiverName: '',
    // 检索条件：接收人手机
    conditionReceiverPhone: '',

    // 检索条件：文章编号
    conditionArticleId: '',
    // 检索条件：评论编号
    conditionCommentId: '',
    // 检索条件：相关人ID
    conditionConnectId: '',
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
    [MessageManagerActionType.setConditionId]: (state, action) => {
        return {
            ...state,
            conditionId: action.payload
        }
    },
    [MessageManagerActionType.setConditionMsgType]: (state, action) => {
        return {
            ...state,
            conditionType: action.payload
        }
    },
    [MessageManagerActionType.setConditionReceiverId]: (state, action) => {
        return {
            ...state,
            conditionReceiverId: action.payload
        }
    },
    [MessageManagerActionType.setConditionReceiverName]: (state, action) => {
        return {
            ...state,
            conditionReceiverName: action.payload
        }
    },
    [MessageManagerActionType.setConditionReceiverPhone]: (state, action) => {
        return {
            ...state,
            conditionReceiverPhone: action.payload
        }
    },
    [MessageManagerActionType.setConditionArticleId]: (state, action) => {
        return {
            ...state,
            conditionArticleId: action.payload
        }
    },
    [MessageManagerActionType.setConditionCommentId]: (state, action) => {
        return {
            ...state,
            conditionCommentId: action.payload
        }
    },
    [MessageManagerActionType.setConditionConnectId]: (state, action) => {
        return {
            ...state,
            conditionConnectId: action.payload
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