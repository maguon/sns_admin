import {apiHost} from '../../config/HostConfig';
import {FakeArticleManagerDetailActionType} from '../../types';

const httpUtil = require('../../utils/HttpUtil');
const localUtil = require('../../utils/LocalUtil');
const sysConst = require('../../utils/SysConst');

// 初期数据
export const initDetailData = () => async (dispatch) => {
    dispatch({type: FakeArticleManagerDetailActionType.getArticleInfo, payload: []});
    dispatch({type: FakeArticleManagerDetailActionType.getCommentInfo, payload: []});
    dispatch({type: FakeArticleManagerDetailActionType.getCommentLv2Info, payload: []});
    dispatch({type: FakeArticleManagerDetailActionType.getPraiseInfo, payload: []});
};

// 获取文章信息
export const getArticleInfo = (articleId) => async (dispatch) => {
    try {
        // 基本检索URL
        let url = apiHost + '/api/admin/' + localUtil.getSessionItem(sysConst.LOGIN_USER_ID)
            + '/msg?msgId=' + articleId;
        const res = await httpUtil.httpGet(url);
        if (res.success === true) {
            dispatch({type: FakeArticleManagerDetailActionType.getArticleInfo, payload: res.result});
            dispatch(getCommentInfo(articleId));
        } else if (res.success === false) {
            swal('获取文章信息失败', res.msg, 'warning');
        }
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};

// 获取评论信息
export const getCommentInfo = (articleId) => async (dispatch) => {
    try {
        // 基本检索URL
        let url = apiHost + '/api/admin/' + localUtil.getSessionItem(sysConst.LOGIN_USER_ID)
            + '/msgComment?level=1&msgId=' + articleId;
        const res = await httpUtil.httpGet(url);
        if (res.success === true) {
            dispatch({type: FakeArticleManagerDetailActionType.getCommentInfo, payload: res.result});
            dispatch({type: FakeArticleManagerDetailActionType.getCommentLv2Info, payload: []});
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
            dispatch({type: FakeArticleManagerDetailActionType.getCommentLv2Info, payload: res.result});
        } else if (res.success === false) {
            swal('获取评论信息失败', res.msg, 'warning');
        }
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};

// 获取点赞信息
export const getPraiseInfo = (articleId) => async (dispatch) => {
    try {
        // 基本检索URL
        let url = apiHost + '/api/admin/' + localUtil.getSessionItem(sysConst.LOGIN_USER_ID)
            + '/getUserPraise?msgId=' + articleId;
        const res = await httpUtil.httpGet(url);
        if (res.success === true) {
            dispatch({type: FakeArticleManagerDetailActionType.getPraiseInfo, payload: res.result});
        } else if (res.success === false) {
            swal('获取点赞信息失败', res.msg, 'warning');
        }
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};