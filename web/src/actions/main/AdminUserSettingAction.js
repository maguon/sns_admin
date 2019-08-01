import {apiHost} from '../../config/HostConfig';
import {AdminUserSettingActionType} from '../../types';

const httpUtil = require('../../utils/HttpUtil');
const localUtil = require('../../utils/LocalUtil');
const sysConst = require('../../utils/SysConst');

export const getAdminList = () => async (dispatch, getState) => {
    try {
        // 检索条件：开始位置
        const start = getState().AdminUserSettingReducer.start;
        // 检索条件：每页数量
        const size = getState().AdminUserSettingReducer.size;

        // 检索条件：手机
        const conditionPhone = getState().AdminUserSettingReducer.conditionPhone.trim();
        // 检索条件：管理员名称
        const conditionAdminName = getState().AdminUserSettingReducer.conditionAdminName.trim();
        // 检索条件：真实姓名
        const conditionRealName = getState().AdminUserSettingReducer.conditionRealName.trim();
        // 检索条件：状态
        const conditionStatus = getState().AdminUserSettingReducer.conditionStatus;

        // 基本检索URL
        let url = apiHost + '/api/admin/' + localUtil.getSessionItem(sysConst.USER_ID)
            + '/adminUser?type=0&start=' + start + '&size=' + size;

        // 检索条件
        let conditionsObj = {
            // 检索条件：电话
            phone: conditionPhone,
            // 检索条件：姓名
            name: conditionAdminName,
            // 检索条件：员工编号
            realname: conditionRealName,
            // 检索条件：状态
            status: conditionStatus === null ? '' : conditionStatus.value
        };
        let conditions = httpUtil.objToUrl(conditionsObj);
        // 检索URL
        url = conditions.length > 0 ? url + "&" + conditions : url;
        const res = await httpUtil.httpGet(url);
        if (res.success === true) {
            dispatch({type: AdminUserSettingActionType.setDataSize, payload: res.result.length});
            dispatch({type: AdminUserSettingActionType.getAdminList, payload: res.result.slice(0, size - 1)});
        } else if (res.success === false) {
            swal('获取管理员列表信息失败', res.msg, 'warning');
        }
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};