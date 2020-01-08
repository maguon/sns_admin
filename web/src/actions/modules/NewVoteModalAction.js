import {apiHost} from '../../config/HostConfig';
import {NewVoteModalActionType} from "../../types";

const httpUtil = require('../../utils/HttpUtil');
const localUtil = require('../../utils/LocalUtil');
const sysConst = require('../../utils/SysConst');

const voteManagerAction = require('../../actions/main/VoteManagerAction');

// 新增员工画面 初期
export const initNewVoteModal = () => async (dispatch) => {
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
};

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