import {handleActions} from 'redux-actions';
import {UserManagerDetailActionType} from '../../types';

const initialState = {
    // 基本信息TAB：用户信息
    userInfo: [],
    // 基本信息TAB：用户通知设置
    userNoticeInfo: [],
    // 每页数量
    size: 7,

    // 发布文章TAB：文章列表
    userArticleList: [],
    // 发布文章TAB：开始位置
    articleStart: 0,
    // 发布文章TAB：检索结果数量
    articleDataSize: 0,

    // 评论TAB：评论列表
    userCommentList: [],
    // 评论TAB：开始位置
    commentStart: 0,
    // 评论TAB：检索结果数量
    commentDataSize: 0,

    // 投票TAB：用户投票列表
    userVoteList: [],
    // 投票TAB：开始位置
    voteStart: 0,
    // 投票TAB：检索结果数量
    voteDataSize: 0,

    // 投票TAB：用户关系列表
    userAttentionList: [],
    // 投票TAB：检索条件 关注类型
    conditionAttentionType: null,
    // 投票TAB：开始位置
    attentionStart: 0,
    // 投票TAB：检索结果数量
    attentionDataSize: 0,




    // 收藏地址TAB：用户投票列表
    userAddressList: [],
    // 收藏地址TAB：开始位置
    addressStart: 0,
    // 收藏地址TAB：检索结果数量
    addressDataSize: 0,
};

export default handleActions({
    [UserManagerDetailActionType.getUserInfo]: (state, action) => {
        return {
            ...state,
            userInfo: action.payload
        }
    },
    [UserManagerDetailActionType.getUserNoticeInfo]: (state, action) => {
        return {
            ...state,
            userNoticeInfo: action.payload
        }
    },

    [UserManagerDetailActionType.getUserArticleList]: (state, action) => {
        return {
            ...state,
            userArticleList: action.payload
        }
    },
    [UserManagerDetailActionType.setArticleStartNumber]: (state, action) => {
        return {
            ...state,
            articleStart: action.payload
        }
    },
    [UserManagerDetailActionType.setArticleDataSize]: (state, action) => {
        return {
            ...state,
            articleDataSize: action.payload
        }
    },

    [UserManagerDetailActionType.getUserCommentList]: (state, action) => {
        return {
            ...state,
            userCommentList: action.payload
        }
    },
    [UserManagerDetailActionType.setCommentStartNumber]: (state, action) => {
        return {
            ...state,
            commentStart: action.payload
        }
    },
    [UserManagerDetailActionType.setCommentDataSize]: (state, action) => {
        return {
            ...state,
            commentDataSize: action.payload
        }
    },

    [UserManagerDetailActionType.getUserVoteList]: (state, action) => {
        return {
            ...state,
            userVoteList: action.payload
        }
    },
    [UserManagerDetailActionType.setVoteStartNumber]: (state, action) => {
        return {
            ...state,
            voteStart: action.payload
        }
    },
    [UserManagerDetailActionType.setVoteDataSize]: (state, action) => {
        return {
            ...state,
            voteDataSize: action.payload
        }
    },

    [UserManagerDetailActionType.getUserAttentionList]: (state, action) => {
        return {
            ...state,
            userAttentionList: action.payload
        }
    },
    [UserManagerDetailActionType.setConditionAttentionType]: (state, action) => {
        return {
            ...state,
            conditionAttentionType: action.payload
        }
    },
    [UserManagerDetailActionType.setAttentionStartNumber]: (state, action) => {
        return {
            ...state,
            attentionStart: action.payload
        }
    },
    [UserManagerDetailActionType.setAttentionDataSize]: (state, action) => {
        return {
            ...state,
            attentionDataSize: action.payload
        }
    },







    [UserManagerDetailActionType.getUserAddressList]: (state, action) => {
        return {
            ...state,
            userAddressList: action.payload
        }
    },
    [UserManagerDetailActionType.setAddressStartNumber]: (state, action) => {
        return {
            ...state,
            addressStart: action.payload
        }
    },
    [UserManagerDetailActionType.setAddressDataSize]: (state, action) => {
        return {
            ...state,
            addressDataSize: action.payload
        }
    },
}, initialState)