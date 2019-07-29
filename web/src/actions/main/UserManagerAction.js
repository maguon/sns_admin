import {apiHost} from '../../config/HostConfig';
import {UserManagerActionType} from '../../types';

const httpUtil = require('../../utils/HttpUtil');
const localUtil = require('../../utils/LocalUtil');
const sysConst = require('../../utils/SysConst');

export const getUserList = () => async (dispatch, getState) => {
    try {
        // 检索条件：开始位置
        const start = getState().UserManagerReducer.start;
        // 检索条件：每页数量
        const size = getState().UserManagerReducer.size;

        // 检索条件：用户编号
        const conditionUserId = getState().UserManagerReducer.conditionUserId.trim();
        // 检索条件：用户电话
        const conditionPhone = getState().UserManagerReducer.conditionPhone.trim();
        // 检索条件：用户昵称
        const conditionNickname = getState().UserManagerReducer.conditionNickname.trim();
        // 检索条件：状态
        const conditionStatus = getState().UserManagerReducer.conditionStatus;

        // 基本检索URL
        // let url = apiHost + '/api/admin/' + localUtil.getSessionItem(sysConst.USER_ID)
        //     + '/achievement?start=' + start + '&size=' + size;
        let url = apiHost + '/api/user?start=' + start + '&size=' + size;
        // 检索条件
        let conditionsObj = {
            userId: conditionUserId,
            phone: conditionPhone,
            nikename: conditionNickname,
            // 检索条件：状态
            status: conditionStatus === null ? '' : conditionStatus.value
        };

        let conditions = httpUtil.objToUrl(conditionsObj);
        // 检索URL
        url = conditions.length > 0 ? url + "&" + conditions : url;
        const res = await httpUtil.httpGet(url);
        if (res.success === true) {
            dispatch({type: UserManagerActionType.setDataSize, payload: res.result.length});
            dispatch({type: UserManagerActionType.getUserList, payload: res.result.slice(0, size - 1)});
        } else if (res.success === false) {
            swal('获取用户列表信息失败', res.msg, 'warning');
        }
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};