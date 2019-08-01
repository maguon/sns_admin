import {apiHost} from '../../config/HostConfig';
import {AdminUserSettingDetailActionType} from "../../types";

const httpUtil = require('../../utils/HttpUtil');
const localUtil = require('../../utils/LocalUtil');
const sysConst = require('../../utils/SysConst');

export const getAdminInfo = (adminId) => async (dispatch) => {
    try {
        // 基本检索URL
        let url = apiHost + '/api/admin/' + localUtil.getSessionItem(sysConst.USER_ID)
            + '/adminUser?type=0&adminUserId=' + adminId;
        const res = await httpUtil.httpGet(url);
        if (res.success === true) {
            if (res.result.length > 0) {
                dispatch({type: AdminUserSettingDetailActionType.setAdminId, payload: res.result[0]._id});
                dispatch({type: AdminUserSettingDetailActionType.setAdminStatus, payload: res.result[0].status});
                dispatch({type: AdminUserSettingDetailActionType.setPhone, payload: res.result[0].phone});
                dispatch({type: AdminUserSettingDetailActionType.setAdminName, payload: res.result[0].name});
                dispatch({type: AdminUserSettingDetailActionType.setAdminRealName, payload: res.result[0].realname});
                dispatch({type: AdminUserSettingDetailActionType.setAdminGender, payload: res.result[0].gender});
            }
        } else if (res.success === false) {
            swal('获取员工详细信息失败', res.msg, 'warning');
        }
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};

export const changeAdminStatus = (id, status) => async (dispatch) => {
    swal({
        title: status === 1 ? "确定停用该员工？" : "确定重新启用该员工？",
        text: "是否确认退出登录",
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

            const url = apiHost + '/api/admin/' + localUtil.getSessionItem(sysConst.USER_ID)
                + '/adminUser/' + id + '/status';
            const res = await httpUtil.httpPut(url, {status: newStatus});
            if (res.success === true) {
                swal("修改成功", "", "success");
                dispatch(getAdminInfo(id));
            } else if (res.success === false) {
                swal('修改失败', res.msg, 'warning');
            }
        }
    });
};

export const saveAdmin = () => async (dispatch, getState) => {
    try {
        // 员工编号
        const adminId = getState().AdminUserSettingDetailReducer.adminId;
        // 姓名
        const adminName = getState().AdminUserSettingDetailReducer.adminName.trim();
        // 姓名
        const realName = getState().AdminUserSettingDetailReducer.realName.trim();
        // 性别
        const gender = getState().AdminUserSettingDetailReducer.gender;

        const params = {
            name: adminName,
            realname: realName,
            gender: gender,
        };
        // 基本url
        let url = apiHost + '/api/admin/' + localUtil.getSessionItem(sysConst.USER_ID)
            + '/adminUser/' + adminId;
        let res = await httpUtil.httpPut(url, params);
        if (res.success === true) {
            swal("保存成功", "", "success");
            dispatch(getAdminInfo(adminId));
        } else if (res.success === false) {
            swal('保存失败', res.msg, 'warning');
        }
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};