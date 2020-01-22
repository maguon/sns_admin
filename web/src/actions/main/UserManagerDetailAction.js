import {apiHost} from '../../config/HostConfig';
import {UserManagerDetailActionType} from '../../types';
import {getAdminInfo} from "./AdminUserSettingDetailAction";

const httpUtil = require('../../utils/HttpUtil');
const localUtil = require('../../utils/LocalUtil');
const sysConst = require('../../utils/SysConst');

// 获取用户 基本信息
export const getUserInfo = (id) => async (dispatch) => {
    try {
        // 基本检索URL
        const url = apiHost + '/api/admin/' + localUtil.getSessionItem(sysConst.LOGIN_USER_ID) + '/user?userId=' + id;
        const res = await httpUtil.httpGet(url);
        if (res.success === true) {
            dispatch({type: UserManagerDetailActionType.getUserInfo, payload: res.result});
        } else if (res.success === false) {
            swal('获取用户信息失败', res.msg, 'warning');
        }
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};

// 获取用户 通知设置
export const getUserNoticeInfo = (id) => async (dispatch) => {
    try {
        // 基本检索URL
        const url = apiHost + '/api/admin/' + localUtil.getSessionItem(sysConst.LOGIN_USER_ID) + '/notice?userId=' + id;
        const res = await httpUtil.httpGet(url);
        if (res.success === true) {
            dispatch({type: UserManagerDetailActionType.getUserNoticeInfo, payload: res.result});
        } else if (res.success === false) {
            swal('获取用户通知设置失败', res.msg, 'warning');
        }
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};

// 修改用户状态
export const changeUserStatus = (userId, status) => async (dispatch) => {
    let titleText = '';
    if (status === sysConst.USER_STATUS[1].value) {
        // 禁言
        titleText = '确定禁言该用户？';
    } else if (status === sysConst.USER_STATUS[2].value) {
        // 停用
        titleText = '确定停用该用户？';
    }
    swal({
        title: titleText,
        text: "",
        icon: "warning",
        buttons: {
            cancel: '取消',
            confirm: '确定',
        },
    }).then(async function (isConfirm) {
        if (isConfirm) {
            const url = apiHost + '/api/admin/' + localUtil.getSessionItem(sysConst.LOGIN_USER_ID)
                + '/user/' + userId + '/status';
            const res = await httpUtil.httpPut(url, {status: status});
            if (res.success === true) {
                swal("修改成功", "", "success");
                dispatch(getUserInfo(userId));
                dispatch(getUserNoticeInfo(userId));
            } else if (res.success === false) {
                swal('修改失败', res.msg, 'warning');
            }
        }
    });
};

// 获取 用户 发布文章
export const getUserArticleList = (userId) => async (dispatch, getState) => {
    try {
        // 检索条件：开始位置
        const start = getState().UserManagerDetailReducer.articleStart;
        // 检索条件：每页数量
        const size = getState().UserManagerDetailReducer.size;

        // 基本检索URL
        let url = apiHost + '/api/admin/' + localUtil.getSessionItem(sysConst.LOGIN_USER_ID)
            + '/msg?userId=' + userId + '&start=' + start + '&size=' + size;
        const res = await httpUtil.httpGet(url);
        if (res.success === true) {
            dispatch({type: UserManagerDetailActionType.setArticleDataSize, payload: res.result.length});
            dispatch({type: UserManagerDetailActionType.getUserArticleList, payload: res.result.slice(0, size - 1)});
        } else if (res.success === false) {
            swal('获取用户发布文章列表失败', res.msg, 'warning');
        }
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};


// 获取 用户 评论回复
export const getUserCommentList = (userId) => async (dispatch, getState) => {
    try {
        // 检索条件：开始位置
        const start = getState().UserManagerDetailReducer.commentStart;
        // 检索条件：每页数量
        const size = getState().UserManagerDetailReducer.size;

        // 基本检索URL
        let url = apiHost + '/api/admin/' + localUtil.getSessionItem(sysConst.LOGIN_USER_ID)
            + '/msgComment?userId=' + userId + '&start=' + start + '&size=' + size;
        const res = await httpUtil.httpGet(url);
        if (res.success === true) {
            dispatch({type: UserManagerDetailActionType.setCommentDataSize, payload: res.result.length});
            dispatch({type: UserManagerDetailActionType.getUserCommentList, payload: res.result.slice(0, size - 1)});
        } else if (res.success === false) {
            swal('获取用户评论回复列表失败', res.msg, 'warning');
        }
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};


// 获取 参与人投票详情
export const getUserVoteList = (userId) => async (dispatch, getState) => {
    try {
        // 检索条件：开始位置
        const start = getState().UserManagerDetailReducer.voteStart;
        // 检索条件：每页数量
        const size = getState().UserManagerDetailReducer.size;

        // 基本检索URL
        let url = apiHost + '/api/admin/' + localUtil.getSessionItem(sysConst.LOGIN_USER_ID)
            + '/getUserVote?userId=' + userId + '&start=' + start + '&size=' + size;
        const res = await httpUtil.httpGet(url);
        if (res.success === true) {
            dispatch({type: UserManagerDetailActionType.setVoteDataSize, payload: res.result.length});
            dispatch({type: UserManagerDetailActionType.getUserVoteList, payload: res.result.slice(0, size - 1)});
        } else if (res.success === false) {
            swal('获取用户投票信息失败', res.msg, 'warning');
        }
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};