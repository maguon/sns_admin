import {apiHost} from '../../config/HostConfig';
import {AppVersionDetailActionType} from "../../types";

const httpUtil = require('../../utils/HttpUtil');
const localUtil = require('../../utils/LocalUtil');
const sysConst = require('../../utils/SysConst');
const commonUtil = require('../../utils/CommonUtil');

export const getAppInfo = (appId) => async (dispatch) => {
    try {
        // 基本检索URL
        let url = apiHost + '/api/admin/' + localUtil.getSessionItem(sysConst.LOGIN_USER_ID)
            + '/app?appId=' + appId;
        const res = await httpUtil.httpGet(url);
        if (res.success === true) {
            if (res.result.length > 0) {
                dispatch({type: AppVersionDetailActionType.setAppId, payload: res.result[0]._id});
                dispatch({type: AppVersionDetailActionType.setAppStatus, payload: res.result[0].status});

                dispatch({type: AppVersionDetailActionType.setAppType, payload: {value: res.result[0].app_type,
                        label: commonUtil.getJsonValue(sysConst.APP_TYPE, res.result[0].app_type)}});
                dispatch({type: AppVersionDetailActionType.setDeviceType, payload: {value: res.result[0].device_type,
                        label: commonUtil.getJsonValue(sysConst.SYSTEM_TYPE, res.result[0].device_type)}});
                dispatch({type: AppVersionDetailActionType.setForceUpdate, payload: {value: res.result[0].force_update,
                        label: commonUtil.getJsonValue(sysConst.FORCE_UPDATE, res.result[0].force_update)}});

                dispatch({type: AppVersionDetailActionType.setVersion, payload: res.result[0].version});
                dispatch({type: AppVersionDetailActionType.setVersionNum, payload: res.result[0].version_num});
                dispatch({type: AppVersionDetailActionType.setMinVersionNum, payload: res.result[0].min_version_num});

                dispatch({type: AppVersionDetailActionType.setUrl, payload: res.result[0].url});
                dispatch({type: AppVersionDetailActionType.setRemark, payload: res.result[0].remarks});
            }
        } else if (res.success === false) {
            swal('获取App详细信息失败', res.msg, 'warning');
        }
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};

export const changeAppStatus = (id, status) => async (dispatch) => {
    swal({
        title: status === 1 ? "确定停用该App版本？" : "确定重新启用该App版本？",
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
                + '/app/' + id + '/status';
            const res = await httpUtil.httpPut(url, {status: newStatus});
            if (res.success === true) {
                swal("修改成功", "", "success");
                dispatch(getAppInfo(id));
            } else if (res.success === false) {
                swal('修改失败', res.msg, 'warning');
            }
        }
    });
};

export const saveApp = () => async (dispatch, getState) => {
    try {
        // app编号
        const appId = getState().AppVersionDetailReducer.appId;

        // app类型(1-司机之家)
        const appType = getState().AppVersionDetailReducer.appType;
        // 系统类型(1-安卓 2-苹果)
        const deviceType = getState().AppVersionDetailReducer.deviceType;
        // 强制更新
        const forceUpdate = getState().AppVersionDetailReducer.forceUpdate;
        // 版本号
        const version = getState().AppVersionDetailReducer.version.trim();
        // 版本序号
        const versionNum = getState().AppVersionDetailReducer.versionNum;
        // 最低版本号
        const minVersionNum = getState().AppVersionDetailReducer.minVersionNum;
        // 下载地址
        const downloadUrl = getState().AppVersionDetailReducer.url.trim();
        // 备注
        const remarks = getState().AppVersionDetailReducer.remark.trim();

        if (version === '' || versionNum === '' || minVersionNum === '' || downloadUrl === '') {
            swal('保存失败', '请输入完整的App信息！', 'warning');
        } else {
            const params = {
                appType: appType.value,
                deviceType: deviceType.value,
                version: version,
                versionNum: versionNum,
                minVersionNum: minVersionNum,
                forceUpdate: forceUpdate.value,
                url: downloadUrl,
                remarks: remarks
            };
            // 基本url
            let url = apiHost + '/api/admin/' + localUtil.getSessionItem(sysConst.LOGIN_USER_ID)
                + '/app/' + appId;
            let res = await httpUtil.httpPut(url, params);
            if (res.success === true) {
                swal("保存成功", "", "success");
                dispatch(getAppInfo(appId));
            } else if (res.success === false) {
                swal('保存失败', res.msg, 'warning');
            }
        }
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};