import {apiHost} from '../../config/HostConfig';
import {AppVersionActionType} from '../../types';

const httpUtil = require('../../utils/HttpUtil');
const localUtil = require('../../utils/LocalUtil');
const sysConst = require('../../utils/SysConst');

export const getAppList = () => async (dispatch, getState) => {
    try {
        // 检索条件：开始位置
        const start = getState().AppVersionReducer.start;
        // 检索条件：每页数量
        const size = getState().AppVersionReducer.size;

        // 检索条件：系统
        const conditionDeviceType = getState().AppVersionReducer.conditionDeviceType;
        // 检索条件：状态
        const conditionStatus = getState().AppVersionReducer.conditionStatus;

        // 基本检索URL
        let url = apiHost + '/api/admin/' + localUtil.getSessionItem(sysConst.LOGIN_USER_ID)
            + '/app?start=' + start + '&size=' + size;

        // 检索条件
        let conditionsObj = {
            // 检索条件：系统
            deviceType: conditionDeviceType === null ? '' : conditionDeviceType.value,
            // 检索条件：状态
            status: conditionStatus === null ? '' : conditionStatus.value
        };
        let conditions = httpUtil.objToUrl(conditionsObj);
        // 检索URL
        url = conditions.length > 0 ? url + "&" + conditions : url;
        const res = await httpUtil.httpGet(url);
        if (res.success === true) {
            dispatch({type: AppVersionActionType.setDataSize, payload: res.result.length});
            dispatch({type: AppVersionActionType.getAppList, payload: res.result.slice(0, size - 1)});
        } else if (res.success === false) {
            swal('获取App列表信息失败', res.msg, 'warning');
        }
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};

export const deleteApp = (id) => async (dispatch) => {
    swal({
        title: "确定删除该App版本？",
        text: "",
        icon: "warning",
        buttons: {
            cancel: '取消',
            confirm: '确定',
        },
    }).then(async function (isConfirm) {
        if (isConfirm) {
            const url = apiHost + '/api/admin/' + localUtil.getSessionItem(sysConst.LOGIN_USER_ID)
                + '/app/' + id + '/del';
            const res = await httpUtil.httpDelete(url, {});
            if (res.success === true) {
                swal("修改成功", "", "success");
            } else if (res.success === false) {
                swal('修改失败', res.msg, 'warning');
            }
            dispatch(getAppList());
        }
    });
};