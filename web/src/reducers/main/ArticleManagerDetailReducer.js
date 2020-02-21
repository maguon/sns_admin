import {handleActions} from 'redux-actions';
import {ArticleManagerDetailActionType} from '../../types';

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
    [ArticleManagerDetailActionType.getArticleInfo]: (state, action) => {
        return {
            ...state,
            articleInfo: action.payload
        }
    },
    [ArticleManagerDetailActionType.getCommentInfo]: (state, action) => {
        return {
            ...state,
            commentArray: action.payload
        }
    },
    [ArticleManagerDetailActionType.getCommentLv2Info]: (state, action) => {
        return {
            ...state,
            commentLv2Array: action.payload
        }
    },
    [ArticleManagerDetailActionType.getPraiseInfo]: (state, action) => {
        return {
            ...state,
            praiseArray: action.payload
        }
    }
}, initialState)