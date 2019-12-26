import {apiHost} from '../../config/HostConfig';
import {MessageModalActionType} from "../../types";
import MessageModalReducer from "../../reducers/modules/MessageModalReducer";

const httpUtil = require('../../utils/HttpUtil');
const localUtil = require('../../utils/LocalUtil');
const sysConst = require('../../utils/SysConst');

const adminUserSettingAction = require('../../actions/main/AdminUserSettingAction');

// 新增员工画面 初期
export const initNewMessageModal = (pageType, messageDetail) => async (dispatch) => {
    console.log('pageType',pageType);
    console.log('messageDetail',messageDetail);
    // 画面区分
    dispatch({type: MessageModalActionType.setPageType, payload: pageType});
    if (pageType === 'new') {
        // 消息用户类型
        dispatch({type: MessageModalActionType.setMsgUserType, payload: {value: 2, label: "单个用户"}});
        // 手机
        dispatch({type: MessageModalActionType.setPhone, payload: '1111'});
        // 消息内容
        dispatch({type: MessageModalActionType.setMsgContent, payload: ''});
    } else {

    }
};

export const saveMessage = () => async (dispatch, getState) => {
    try {
        // 画面区分
        const pageType = getState().MessageModalReducer.pageType;
        // 消息用户类型
        const msgUserType = getState().MessageModalReducer.msgUserType;
        // 手机
        const phone = getState().MessageModalReducer.phone;
        // 消息内容
        const msgContent = getState().MessageModalReducer.msgContent;

        console.log('pageType',pageType);
        console.log('msgUserType',msgUserType);
        console.log('phone',phone);
        console.log('msgContent',msgContent);

        // if (name === '' || phone === '' || password === '') {
        //     swal('保存失败', '请输入完整的员工信息！', 'warning');
        // } else {
        //     const params = {
        //         name: name,
        //         realname: realName,
        //         phone: phone,
        //         password: password,
        //         gender: gender,
        //         // 状态(0-停用,1-可用) TODO
        //         status: 1,
        //         type: 0
        //     };
        //     // 基本url
        //     let url = apiHost + '/api/admin/' + localUtil.getSessionItem(sysConst.LOGIN_USER_ID) + "/adminUser";
        //     let res = await httpUtil.httpPost(url, params);
        //     if (res.success === true) {
        //         $('#messageModal').modal('close');
        //         swal("保存成功", "", "success");
        //         dispatch(adminUserSettingAction.getAdminList());
        //     } else if (res.success === false) {
        //         swal('保存失败', res.msg, 'warning');
        //     }
        // }
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};