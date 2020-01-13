import {apiHost} from '../../config/HostConfig';
import {ArticleManagerActionType} from '../../types';

const httpUtil = require('../../utils/HttpUtil');
const localUtil = require('../../utils/LocalUtil');
const sysConst = require('../../utils/SysConst');

export const getArticleList = () => async (dispatch, getState) => {
    try {
        // 检索条件：开始位置
        const start = getState().ArticleManagerReducer.start;
        // 检索条件：每页数量
        const size = getState().ArticleManagerReducer.size;

        // 检索条件：文章编号
        const conditionArticleId = getState().ArticleManagerReducer.conditionArticleId.trim();
        // 检索条件：作者昵称
        const conditionNickName = getState().ArticleManagerReducer.conditionNickName.trim();
        // 检索条件：文章类型
        const conditionType = getState().ArticleManagerReducer.conditionType;
        // 检索条件：载体类型
        const conditionCarrier = getState().ArticleManagerReducer.conditionCarrier;
        // 检索条件：发布时间
        const conditionCreatedOnStart = getState().ArticleManagerReducer.conditionCreatedOnStart;
        const conditionCreatedOnEnd = getState().ArticleManagerReducer.conditionCreatedOnEnd;

        // 基本检索URL
        let url = apiHost + '/api/admin/' + localUtil.getSessionItem(sysConst.LOGIN_USER_ID)
            + '/msg?start=' + start + '&size=' + size;
        // 检索条件
        let conditionsObj = {
            // 检索条件：文章编号
            msgId: conditionArticleId,
            // 检索条件：作者昵称
            nickName: conditionNickName,
            // 检索条件：文章类型
            type: conditionType === null ? '' : conditionType.value,
            // 检索条件：载体类型
            carrier: conditionCarrier === null ? '' : conditionCarrier.value,
            // 检索条件：发布时间
            createDateStart: conditionCreatedOnStart,
            createDateEnd: conditionCreatedOnEnd
        };

        let conditions = httpUtil.objToUrl(conditionsObj);
        // 检索URL
        url = conditions.length > 0 ? url + "&" + conditions : url;
        console.log('',url);
        const res = await httpUtil.httpGet(url);
        console.log('',res);
        if (res.success === true) {
            dispatch({type: ArticleManagerActionType.setDataSize, payload: res.result.length});
            dispatch({type: ArticleManagerActionType.getArticleList, payload: res.result.slice(0, size - 1)});
            console.log('',res.result);
        } else if (res.success === false) {
            swal('获取文章列表信息失败', res.msg, 'warning');
        }
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};

export const deleteArticle = (id) => async (dispatch) => {
    swal({
        title: "确定删除该文章？",
        text: "",
        icon: "warning",
        buttons: {
            cancel: '取消',
            confirm: '确定',
        },
    }).then(async function (isConfirm) {
        if (isConfirm) {
            const url = apiHost + '/api/admin/' + localUtil.getSessionItem(sysConst.LOGIN_USER_ID)
                + '/msg/' + id + '/del';
            const res = await httpUtil.httpDelete(url, {});
            if (res.success === true) {
                swal("修改成功", "", "success");
            } else if (res.success === false) {
                swal('修改失败', res.msg, 'warning');
            }
            dispatch(getArticleList());
        }
    });
};

export const changeArticleStatus = (id, status) => async (dispatch) => {
    swal({
        title: status === 1 ? "确定屏蔽该文章？" : "确定重新显示该文章？",
        text: "",
        icon: "warning",
        buttons: {
            cancel: '取消',
            confirm: '确定',
        },
    }).then(async function (isConfirm) {
        if (isConfirm) {
            // 状态
            let newStatus = 0;
            if (status === 0) {
                newStatus = 1
            } else {
                newStatus = 0
            }

            const url = apiHost + '/api/admin/' + localUtil.getSessionItem(sysConst.LOGIN_USER_ID)
                + '/msg/' + id + '/status';
            const res = await httpUtil.httpPut(url, {status: newStatus});
            if (res.success === true) {
                swal("修改成功", "", "success");
                dispatch(getArticleList());
            } else if (res.success === false) {
                swal('修改失败', res.msg, 'warning');
            }
        }
    });
};