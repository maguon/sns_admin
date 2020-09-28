import {apiHost} from '../../config/HostConfig';
import {CommonActionType} from '../../types';

const httpUtil = require('../../utils/HttpUtil');
const localUtil = require('../../utils/LocalUtil');
const sysConst = require('../../utils/SysConst');

// 取得登录用户详细信息
export const getLoginUserInfo = (params) => async (dispatch) => {
    try {
        // admin用户 检索 URL
        const url = apiHost + '/api/admin/' + localUtil.getSessionItem(sysConst.LOGIN_USER_ID)
            + '/adminUser?adminUserId=' + params.userId;

        // 发送 get 请求
        const res = await httpUtil.httpGet(url);
        if (res.success === true) {
            dispatch({type: CommonActionType.getLoginUserInfo, payload: res.result[0]})
        } else if (res.success === false) {
            swal('查询失败', res.msg, 'warning');
        }
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};

// 取得登录用户权限菜单
export const getLoginUserMenu = () => async (dispatch) => {
    try {
        // admin用户 检索 URL
        const url = apiHost + '/api/admin/' + localUtil.getSessionItem(sysConst.LOGIN_USER_ID) + '/menuList';

        // 发送 get 请求
        const res = await httpUtil.httpGet(url);
        if (res.success === true) {
            dispatch({type: CommonActionType.getLoginUserMenu, payload: res.result[0].menu_list})
        } else if (res.success === false) {
            swal('查询失败', res.msg, 'warning');
        }
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};

// 退出登录
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
            localUtil.removeSessionStore(sysConst.LOGIN_USER_ID);
            localUtil.removeSessionStore(sysConst.LOGIN_USER_TYPE);
            localUtil.removeSessionStore(sysConst.AUTH_TOKEN);
            window.location.href = '/login.html';
        }
    });
};

// 取得 用户列表 (根据电话模糊查询)
export const getUserListByPhone = (phoneReg) => async (dispatch) => {
    try {
        const url = apiHost + '/api/admin/' + localUtil.getSessionItem(sysConst.LOGIN_USER_ID) + '/user?phoneReg=' + phoneReg;
        const res = await httpUtil.httpGet(url);
        if (res.success === true) {
            dispatch({type: CommonActionType.getUserByPhoneList, payload: res.result});
        } else if (res.success === false) {
            swal('获取用户信息失败', res.msg, 'warning');
        }
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};

// 取得App版本号列表
export const getAppVersionList = (deviceType) => async (dispatch) => {
    try {
        const url = apiHost + '/api/admin/' + localUtil.getSessionItem(sysConst.LOGIN_USER_ID) + '/app?deviceType=' + deviceType;
        const res = await httpUtil.httpGet(url);
        if (res.success === true) {
            dispatch({type: CommonActionType.getAppVersionList, payload: res.result})
        } else if (res.success === false) {
            swal('获取App版本列表失败', res.msg, 'warning');
        }
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};

// 取得Fake用户列表
export const getFakeUserList = () => async (dispatch) => {
    try {
        const url = apiHost + '/api/admin/' + localUtil.getSessionItem(sysConst.LOGIN_USER_ID) + '/fakeUser';
        const res = await httpUtil.httpGet(url);
        if (res.success === true) {
            dispatch({type: CommonActionType.getFakeUserList, payload: res.result})
        } else if (res.success === false) {
            swal('获取Fake用户列表失败', res.msg, 'warning');
        }
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};

// export const getOrderCarList = (orderId) => async (dispatch) => {
//     try {
//         // 基本检索URL
//         let url = apiHost + '/api/admin/' + localUtil.getSessionItem(sysConst.LOGIN_USER_ID)
//             + '/orderItem?orderId=' + orderId;
//         const res = await httpUtil.httpGet(url);
//         if (res.success === true) {
//             dispatch({type: CommonActionType.getOrderCarList, payload: res.result});
//             // 估值
//             let totalValuation = 0;
//             // 实际运费
//             let totalActFreight = 0;
//             // 实际保费
//             let totalInsuranceFee = 0;
//             for (let i = 0; i < res.result.length; i++) {
//                 totalValuation = totalValuation + res.result[i].valuation;
//                 totalActFreight = totalActFreight + res.result[i].act_trans_price;
//                 totalInsuranceFee = totalInsuranceFee + res.result[i].act_insure_price;
//             }
//             dispatch({type: CommonActionType.setTotalValuation, payload: totalValuation});
//             dispatch({type: CommonActionType.setTotalActFreight, payload: totalActFreight});
//             dispatch({type: CommonActionType.setTotalInsuranceFee, payload: totalInsuranceFee});
//         } else if (res.success === false) {
//             swal('获取订单车辆详细信息失败', res.msg, 'warning');
//         }
//     } catch (err) {
//         swal('操作失败', err.message, 'error');
//     }
// };
//
// // 检索订单 支付信息列表(已支付)
// export const getOrderPaymentList = (orderId) => async (dispatch) => {
//     try {
//         // 基本检索URL 已支付
//         let url = apiHost + '/api/admin/' + localUtil.getSessionItem(sysConst.LOGIN_USER_ID)
//             + '/payment?orderId=' + orderId + '&status=' + sysConst.PAYMENT_STATUS[1].value;
//         const res = await httpUtil.httpGet(url);
//         if (res.success === true) {
//             dispatch({type: CommonActionType.getOrderPaymentList, payload: res.result});
//             // 支付金额
//             let totalPayment = 0;
//             // 退款金额
//             let totalRefund = 0;
//             res.result.forEach((item) => {
//                 // 退款
//                 if (item.type === sysConst.PAYMENT_TYPE[0].value) {
//                     totalRefund = totalRefund + item.total_fee;
//                 } else {
//                     totalPayment = totalPayment + item.total_fee;
//                 }
//             });
//             dispatch({type: CommonActionType.setOrderTotalPayment, payload: totalPayment});
//             dispatch({type: CommonActionType.setOrderTotalRefund, payload: totalRefund});
//         } else if (res.success === false) {
//             swal('获取订单支付详细信息失败', res.msg, 'warning');
//         }
//     } catch (err) {
//         swal('操作失败', err.message, 'error');
//     }
// };