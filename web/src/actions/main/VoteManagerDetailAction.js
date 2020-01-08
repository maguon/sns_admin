import {apiHost} from '../../config/HostConfig';
import {CommentManagerDetailActionType, NewVoteModalActionType} from '../../types';

const httpUtil = require('../../utils/HttpUtil');
const localUtil = require('../../utils/LocalUtil');
const sysConst = require('../../utils/SysConst');

// 获取评论信息
export const getVoteInfo = (id) => async (dispatch) => {
    try {
        // 基本检索URL
        let url = apiHost + '/api/admin/' + localUtil.getSessionItem(sysConst.LOGIN_USER_ID)
            + '/messageComments?messageCommentsId=' + id;
        const res = await httpUtil.httpGet(url);
        if (res.success === true) {
            dispatch({type: CommentManagerDetailActionType.getCommentInfo, payload: res.result});
            if (res.result.length > 0) {

                // 投票标题
                dispatch({type: NewVoteModalActionType.setVoteTitle, payload: ''});
                // 投票内容
                dispatch({type: NewVoteModalActionType.setVoteInfo, payload: ''});
                // 最多选项数
                dispatch({type: NewVoteModalActionType.setVoteMaxNum, payload: ''});
                // 开始时间
                dispatch({type: NewVoteModalActionType.setVoteStartTime, payload: ''});
                // 结束时间
                dispatch({type: NewVoteModalActionType.setVoteEndTime, payload: ''});

                // 输入投票选项
                dispatch({type: NewVoteModalActionType.setVoteInputOption, payload: ''});
                // 投票选项列表
                dispatch({type: NewVoteModalActionType.setVoteOptions, payload: []});
            }
        } else if (res.success === false) {
            swal('获取评论信息失败', res.msg, 'warning');
        }
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};


//
export const saveVote = () => async (dispatch, getState) => {
    try {
        // 投票标题
        const title = getState().NewVoteModalReducer.title.trim();
        // 投票内容
        const info = getState().NewVoteModalReducer.info.trim();
        // 最多选项数
        const maxNum = getState().NewVoteModalReducer.maxNum;
        // 开始时间
        const startTime = getState().NewVoteModalReducer.startTime;
        // 结束时间
        const endTime = getState().NewVoteModalReducer.endTime;

        // 投票选项列表
        const options = getState().NewVoteModalReducer.options;

        if (title === '' || info === '' || maxNum === '' || startTime === '' || endTime === '' || options.length === 0) {
            swal('保存失败', '请输入完整的投票信息！', 'warning');
        } else {
            const params = {
                title: title,
                info: info,
                maxNum: maxNum,
                startTime: startTime,
                endTime: endTime,
                option: options
            };
            // 基本url
            let url = apiHost + '/api/admin/' + localUtil.getSessionItem(sysConst.LOGIN_USER_ID) + "/vote";
            let res = await httpUtil.httpPost(url, params);
            if (res.success === true) {
                $('#newVoteModal').modal('close');
                swal("保存成功", "", "success");
                dispatch(voteManagerAction.getVoteList());
            } else if (res.success === false) {
                swal('保存失败', res.msg, 'warning');
            }
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
                + '/messageComments/' + id + '/del';
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
                + '/messageComments/' + id + '/status';
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