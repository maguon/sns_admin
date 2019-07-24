import {apiHost} from '../../config/HostConfig';

const httpUtil = require('../../utils/HttpUtil');
const localUtil = require('../../utils/LocalUtil');
const sysConst = require('../../utils/SysConst');

export const login = (params) => async () => {
    try {
        const res = await httpUtil.httpPost(apiHost + '/api/adminLogin', params);
        if (res.success === true) {
            localUtil.setSessionItem(sysConst.USER_ID, res.result.adminId);
            localUtil.setSessionItem(sysConst.USER_TYPE, res.result.type);
            localUtil.setSessionItem(sysConst.AUTH_TOKEN, res.result.accessToken);
            window.location.href = '/index.html';
        } else if (res.success === false) {
            swal("登陆失败", res.msg, "warning");
        }
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};