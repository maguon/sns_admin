import {handleActions} from 'redux-actions';
import {CommentManagerDetailActionType} from '../../types';

const initialState = {
    // 评论管理 详细 结果
    commentInfo: [],
    // 文章信息
    articleInfo: []
};

export default handleActions({
    [CommentManagerDetailActionType.getCommentInfo]: (state, action) => {
        return {
            ...state,
            commentInfo: action.payload
        }
    },
    [CommentManagerDetailActionType.getArticleInfo]: (state, action) => {
        return {
            ...state,
            articleInfo: action.payload
        }
    }
}, initialState)