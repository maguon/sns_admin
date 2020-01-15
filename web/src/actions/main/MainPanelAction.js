import {apiHost} from '../../config/HostConfig';
import {MainPanelActionType} from '../../types';

const httpUtil = require('../../utils/HttpUtil');
const localUtil = require('../../utils/LocalUtil');
const sysConst = require('../../utils/SysConst');

// 今日新增用户数
export const getTodayUserCount = () => async (dispatch) => {
    try {
        // 基本检索URL
        let url = apiHost + '/api/admin/' + localUtil.getSessionItem(sysConst.LOGIN_USER_ID) + '/userTodayCount';
        const res = await httpUtil.httpGet(url);
        if (res.success === true) {
            // 今日新增用户数
            dispatch({type: MainPanelActionType.setTodayUserCount, payload: res.result});
        } else if (res.success === false) {
            swal('获取今日新增用户数失败', res.msg, 'warning');
        }
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};

// 今日发布文章/求助
export const getTodayMsgCount = () => async (dispatch) => {
    try {
        // 基本检索URL
        let url = apiHost + '/api/admin/' + localUtil.getSessionItem(sysConst.LOGIN_USER_ID) + '/todayMsgCount';
        const res = await httpUtil.httpGet(url);
        if (res.success === true) {
            if (res.result.length === 2) {
                // 今日发布文章
                dispatch({type: MainPanelActionType.setTodayArticle, payload: res.result[0].count});
                // 今日发布求助
                dispatch({type: MainPanelActionType.setTodayHelp, payload: res.result[1].count});
            }
        } else if (res.success === false) {
            swal('获取今日发布文章/求助数失败', res.msg, 'warning');
        }
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};

// 今日评论/解答
export const getTodayMsgCommentCount = () => async (dispatch) => {
    try {
        // 基本检索URL
        let url = apiHost + '/api/admin/' + localUtil.getSessionItem(sysConst.LOGIN_USER_ID) + '/todayMsgCommentCount';
        const res = await httpUtil.httpGet(url);
        if (res.success === true) {
            if (res.result.length === 2) {
                // 今日发布评论
                dispatch({type: MainPanelActionType.setTodayComment, payload: res.result[0].count});
                // 今日发布解答
                dispatch({type: MainPanelActionType.setTodayAnswer, payload: res.result[1].count});
            }
        } else if (res.success === false) {
            swal('获取今日评论/解答数失败', res.msg, 'warning');
        }
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};