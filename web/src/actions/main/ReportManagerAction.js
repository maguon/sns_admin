import {apiHost} from '../../config/HostConfig';
import {ReportManagerActionType} from '../../types';

const httpUtil = require('../../utils/HttpUtil');
const localUtil = require('../../utils/LocalUtil');
const sysConst = require('../../utils/SysConst');

// 举报管理 -> 取得画面列表
export const getReportList = () => async (dispatch, getState) => {
    try {
        // 检索条件：开始位置
        const start = getState().ReportManagerReducer.start;
        // 检索条件：每页数量
        const size = getState().ReportManagerReducer.size;

        // 检索条件：处理状态（1-未处理（默认），2-已处理）
        const conditionStatus = getState().ReportManagerReducer.conditionStatus;
        // 检索条件：处理结果（1-有效，2-无效）
        const conditionValidResults = getState().ReportManagerReducer.conditionValidResults;
        // 检索条件：举报时间
        const conditionCreatedOnStart = getState().ReportManagerReducer.conditionCreatedOnStart;
        const conditionCreatedOnEnd = getState().ReportManagerReducer.conditionCreatedOnEnd;

        // 基本检索URL
        let url = apiHost + '/api/admin/' + localUtil.getSessionItem(sysConst.LOGIN_USER_ID)
            + '/report?start=' + start + '&size=' + size;
        // 检索条件
        let conditionsObj = {
            // 检索条件：处理状态
            status: conditionStatus === null ? '' : conditionStatus.value,
            // 检索条件：处理结果
            validResults: conditionValidResults === null ? '' : conditionValidResults.value,
            // 检索条件：发布时间
            createDateStart: conditionCreatedOnStart,
            createDateEnd: conditionCreatedOnEnd
        };

        let conditions = httpUtil.objToUrl(conditionsObj);
        // 检索URL
        url = conditions.length > 0 ? url + "&" + conditions : url;
        const res = await httpUtil.httpGet(url);
        if (res.success === true) {
            dispatch({type: ReportManagerActionType.setDataSize, payload: res.result.length});
            dispatch({type: ReportManagerActionType.getReportList, payload: res.result.slice(0, size - 1)});
        } else if (res.success === false) {
            swal('获取举报列表信息失败', res.msg, 'warning');
        }
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};