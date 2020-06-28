import {apiHost} from '../../config/HostConfig';
import {FakeUserSettingActionType} from '../../types';

const httpUtil = require('../../utils/HttpUtil');
const localUtil = require('../../utils/LocalUtil');
const sysConst = require('../../utils/SysConst');

// 系统设置 -> Fake用户管理 取得画面列表
export const getFakeUserList = () => async (dispatch, getState) => {
    try {
        // 检索条件：开始位置
        const start = getState().FakeUserSettingReducer.start;
        // 检索条件：每页数量
        const size = getState().FakeUserSettingReducer.size;

        // 检索条件：手机
        // const conditionPhone = getState().FakeUserSettingReducer.conditionPhone.trim();
        // 检索条件：状态
        const conditionStatus = getState().FakeUserSettingReducer.conditionStatus;

        // 基本检索URL
        let url = apiHost + '/api/admin/' + localUtil.getSessionItem(sysConst.LOGIN_USER_ID)
            + '/fakeUser?start=' + start + '&size=' + size;

        // 检索条件
        let conditionsObj = {
            // 检索条件：电话
            // phone: conditionPhone,
            // 检索条件：状态
            status: conditionStatus === null ? '' : conditionStatus.value
        };
        let conditions = httpUtil.objToUrl(conditionsObj);
        // 检索URL
        url = conditions.length > 0 ? url + "&" + conditions : url;
        const res = await httpUtil.httpGet(url);
        if (res.success === true) {
            dispatch({type: FakeUserSettingActionType.setDataSize, payload: res.result.length});
            dispatch({type: FakeUserSettingActionType.getFakeUserList, payload: res.result.slice(0, size - 1)});
        } else if (res.success === false) {
            swal('获取Fake用户列表信息失败', res.msg, 'warning');
        }
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};