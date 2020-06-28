import {apiHost} from '../../config/HostConfig';
import {NewFakeUserModalActionType} from "../../types";

const httpUtil = require('../../utils/HttpUtil');
const localUtil = require('../../utils/LocalUtil');
const sysConst = require('../../utils/SysConst');

const fakeUserSettingAction = require('../../actions/main/FakeUserSettingAction');

// 新增Fake用户画面 初期
export const initNewFakeUserModal = () => async (dispatch) => {
    // 昵称
    dispatch({type: NewFakeUserModalActionType.setNickName, payload: ''});
    // 真实姓名
    dispatch({type: NewFakeUserModalActionType.setRealName, payload: ''});
    // 手机
    dispatch({type: NewFakeUserModalActionType.setPhone, payload: ''});
    // 密码
    dispatch({type: NewFakeUserModalActionType.setPassword, payload: ''});
    // 性别 默认为男：1
    dispatch({type: NewFakeUserModalActionType.setGender, payload: 1});
    // 备注
    dispatch({type: NewFakeUserModalActionType.setRemark, payload: ''});
};

export const saveFakeUser = () => async (dispatch, getState) => {
    try {
        // 手机
        const phone = getState().NewFakeUserModalReducer.phone.trim();
        // 密码
        const password = getState().NewFakeUserModalReducer.password.trim();
        // 性别
        const gender = getState().NewFakeUserModalReducer.gender;
        // 昵称
        const name = getState().NewFakeUserModalReducer.name.trim();
        // 真实姓名
        const realName = getState().NewFakeUserModalReducer.realName.trim();
        // 备注
        const remark = getState().NewFakeUserModalReducer.remark.trim();

        if (name === '' || phone === '' || password === '') {
            swal('保存失败', '请输入完整的Fake用户信息！', 'warning');
        } else {
            const params = {
                phone: phone,
                password: password,
                sex: gender,
                nickName: name,
                realName: realName,
                intro: remark
            };
            // 基本url
            let url = apiHost + '/api/admin/' + localUtil.getSessionItem(sysConst.LOGIN_USER_ID) + "/fakeUser";
            let res = await httpUtil.httpPost(url, params);
            if (res.success === true) {
                $('#newFakeUserModal').modal('close');
                swal("保存成功", "", "success");
                dispatch(fakeUserSettingAction.getFakeUserList());
            } else if (res.success === false) {
                swal('保存失败', res.msg, 'warning');
            }
        }
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};