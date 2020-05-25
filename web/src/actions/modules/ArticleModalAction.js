import {apiHost} from '../../config/HostConfig';
import {ArticleModalActionType} from "../../types";

const httpUtil = require('../../utils/HttpUtil');
const localUtil = require('../../utils/LocalUtil');
const sysConst = require('../../utils/SysConst');

// 获取文章信息
export const initMsgCollModal = (articleId) => async (dispatch) => {
    try {
        // 文章ID
        dispatch({type: ArticleModalActionType.setArticleId, payload: articleId});
        // 基本检索URL
        let url = apiHost + '/api/admin/' + localUtil.getSessionItem(sysConst.LOGIN_USER_ID)
            + '/msg?msgId=' + articleId;
        const res = await httpUtil.httpGet(url);
        if (res.success === true) {
            dispatch({type: ArticleModalActionType.getArticleInfo, payload: res.result});
            dispatch(getCommentInfo());
            dispatch(getPraiseInfo());
        } else if (res.success === false) {
            swal('获取文章信息失败', res.msg, 'warning');
        }
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};

// 获取评论信息
export const getCommentInfo = () => async (dispatch, getState) => {
    try {
        // 检索条件：开始位置
        const articleId = getState().ArticleModalReducer.articleId;

        // 基本检索URL
        let url = apiHost + '/api/admin/' + localUtil.getSessionItem(sysConst.LOGIN_USER_ID)
            + '/msgComment?level=1&msgId=' + articleId;
        const res = await httpUtil.httpGet(url);
        if (res.success === true) {
            dispatch({type: ArticleModalActionType.getCommentInfo, payload: res.result});
            dispatch({type: ArticleModalActionType.getCommentLv2Info, payload: []});
        } else if (res.success === false) {
            swal('获取评论信息失败', res.msg, 'warning');
        }
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};

// 获取评论信息
export const getComLv2List = (msgComId) => async (dispatch) => {
    try {
        // 基本检索URL
        let url = apiHost + '/api/admin/' + localUtil.getSessionItem(sysConst.LOGIN_USER_ID)
            + '/msgComment?level=2&msgComId=' + msgComId;
        const res = await httpUtil.httpGet(url);
        if (res.success === true) {
            dispatch({type: ArticleModalActionType.getCommentLv2Info, payload: res.result});
        } else if (res.success === false) {
            swal('获取评论信息失败', res.msg, 'warning');
        }
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};

// 获取点赞信息
export const getPraiseInfo = () => async (dispatch, getState) => {
    try {
        // 检索条件：开始位置
        const articleId = getState().ArticleModalReducer.articleId;
        // 基本检索URL
        let url = apiHost + '/api/admin/' + localUtil.getSessionItem(sysConst.LOGIN_USER_ID)
            + '/getUserPraise?msgId=' + articleId;
        const res = await httpUtil.httpGet(url);
        if (res.success === true) {
            dispatch({type: ArticleModalActionType.getPraiseInfo, payload: res.result});
        } else if (res.success === false) {
            swal('获取点赞信息失败', res.msg, 'warning');
        }
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};