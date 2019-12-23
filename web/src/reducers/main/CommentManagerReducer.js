import {handleActions} from 'redux-actions';
import {CommentManagerActionType} from '../../types';

const initialState = {
    // 开始位置
    start: 0,
    // 每页数量
    size: 11,
    // 检索结果数量
    dataSize: 0,

    // 检索条件：评论编号
    conditionCommentId: '',
    // 检索条件：评论类型
    conditionType: null,
    // 检索条件：注册手机
    conditionCommentUserPhone: '',

    // 检索条件：文章编号
    conditionArticleId: '',
    // 检索条件：评论时间(始)
    conditionCreatedOnStart: '',
    // 检索条件：评论时间(终)
    conditionCreatedOnEnd: '',
    // 检索条件：评论状态
    conditionStatus: null,

    // 评论管理 结果列表
    commentArray: []
};

export default handleActions({
    [CommentManagerActionType.getCommentList]: (state, action) => {
        return {
            ...state,
            commentArray: action.payload
        }
    },
    [CommentManagerActionType.setStartNumber]: (state, action) => {
        return {
            ...state,
            start: action.payload
        }
    },
    [CommentManagerActionType.setDataSize]: (state, action) => {
        return {
            ...state,
            dataSize: action.payload
        }
    },
    [CommentManagerActionType.setConditionCommentId]: (state, action) => {
        return {
            ...state,
            conditionCommentId: action.payload
        }
    },
    [CommentManagerActionType.setConditionType]: (state, action) => {
        return {
            ...state,
            conditionType: action.payload
        }
    },
    [CommentManagerActionType.setConditionCommentUserPhone]: (state, action) => {
        return {
            ...state,
            conditionCommentUserPhone: action.payload
        }
    },
    [CommentManagerActionType.setConditionArticleId]: (state, action) => {
        return {
            ...state,
            conditionArticleId: action.payload
        }
    },
    [CommentManagerActionType.setConditionCreatedOnStart]: (state, action) => {
        return {
            ...state,
            conditionCreatedOnStart: action.payload
        }
    },
    [CommentManagerActionType.setConditionCreatedOnEnd]: (state, action) => {
        return {
            ...state,
            conditionCreatedOnEnd: action.payload
        }
    },
    [CommentManagerActionType.setConditionStatus]: (state, action) => {
        return {
            ...state,
            conditionStatus: action.payload
        }
    }
}, initialState)