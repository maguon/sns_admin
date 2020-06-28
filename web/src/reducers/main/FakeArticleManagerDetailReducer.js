import {handleActions} from 'redux-actions';
import {FakeArticleManagerDetailActionType} from '../../types';

const initialState = {
    // 文章信息
    articleInfo: [],
    // 评论详细
    commentArray: [],
    // 评论详细
    commentLv2Array: [],
    // 点赞详细
    praiseArray: []
};

export default handleActions({
    [FakeArticleManagerDetailActionType.getArticleInfo]: (state, action) => {
        return {
            ...state,
            articleInfo: action.payload
        }
    },
    [FakeArticleManagerDetailActionType.getCommentInfo]: (state, action) => {
        return {
            ...state,
            commentArray: action.payload
        }
    },
    [FakeArticleManagerDetailActionType.getCommentLv2Info]: (state, action) => {
        return {
            ...state,
            commentLv2Array: action.payload
        }
    },
    [FakeArticleManagerDetailActionType.getPraiseInfo]: (state, action) => {
        return {
            ...state,
            praiseArray: action.payload
        }
    }
}, initialState)