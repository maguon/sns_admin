import {apiHost} from '../../config/HostConfig';
import {ArticleManagerDetailActionType} from '../../types';

const httpUtil = require('../../utils/HttpUtil');
const localUtil = require('../../utils/LocalUtil');
const sysConst = require('../../utils/SysConst');

// 获取评论信息
export const getCommentInfo = (id) => async (dispatch) => {
    try {
        // 基本检索URL
        let url = apiHost + '/api/admin/' + localUtil.getSessionItem(sysConst.LOGIN_USER_ID)
            + '/msgComment?messageCommentsId=' + id;
        const res = await httpUtil.httpGet(url);
        if (res.success === true) {
            dispatch({type: ArticleManagerDetailActionType.getCommentInfo, payload: res.result});
            if (res.result.length > 0) {
                dispatch(getArticleInfo(res.result[0].messages_info[0]._id));
            }
        } else if (res.success === false) {
            swal('获取评论信息失败', res.msg, 'warning');
        }
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};

// 获取文章信息
export const getArticleInfo = (articleId) => async (dispatch) => {
    try {
        // 基本检索URL
        let url = apiHost + '/api/admin/' + localUtil.getSessionItem(sysConst.LOGIN_USER_ID)
            + '/msg?messagesId=' + articleId;
        const res = await httpUtil.httpGet(url);
        if (res.success === true) {
            dispatch({type: ArticleManagerDetailActionType.getArticleInfo, payload: res.result});
        } else if (res.success === false) {
            swal('获取文章信息失败', res.msg, 'warning');
        }
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};























export const deleteComment = (id) => async (dispatch) => {
    swal({
        title: "确定删除该评论？",
        text: "",
        icon: "warning",
        buttons: {
            cancel: '取消',
            confirm: '确定',
        },
    }).then(async function (isConfirm) {
        if (isConfirm) {
            const url = apiHost + '/api/admin/' + localUtil.getSessionItem(sysConst.LOGIN_USER_ID)
                + '/msgComment/' + id + '/del';
            const res = await httpUtil.httpDelete(url, {});
            if (res.success === true) {
                swal("修改成功", "", "success");
            } else if (res.success === false) {
                swal('修改失败', res.msg, 'warning');
            }
            dispatch(getCommentList());
        }
    });
};

export const changeCommentStatus = (id, status) => async (dispatch) => {
    swal({
        title: status === 1 ? "确定屏蔽该评论？" : "确定重新显示该评论？",
        text: "",
        icon: "warning",
        buttons: {
            cancel: '取消',
            confirm: '确定',
        },
    }).then(async function (isConfirm) {
        if (isConfirm) {
            // 状态
            let newStatus = 0;
            if (status === 0) {
                newStatus = 1
            } else {
                newStatus = 0
            }

            const url = apiHost + '/api/admin/' + localUtil.getSessionItem(sysConst.LOGIN_USER_ID)
                + '/msgComment/' + id + '/status';
            const res = await httpUtil.httpPut(url, {status: newStatus});
            if (res.success === true) {
                swal("修改成功", "", "success");
                dispatch(getCommentList());
            } else if (res.success === false) {
                swal('修改失败', res.msg, 'warning');
            }
        }
    });
};