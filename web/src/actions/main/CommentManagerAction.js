import {apiHost} from '../../config/HostConfig';
import {CommentManagerActionType} from '../../types';

const httpUtil = require('../../utils/HttpUtil');
const localUtil = require('../../utils/LocalUtil');
const sysConst = require('../../utils/SysConst');

export const getCommentList = () => async (dispatch, getState) => {
    try {
        // 检索条件：开始位置
        const start = getState().CommentManagerReducer.start;
        // 检索条件：每页数量
        const size = getState().CommentManagerReducer.size;

        // 检索条件：评论编号
        const conditionCommentId = getState().CommentManagerReducer.conditionCommentId.trim();
        // 检索条件：评论类型
        const conditionType = getState().CommentManagerReducer.conditionType;
        // 检索条件：注册手机
        const conditionCommentUserPhone = getState().CommentManagerReducer.conditionCommentUserPhone.trim();
        // 检索条件：文章编号
        const conditionArticleId = getState().CommentManagerReducer.conditionArticleId.trim();

        // 检索条件：评论时间
        const conditionCreatedOnStart = getState().CommentManagerReducer.conditionCreatedOnStart;
        const conditionCreatedOnEnd = getState().CommentManagerReducer.conditionCreatedOnEnd;
        // 检索条件：评论状态
        const conditionStatus = getState().CommentManagerReducer.conditionStatus;

        // 基本检索URL
        let url = apiHost + '/api/admin/' + localUtil.getSessionItem(sysConst.LOGIN_USER_ID)
            + '/msgComment?start=' + start + '&size=' + size;
        // 检索条件
        let conditionsObj = {
            // 检索条件：评论编号
            msgCommentId: conditionCommentId,
            // 检索条件：评论类型
            msgType: conditionType === null ? '' : conditionType.value,
            // 检索条件：注册手机
            phone: conditionCommentUserPhone,
            // 检索条件：文章编号
            msgId: conditionArticleId,
            // 检索条件：评论时间
            createDateStart: conditionCreatedOnStart,
            createDateEnd: conditionCreatedOnEnd,
            // 评论状态
            status: conditionStatus === null ? '' : conditionStatus.value
        };

        let conditions = httpUtil.objToUrl(conditionsObj);
        // 检索URL
        url = conditions.length > 0 ? url + "&" + conditions : url;
        const res = await httpUtil.httpGet(url);
        if (res.success === true) {
            dispatch({type: CommentManagerActionType.setDataSize, payload: res.result.length});
            dispatch({type: CommentManagerActionType.getCommentList, payload: res.result.slice(0, size - 1)});
        } else if (res.success === false) {
            swal('获取评论列表信息失败', res.msg, 'warning');
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
                + '/msgCom/' + id + '/del';
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
                + '/msgCom/' + id + '/status';
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