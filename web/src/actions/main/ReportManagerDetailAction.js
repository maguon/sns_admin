import {apiHost} from '../../config/HostConfig';
import {ReportManagerDetailActionType} from '../../types';

const httpUtil = require('../../utils/HttpUtil');
const localUtil = require('../../utils/LocalUtil');
const sysConst = require('../../utils/SysConst');
const commonUtil = require('../../utils/CommonUtil');

// 获取举报信息
export const getReportInfo = (reportId) => async (dispatch) => {
    try {
        // 基本检索URL
        let url = apiHost + '/api/admin/' + localUtil.getSessionItem(sysConst.LOGIN_USER_ID)
            + '/report?reportId=' + reportId;
        const res = await httpUtil.httpGet(url);
        if (res.success === true) {
            dispatch({type: ReportManagerDetailActionType.getReportInfo, payload: res.result});
            if (res.result.length > 0) {
                dispatch(getArticleInfo(res.result[0]._msg_id));
                // 消息用户类型
                dispatch({type: ReportManagerDetailActionType.setValidResults, payload: {value: res.result[0].valid_results,
                        label: commonUtil.getJsonValue(sysConst.REPORT_VALID_RESULT, res.result[0].valid_results)}});
                // 处理意见
                dispatch({type: ReportManagerDetailActionType.setReportReview, payload: res.result[0].review});
            }
        } else if (res.success === false) {
            swal('获取举报信息失败', res.msg, 'warning');
        }
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};

// 获取文章信息
export const getArticleInfo = (msgId) => async (dispatch) => {
    try {
        // 基本检索URL
        let url = apiHost + '/api/admin/' + localUtil.getSessionItem(sysConst.LOGIN_USER_ID)
            + '/msg?msgId=' + msgId;
        const res = await httpUtil.httpGet(url);
        if (res.success === true) {
            dispatch({type: ReportManagerDetailActionType.getArticleInfo, payload: res.result});
        } else if (res.success === false) {
            swal('获取文章信息失败', res.msg, 'warning');
        }
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};

// 处理举报
export const confirmReport = (reportId, msgId) => async (dispatch, getState) => {
    // 处理结果
    const validResults = getState().ReportManagerDetailReducer.validResults;
    // 处理意见
    const reportReview = getState().ReportManagerDetailReducer.reportReview.trim();
    if (reportReview === '') {
        swal('处理失败', '请输入处理意见！', 'warning');
    } else {
        swal({
            title: '确定处理该举报',
            text: "",
            icon: "warning",
            buttons: {
                cancel: '取消',
                confirm: '确定',
            },
        }).then(async function (isConfirm) {
            if (isConfirm) {
                const url = apiHost + '/api/admin/' + localUtil.getSessionItem(sysConst.LOGIN_USER_ID)
                    + '/report/' + reportId;
                const res = await httpUtil.httpPut(url, {validResults: validResults.value, review : reportReview});
                if (res.success === true) {
                    swal("处理成功", "", "success");
                    dispatch(getReportInfo(reportId));
                    // 举报有效则屏蔽文章
                    if (validResults.value === sysConst.REPORT_VALID_RESULT[0].value) {
                        dispatch(hideArticle(msgId));
                    }
                } else if (res.success === false) {
                    swal('处理失败', res.msg, 'warning');
                }
            }
        });
    }
};

export const hideArticle = (msgId) => async (dispatch) => {
    const url = apiHost + '/api/admin/' + localUtil.getSessionItem(sysConst.LOGIN_USER_ID)
        + '/msg/' + msgId + '/status';
    const res = await httpUtil.httpPut(url, {status: sysConst.ARTICLE_STATUS[0].value});
    if (res.success === false) {
        swal('屏蔽文章失败，请去文章管理再次处理', res.msg, 'warning');
    }
};