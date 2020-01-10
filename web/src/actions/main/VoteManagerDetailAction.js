import {apiHost} from '../../config/HostConfig';
import {VoteManagerDetailActionType} from '../../types';

const httpUtil = require('../../utils/HttpUtil');
const localUtil = require('../../utils/LocalUtil');
const sysConst = require('../../utils/SysConst');

// 获取投票信息
export const getVoteInfo = (id) => async (dispatch) => {
    try {
        // 基本检索URL
        let url = apiHost + '/api/admin/' + localUtil.getSessionItem(sysConst.LOGIN_USER_ID)
            + '/vote?voteId=' + id;
        const res = await httpUtil.httpGet(url);
        if (res.success === true) {
            dispatch({type: VoteManagerDetailActionType.getVoteInfo, payload: res.result});
            if (res.result.length > 0) {
                // 投票标题
                dispatch({type: VoteManagerDetailActionType.setVoteTitle, payload: res.result[0].title});
                // 投票内容
                dispatch({type: VoteManagerDetailActionType.setVoteInfo, payload: res.result[0].info});
                // 最多选项数
                dispatch({type: VoteManagerDetailActionType.setVoteMaxNum, payload: res.result[0].max_num});
                // 开始时间
                dispatch({type: VoteManagerDetailActionType.setVoteStartTime, payload: res.result[0].start_time});
                // 结束时间
                dispatch({type: VoteManagerDetailActionType.setVoteEndTime, payload: res.result[0].end_time});

                // 输入投票选项
                dispatch({type: VoteManagerDetailActionType.setVoteInputOption, payload: ''});
                // 投票选项列表
                dispatch({type: VoteManagerDetailActionType.setVoteOptions, payload: res.result[0].option});
            }
        } else if (res.success === false) {
            swal('获取评论信息失败', res.msg, 'warning');
        }
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};

// 保存投票信息
export const saveVote = (id) => async (dispatch, getState) => {
    try {
        // 投票标题
        const title = getState().VoteManagerDetailReducer.title.trim();
        // 投票内容
        const info = getState().VoteManagerDetailReducer.info.trim();
        // 最多选项数
        const maxNum = getState().VoteManagerDetailReducer.maxNum;
        // 开始时间
        const startTime = getState().VoteManagerDetailReducer.startTime;
        // 结束时间
        const endTime = getState().VoteManagerDetailReducer.endTime;

        // 投票选项列表
        const options = getState().VoteManagerDetailReducer.options;

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
            let url = apiHost + '/api/admin/' + localUtil.getSessionItem(sysConst.LOGIN_USER_ID) + "/vote/" + id + "/info";
            let res = await httpUtil.httpPut(url, params);
            if (res.success === true) {
                swal("保存成功", "", "success");
                dispatch(getVoteInfo(id));
            } else if (res.success === false) {
                swal('保存失败', res.msg, 'warning');
            }
        }
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};