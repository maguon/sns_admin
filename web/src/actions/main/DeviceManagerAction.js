import {apiHost} from '../../config/HostConfig';
import {DeviceManagerActionType} from '../../types';

const httpUtil = require('../../utils/HttpUtil');
const localUtil = require('../../utils/LocalUtil');
const sysConst = require('../../utils/SysConst');

// 设备管理 取得画面列表
export const getDeviceList = () => async (dispatch, getState) => {
    try {
        // 检索条件：开始位置
        const start = getState().DeviceManagerReducer.start;
        // 检索条件：每页数量
        const size = getState().DeviceManagerReducer.size;

        // 检索条件：手机（11位）
        const conditionPhone = getState().DeviceManagerReducer.conditionPhone.trim();
        // 检索条件：设备类型
        const conditionDeviceType = getState().DeviceManagerReducer.conditionDeviceType;
        // 检索条件：设备版本
        const conditionVersion = getState().DeviceManagerReducer.conditionVersion;
        // 检索条件：设备登录状态(-1-退出登录，1-登录中)
        const conditionStatus = getState().DeviceManagerReducer.conditionStatus;

        // 基本检索URL
        let url = apiHost + '/api/admin/' + localUtil.getSessionItem(sysConst.LOGIN_USER_ID)
            + '/userDevice?start=' + start + '&size=' + size;
        // 检索条件
        let conditionsObj = {
            // 检索条件：手机（11位）
            phone: conditionPhone,
            // 检索条件：设备类型
            deviceType: conditionDeviceType === null ? '' : conditionDeviceType.value,
            // 检索条件：设备版本
            version: conditionVersion === null ? '' : conditionVersion.label,
            // 设备登录状态
            status: conditionStatus === null ? '' : conditionStatus.value
        };

        let conditions = httpUtil.objToUrl(conditionsObj);
        // 检索URL
        url = conditions.length > 0 ? url + "&" + conditions : url;
        const res = await httpUtil.httpGet(url);
        if (res.success === true) {
            dispatch({type: DeviceManagerActionType.setDataSize, payload: res.result.length});
            dispatch({type: DeviceManagerActionType.getDeviceList, payload: res.result.slice(0, size - 1)});
        } else if (res.success === false) {
            swal('获取设备列表信息失败', res.msg, 'warning');
        }
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};