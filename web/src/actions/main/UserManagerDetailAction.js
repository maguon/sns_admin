import {apiHost} from '../../config/HostConfig';
import {UserManagerDetailActionType} from '../../types';

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

// 获取 用户关系详情
export const getUserAttentionList = (userId) => async (dispatch, getState) => {
    try {
        // 检索条件：开始位置
        const start = getState().UserManagerDetailReducer.attentionStart;
        // 检索条件：每页数量
        const size = getState().UserManagerDetailReducer.size;
        // 检索条件：关注类型
        const conditionAttentionType = getState().UserManagerDetailReducer.conditionAttentionType;

        // 基本检索URL
        let url = apiHost + '/api/admin/' + localUtil.getSessionItem(sysConst.LOGIN_USER_ID)
            + '/friend?start=' + start + '&size=' + size;
        switch (conditionAttentionType === null ? '' : conditionAttentionType.value) {
            case 1:
                url = url + '&type=0&followId=' + userId;
                break;
            case 2:
                url = url + '&type=0&attentionId=' + userId;
                break;
            case 3:
                url = url + '&type=1&followId=' + userId;
                break;
            default:
                break;
        }

        const res = await httpUtil.httpGet(url);
        if (res.success === true) {
            dispatch({type: UserManagerDetailActionType.setAttentionDataSize, payload: res.result.length});
            dispatch({type: UserManagerDetailActionType.getUserAttentionList, payload: res.result.slice(0, size - 1)});
        } else if (res.success === false) {
            swal('获取用户关系信息失败', res.msg, 'warning');
        }
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};

// 获取 消息TAB详情
export const getUserMsgList = (userId) => async (dispatch, getState) => {
    try {
        // 检索条件：开始位置
        const start = getState().UserManagerDetailReducer.messageStart;
        // 检索条件：每页数量
        const size = getState().UserManagerDetailReducer.size;

        // 检索条件：消息编号
        const conditionId = getState().UserManagerDetailReducer.conditionMsgId.trim();
        // 检索条件：接收人手机
        const conditionReceiverPhone = getState().UserManagerDetailReducer.conditionMsgReceiverPhone.trim();
        // 检索条件：发送时间
        const conditionCreatedOnStart = getState().UserManagerDetailReducer.conditionMsgCreatedOnStart;
        const conditionCreatedOnEnd = getState().UserManagerDetailReducer.conditionMsgCreatedOnEnd;

        // 基本检索URL
        let url = apiHost + '/api/admin/' + localUtil.getSessionItem(sysConst.LOGIN_USER_ID)
            + '/sysMsg?userId=' + userId + '&start=' + start + '&size=' + size;

        // 检索条件
        let conditionsObj = {
            // 检索条件：消息编号
            sysMsgId: conditionId,
            // 检索条件：接收人手机
            phone: conditionReceiverPhone,
            // 检索条件：发送时间
            createDateStart: conditionCreatedOnStart,
            createDateEnd: conditionCreatedOnEnd
        };
        let conditions = httpUtil.objToUrl(conditionsObj);
        // 检索URL
        url = conditions.length > 0 ? url + "&" + conditions : url;
        const res = await httpUtil.httpGet(url);
        if (res.success === true) {
            dispatch({type: UserManagerDetailActionType.setMsgDataSize, payload: res.result.length});
            dispatch({type: UserManagerDetailActionType.getUserMsgList, payload: res.result.slice(0, size - 1)});
        } else if (res.success === false) {
            swal('获取消息列表信息失败', res.msg, 'warning');
        }
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};

// 获取 收藏文章详情
export const getUserMsgCollList = (userId) => async (dispatch, getState) => {
    try {
        // 检索条件：开始位置
        const start = getState().UserManagerDetailReducer.msgCollStart;
        // 检索条件：每页数量
        const size = getState().UserManagerDetailReducer.size;

        // 基本检索URL
        let url = apiHost + '/api/admin/' + localUtil.getSessionItem(sysConst.LOGIN_USER_ID)
            + '/userMsgColl?userId=' + userId + '&start=' + start + '&size=' + size;
        const res = await httpUtil.httpGet(url);
        if (res.success === true) {
            dispatch({type: UserManagerDetailActionType.setMsgCollDataSize, payload: res.result.length});
            dispatch({type: UserManagerDetailActionType.getUserMsgCollList, payload: res.result.slice(0, size - 1)});
        } else if (res.success === false) {
            swal('获取用户收藏文章信息失败', res.msg, 'warning');
        }
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};

// 获取 收藏地址详情
export const getUserAddressList = (userId) => async (dispatch, getState) => {
    try {
        // 检索条件：开始位置
        const start = getState().UserManagerDetailReducer.addressStart;
        // 检索条件：每页数量
        const size = getState().UserManagerDetailReducer.size;

        // 基本检索URL
        let url = apiHost + '/api/admin/' + localUtil.getSessionItem(sysConst.LOGIN_USER_ID)
            + '/userLocaColl?userId=' + userId + '&start=' + start + '&size=' + size;
        const res = await httpUtil.httpGet(url);
        if (res.success === true) {
            dispatch({type: UserManagerDetailActionType.setAddressDataSize, payload: res.result.length});
            dispatch({type: UserManagerDetailActionType.getUserAddressList, payload: res.result.slice(0, size - 1)});
        } else if (res.success === false) {
            swal('获取用户收藏地址信息失败', res.msg, 'warning');
        }
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};