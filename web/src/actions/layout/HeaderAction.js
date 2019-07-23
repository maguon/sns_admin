import {HeaderActionType} from '../../types';
import {apiHost} from '../../config/HostConfig';
import swal from 'sweetalert';

const sysConst = require('../../utils/SysConst');
const httpUtil = require('../../utils/HttpUtil');
const localUtil = require('../../utils/LocalUtil');

export const getUserDetail = (params) => async (dispatch) => {
    try {
        // admin用户 检索 URL
        const url = apiHost + '/api/admin?adminId=' + params.userId;

        // 发送 get 请求
        const res = await httpUtil.httpGet(url);
        if (res.success === true) {
            dispatch({type: HeaderActionType.getUserInfo, payload: res.result[0]})
        } else if (res.success === false) {
            swal('查询失败', res.msg, 'warning');
        }
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};

export const logout = () => async () => {
    swal({
        title: "注销账号",
        text: "是否确认退出登录",
        icon: "warning",
        buttons: {
            cancel: '取消',
            confirm: '确定',
        },
    }).then((value) => {
        if (value) {
            localUtil.removeSessionStore(sysConst.USER_ID);
            localUtil.removeSessionStore(sysConst.USER_TYPE);
            localUtil.removeSessionStore(sysConst.AUTH_TOKEN);
            window.location.href = '/login.html';
        }
    });
};