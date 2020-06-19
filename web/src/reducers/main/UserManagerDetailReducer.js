import {handleActions} from 'redux-actions';
import {UserManagerDetailActionType} from '../../types';

const initialState = {
    // 基本信息TAB1：用户信息
    userInfo: [],
    // 基本信息TAB：用户通知设置
    userNoticeInfo: [],
    // 每页数量
    size: 9,

    // 发布文章TAB2：列表
    userArticleList: [],
    // 发布文章TAB：开始位置
    articleStart: 0,
    // 发布文章TAB：检索结果数量
    articleDataSize: 0,

    // 评论TAB3：列表
    userCommentList: [],
    // 评论TAB：开始位置
    commentStart: 0,
    // 评论TAB：检索结果数量
    commentDataSize: 0,

    // 投票TAB4：列表
    userVoteList: [],
    // 投票TAB：开始位置
    voteStart: 0,
    // 投票TAB：检索结果数量
    voteDataSize: 0,

    // 社交圈TAB5：列表
    userAttentionList: [],
    userBlockList: [],
    // 投票TAB：检索条件 关注类型
    conditionAttentionType: null,
    // 投票TAB：开始位置
    attentionStart: 0,
    // 投票TAB：检索结果数量
    attentionDataSize: 0,

    // 消息TAB6：列表
    userMsgList: [],
    // 消息TAB：检索条件：消息编号
    conditionMsgId: '',
    // 消息TAB：检索条件：接收人手机
    conditionMsgReceiverPhone: '',
    // 消息TAB：检索条件：发送时间(始)
    conditionMsgCreatedOnStart: '',
    // 消息TAB：检索条件：发送时间(终)
    conditionMsgCreatedOnEnd: '',
    // 消息TAB：开始位置
    messageStart: 0,
    // 消息TAB：检索结果数量
    messageDataSize: 0,

    // 收藏文章TAB7：列表
    userMsgCollList: [],
    // 收藏文章TAB：开始位置
    msgCollStart: 0,
    // 收藏文章TAB：检索结果数量
    msgCollDataSize: 0,

    // 收藏地址TAB8：列表
    userAddressList: [],
    // 收藏地址TAB：开始位置
    addressStart: 0,
    // 收藏地址TAB：检索结果数量
    addressDataSize: 0
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
    [UserManagerDetailActionType.getUserBlockList]: (state, action) => {
        return {
            ...state,
            userBlockList: action.payload
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

    [UserManagerDetailActionType.getUserMsgList]: (state, action) => {
        return {
            ...state,
            userMsgList: action.payload
        }
    },
    [UserManagerDetailActionType.setConditionMsgId]: (state, action) => {
        return {
            ...state,
            conditionMsgId: action.payload
        }
    },
    [UserManagerDetailActionType.setConditionMsgReceiverPhone]: (state, action) => {
        return {
            ...state,
            conditionMsgReceiverPhone: action.payload
        }
    },
    [UserManagerDetailActionType.setConditionMsgCreatedOnStart]: (state, action) => {
        return {
            ...state,
            conditionMsgCreatedOnStart: action.payload
        }
    },
    [UserManagerDetailActionType.setConditionMsgCreatedOnEnd]: (state, action) => {
        return {
            ...state,
            conditionMsgCreatedOnEnd: action.payload
        }
    },
    [UserManagerDetailActionType.setMsgStartNumber]: (state, action) => {
        return {
            ...state,
            messageStart: action.payload
        }
    },
    [UserManagerDetailActionType.setMsgDataSize]: (state, action) => {
        return {
            ...state,
            messageDataSize: action.payload
        }
    },

    [UserManagerDetailActionType.getUserMsgCollList]: (state, action) => {
        return {
            ...state,
            userMsgCollList: action.payload
        }
    },
    [UserManagerDetailActionType.setMsgCollStartNumber]: (state, action) => {
        return {
            ...state,
            msgCollStart: action.payload
        }
    },
    [UserManagerDetailActionType.setMsgCollDataSize]: (state, action) => {
        return {
            ...state,
            msgCollDataSize: action.payload
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
    }
}, initialState)