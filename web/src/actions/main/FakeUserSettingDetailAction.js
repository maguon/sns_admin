import {apiHost} from '../../config/HostConfig';
import {FakeUserSettingDetailActionType} from "../../types";

const httpUtil = require('../../utils/HttpUtil');
const localUtil = require('../../utils/LocalUtil');
const sysConst = require('../../utils/SysConst');

export const getFakeUserInfo = (id) => async (dispatch) => {
    try {
        // 基本检索URL
        let url = apiHost + '/api/admin/' + localUtil.getSessionItem(sysConst.LOGIN_USER_ID)
            + '/fakeUser?userId=' + id;
        const res = await httpUtil.httpGet(url);
        if (res.success === true) {
            if (res.result.length > 0) {
                dispatch({type: FakeUserSettingDetailActionType.setFakeUserId, payload: res.result[0]._id});
                dispatch({type: FakeUserSettingDetailActionType.setPhone, payload: res.result[0].phone});
                if (res.result[0].user_detail_info.length > 0) {
                    dispatch({type: FakeUserSettingDetailActionType.setNickName, payload: res.result[0].user_detail_info[0].nick_name});
                    dispatch({type: FakeUserSettingDetailActionType.setRealName, payload: res.result[0].user_detail_info[0].real_name});
                    dispatch({type: FakeUserSettingDetailActionType.setGender, payload: res.result[0].user_detail_info[0].sex});
                    dispatch({type: FakeUserSettingDetailActionType.setRemark, payload: res.result[0].user_detail_info[0].intro});
                }
            }
        } else if (res.success === false) {
            swal('获取Fake用户详细信息失败', res.msg, 'warning');
        }
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};

export const saveFakeUser = () => async (dispatch, getState) => {
    try {
        // 编号
        const fakeUserId = getState().FakeUserSettingDetailReducer.fakeUserId;
        // 昵称
        const nickName = getState().FakeUserSettingDetailReducer.nickName.trim();
        // 真实姓名
        const realName = getState().FakeUserSettingDetailReducer.realName.trim();
        // 性别
        const gender = getState().FakeUserSettingDetailReducer.gender;
        // 备注
        const remark = getState().FakeUserSettingDetailReducer.remark.trim();

        const params = {
            nickName: nickName,
            realName: realName,
            sex: gender,
            intro: remark
        };
        // 基本url
        let url = apiHost + '/api/admin/' + localUtil.getSessionItem(sysConst.LOGIN_USER_ID)
            + '/fakeUser/' + fakeUserId + '/fakeUserDetail';
        let res = await httpUtil.httpPut(url, params);
        if (res.success === true) {
            swal("保存成功", "", "success");
            dispatch(getFakeUserInfo(fakeUserId));
        } else if (res.success === false) {
            swal('保存失败', res.msg, 'warning');
        }
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};