import {apiHost} from '../../config/HostConfig';
import {NewAdminModalActionType} from "../../types";

const httpUtil = require('../../utils/HttpUtil');
const localUtil = require('../../utils/LocalUtil');
const sysConst = require('../../utils/SysConst');

const adminUserSettingAction = require('../../actions/main/AdminUserSettingAction');

// 新增员工画面 初期
export const initNewAdminModal = () => async (dispatch) => {
    // 管理员名称
    dispatch({type: NewAdminModalActionType.setAdminName, payload: ''});
    // 真实姓名
    dispatch({type: NewAdminModalActionType.setAdminRealName, payload: ''});
    // 手机
    dispatch({type: NewAdminModalActionType.setPhone, payload: ''});
    // 密码
    dispatch({type: NewAdminModalActionType.setPassword, payload: ''});
    // 性别 默认为男：1
    dispatch({type: NewAdminModalActionType.setAdminGender, payload: 1});
};

export const saveAdmin = () => async (dispatch, getState) => {
    try {
        // 管理员名称
        const name = getState().NewAdminModalReducer.name.trim();
        // 真实姓名
        const realName = getState().NewAdminModalReducer.realName.trim();
        // 手机
        const phone = getState().NewAdminModalReducer.phone.trim();
        // 密码
        const password = getState().NewAdminModalReducer.password.trim();
        // 性别
        const gender = getState().NewAdminModalReducer.gender;

        if (name === '' || phone === '' || password === '') {
            swal('保存失败', '请输入完整的员工信息！', 'warning');
        } else {
            const params = {
                name: name,
                realname: realName,
                phone: phone,
                password: password,
                gender: gender,
                // 状态(0-停用,1-可用) TODO
                status: 1,
                type: 0
            };
            // 基本url
            let url = apiHost + '/api/admin/' + localUtil.getSessionItem(sysConst.USER_ID) + "/adminUser";
            let res = await httpUtil.httpPost(url, params);
            if (res.success === true) {
                $('#newAdminModal').modal('close');
                swal("保存成功", "", "success");
                dispatch(adminUserSettingAction.getAdminList());
            } else if (res.success === false) {
                swal('保存失败', res.msg, 'warning');
            }
        }
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};