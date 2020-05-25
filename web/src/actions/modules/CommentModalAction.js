import {apiHost} from '../../config/HostConfig';
import {CommentModalActionType} from "../../types";

const httpUtil = require('../../utils/HttpUtil');
const localUtil = require('../../utils/LocalUtil');
const sysConst = require('../../utils/SysConst');

// 获取评论信息
export const initCommentInfo = (id) => async (dispatch) => {
    try {
        // 基本检索URL
        let url = apiHost + '/api/admin/' + localUtil.getSessionItem(sysConst.LOGIN_USER_ID)
            + '/msgComment?Id=' + id;
        const res = await httpUtil.httpGet(url);
        if (res.success === true) {
            dispatch({type: CommentModalActionType.getCommentInfo, payload: res.result});
            if (res.result.length > 0) {
                dispatch(getArticleInfo(res.result[0]._msg_id));
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
            + '/msg?msgId=' + articleId;
        const res = await httpUtil.httpGet(url);
        if (res.success === true) {
            dispatch({type: CommentModalActionType.getArticleInfo, payload: res.result});
        } else if (res.success === false) {
            swal('获取文章信息失败', res.msg, 'warning');
        }
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};