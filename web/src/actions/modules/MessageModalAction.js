import {apiHost} from '../../config/HostConfig';
import {MessageModalActionType} from "../../types";

const httpUtil = require('../../utils/HttpUtil');
const localUtil = require('../../utils/LocalUtil');
const sysConst = require('../../utils/SysConst');
const formatUtil = require('../../utils/FormatUtil');
const messageManagerAction = require('../../actions/main/MessageManagerAction');

// 新增员工画面 初期
export const initNewMessageModal = (pageType, messageDetail) => async (dispatch) => {
    // 画面区分
    dispatch({type: MessageModalActionType.setPageType, payload: pageType});
    if (pageType === 'new') {
        // 消息用户类型
        dispatch({type: MessageModalActionType.setMsgUserType, payload: {value: 2, label: "单个用户"}});
        // 手机
        dispatch({type: MessageModalActionType.setPhone, payload: ''});
        // 消息内容
        dispatch({type: MessageModalActionType.setMsgContent, payload: ''});
    } else {
        // 接收人昵称
        dispatch({
            type: MessageModalActionType.setMsgUserNickName,
            payload: messageDetail.user_detail_info[0].nick_name
        });
        // 接收人ID
        dispatch({type: MessageModalActionType.setMsgUserId, payload: messageDetail.user_login_info[0]._id});
        // 接收人手机
        dispatch({type: MessageModalActionType.setPhone, payload: messageDetail.user_login_info[0].phone});
        // 消息内容
        dispatch({type: MessageModalActionType.setMsgContent, payload: messageDetail.info});
        // 发布时间
        dispatch({
            type: MessageModalActionType.setMsgCreateDate,
            payload: formatUtil.getDateTime(messageDetail.created_at)
        });
    }
};

export const saveMessage = () => async (dispatch, getState) => {
    try {
        // 画面区分
        const pageType = getState().MessageModalReducer.pageType;
        // 消息用户类型
        const msgUserType = getState().MessageModalReducer.msgUserType;
        // 手机
        const phone = getState().MessageModalReducer.phone.trim();
        // 用户ID
        const userId = phone.substr(0, 24);
        // 消息内容
        const msgContent = getState().MessageModalReducer.msgContent;

        if (phone === '' || msgContent === '') {
            swal('保存失败', '请输入完整的消息信息！', 'warning');
        } else {
            const params = {
                type: msgUserType === null ? '' : msgUserType.value,
                // 用户ID
                _userId: userId,
                // 消息内容
                info: msgContent
            };
            // 基本url
            let url = apiHost + '/api/admin/' + localUtil.getSessionItem(sysConst.LOGIN_USER_ID) + "/systemMessage";
            let res = await httpUtil.httpPost(url, params);
            if (res.success === true) {
                $('#messageModal').modal('close');
                swal("保存成功", "", "success");
                // 刷新用户管理 一览画面
                dispatch(messageManagerAction.getMessageList());
            } else if (res.success === false) {
                swal('保存失败', res.msg, 'warning');
            }
        }
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};