import {handleActions} from 'redux-actions';
import {ArticleManagerDetailActionType} from '../../types';

const initialState = {
    // 文章信息
    articleInfo: [],
    // 评论管理 详细 结果
    commentInfo: []
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
            commentInfo: action.payload
        }
    }
}, initialState)