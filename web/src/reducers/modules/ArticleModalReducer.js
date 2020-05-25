import {handleActions} from 'redux-actions';
import {ArticleModalActionType} from '../../types';

const initialState = {
    // 文章ID
    articleId: '',
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
    [ArticleModalActionType.setArticleId]: (state, action) => {
        return {
            ...state,
            articleId: action.payload
        }
    },
    [ArticleModalActionType.getArticleInfo]: (state, action) => {
        return {
            ...state,
            articleInfo: action.payload
        }
    },
    [ArticleModalActionType.getCommentInfo]: (state, action) => {
        return {
            ...state,
            commentArray: action.payload
        }
    },
    [ArticleModalActionType.getCommentLv2Info]: (state, action) => {
        return {
            ...state,
            commentLv2Array: action.payload
        }
    },
    [ArticleModalActionType.getPraiseInfo]: (state, action) => {
        return {
            ...state,
            praiseArray: action.payload
        }
    }
}, initialState)