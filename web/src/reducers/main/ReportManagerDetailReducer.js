import {handleActions} from 'redux-actions';
import {ReportManagerDetailActionType} from '../../types';

const initialState = {
    // 举报信息
    reportInfo: [],
    // 文章信息
    articleInfo: [],
    // 处理结果
    validResults: null,
    // 举报处理内容
    reportReview: []
};

export default handleActions({
    [ReportManagerDetailActionType.getReportInfo]: (state, action) => {
        return {
            ...state,
            reportInfo: action.payload
        }
    },
    [ReportManagerDetailActionType.getArticleInfo]: (state, action) => {
        return {
            ...state,
            articleInfo: action.payload
        }
    },
    [ReportManagerDetailActionType.setValidResults]: (state, action) => {
        return {
            ...state,
            validResults: action.payload
        }
    },
    [ReportManagerDetailActionType.setReportReview]: (state, action) => {
        return {
            ...state,
            reportReview: action.payload
        }
    }
}, initialState)