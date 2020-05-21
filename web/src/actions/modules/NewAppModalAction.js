import {apiHost} from '../../config/HostConfig';
import {NewAppModalActionType} from "../../types";

const httpUtil = require('../../utils/HttpUtil');
const localUtil = require('../../utils/LocalUtil');
const sysConst = require('../../utils/SysConst');

const appVersionAction = require('../../actions/main/AppVersionAction');

// 新增App画面 初期
export const initNewAppModal = () => async (dispatch) => {
    dispatch({type: NewAppModalActionType.setAppType, payload: null});
    dispatch({type: NewAppModalActionType.setDeviceType, payload: null});
    dispatch({type: NewAppModalActionType.setForceUpdate, payload: null});
    dispatch({type: NewAppModalActionType.setVersion, payload: ''});
    dispatch({type: NewAppModalActionType.setVersionNum, payload: ''});
    dispatch({type: NewAppModalActionType.setMinVersionNum, payload: ''});
    dispatch({type: NewAppModalActionType.setUrl, payload: ''});
    dispatch({type: NewAppModalActionType.setRemark, payload: ''});
};

export const saveApp = () => async (dispatch, getState) => {
    try {
        // app类型(1-司机之家)
        const appType = getState().NewAppModalReducer.appType;
        // 系统类型(1-安卓 2-苹果)
        const deviceType = getState().NewAppModalReducer.deviceType;
        // 强制更新
        const forceUpdate = getState().NewAppModalReducer.forceUpdate;
        // 版本号
        const version = getState().NewAppModalReducer.version.trim();
        // 版本序号
        const versionNum = getState().NewAppModalReducer.versionNum;
        // 最低版本号
        const minVersionNum = getState().NewAppModalReducer.minVersionNum;
        // 下载地址
        const downloadUrl = getState().NewAppModalReducer.url.trim();
        // 备注
        const remarks = getState().NewAppModalReducer.remark.trim();

        if (appType == null || deviceType == null || forceUpdate == null ||
            version === '' || versionNum === '' || minVersionNum === '' || downloadUrl === '') {
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
            let url = apiHost + '/api/admin/' + localUtil.getSessionItem(sysConst.LOGIN_USER_ID) + "/app";
            let res = await httpUtil.httpPost(url, params);
            if (res.success === true) {
                $('#newAppModal').modal('close');
                swal("保存成功", "", "success");
                dispatch(appVersionAction.getAppList());
            } else if (res.success === false) {
                swal('保存失败', res.msg, 'warning');
            }
        }
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};