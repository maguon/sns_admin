import {apiHost} from '../../config/HostConfig';
import {VoteManagerActionType} from '../../types';

const httpUtil = require('../../utils/HttpUtil');
const localUtil = require('../../utils/LocalUtil');
const sysConst = require('../../utils/SysConst');

export const getVoteList = () => async (dispatch, getState) => {
    try {
        // 检索条件：开始位置
        const start = getState().VoteManagerReducer.start;
        // 检索条件：每页数量
        const size = getState().VoteManagerReducer.size;

        // 检索条件：投票编号
        const conditionVoteId = getState().VoteManagerReducer.conditionVoteId.trim();
        // 检索条件：标题检索
        const conditionTitle = getState().VoteManagerReducer.conditionTitle.trim();
        // 检索条件：最多选项数
        const conditionMaxNum = getState().VoteManagerReducer.conditionMaxNum;
        // 检索条件：状态
        const conditionStatus = getState().VoteManagerReducer.conditionStatus;
        // 检索条件：发布时间
        const conditionCreatedOnStart = getState().VoteManagerReducer.conditionCreatedOnStart;
        const conditionCreatedOnEnd = getState().VoteManagerReducer.conditionCreatedOnEnd;

        // 基本检索URL
        let url = apiHost + '/api/admin/' + localUtil.getSessionItem(sysConst.LOGIN_USER_ID)
            + '/vote?start=' + start + '&size=' + size;
        // 检索条件
        let conditionsObj = {
            // 检索条件：投票编号
            voteId: conditionVoteId,
            // 检索条件：标题检索
            title: conditionTitle,
            // 检索条件：最多选项数
            maxNum: conditionMaxNum,
            // 检索条件：状态
            status: conditionStatus === null ? '' : conditionStatus.value,
            // 检索条件：发布时间
            createDateStart: conditionCreatedOnStart,
            createDateEnd: conditionCreatedOnEnd
        };

        let conditions = httpUtil.objToUrl(conditionsObj);
        // 检索URL
        url = conditions.length > 0 ? url + "&" + conditions : url;
        const res = await httpUtil.httpGet(url);
        if (res.success === true) {
            dispatch({type: VoteManagerActionType.setDataSize, payload: res.result.length});
            dispatch({type: VoteManagerActionType.getVoteList, payload: res.result.slice(0, size - 1)});
        } else if (res.success === false) {
            swal('获取投票列表信息失败', res.msg, 'warning');
        }
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};

export const deleteVote = (id) => async (dispatch) => {
    swal({
        title: "确定删除该投票？",
        text: "",
        icon: "warning",
        buttons: {
            cancel: '取消',
            confirm: '确定',
        },
    }).then(async function (isConfirm) {
        if (isConfirm) {
            const url = apiHost + '/api/admin/' + localUtil.getSessionItem(sysConst.LOGIN_USER_ID)
                + '/vote/' + id + '/del';
            const res = await httpUtil.httpDelete(url, {});
            if (res.success === true) {
                swal("修改成功", "", "success");
            } else if (res.success === false) {
                swal('修改失败', res.msg, 'warning');
            }
            dispatch(getVoteList());
        }
    });
};