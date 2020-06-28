import {apiHost} from '../../config/HostConfig';
import {FakeArticleManagerActionType} from '../../types';

const httpUtil = require('../../utils/HttpUtil');
const localUtil = require('../../utils/LocalUtil');
const sysConst = require('../../utils/SysConst');

// Fake文章管理 -> 文章 取得画面列表
export const getFakeArticleList = () => async (dispatch, getState) => {
    try {
        // 检索条件：开始位置
        const start = getState().FakeArticleManagerReducer.start;
        // 检索条件：每页数量
        const size = getState().FakeArticleManagerReducer.size;

        // 检索条件：文章编号
        const conditionArticleId = getState().FakeArticleManagerReducer.conditionArticleId.trim();
        // 检索条件：Fake用户
        const conditionFakeUser = getState().FakeArticleManagerReducer.conditionFakeUser;
        // 检索条件：文章类型
        const conditionType = getState().FakeArticleManagerReducer.conditionType;
        // 检索条件：载体类型
        const conditionCarrier = getState().FakeArticleManagerReducer.conditionCarrier;
        // 检索条件：发布时间
        const conditionCreatedOnStart = getState().FakeArticleManagerReducer.conditionCreatedOnStart;
        const conditionCreatedOnEnd = getState().FakeArticleManagerReducer.conditionCreatedOnEnd;

        // 基本检索URL
        let url = apiHost + '/api/admin/' + localUtil.getSessionItem(sysConst.LOGIN_USER_ID)
            + '/msg?fakeType=1&start=' + start + '&size=' + size;
        // 检索条件
        let conditionsObj = {
            // 检索条件：文章编号
            msgId: conditionArticleId,
            // 检索条件：发布文章用户ID
            userId: conditionFakeUser === null ? '' : conditionFakeUser.value,
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
        const res = await httpUtil.httpGet(url);
        if (res.success === true) {
            dispatch({type: FakeArticleManagerActionType.setDataSize, payload: res.result.length});
            dispatch({type: FakeArticleManagerActionType.getArticleList, payload: res.result.slice(0, size - 1)});
        } else if (res.success === false) {
            swal('获取文章列表信息失败', res.msg, 'warning');
        }
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
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
                dispatch(getFakeArticleList());
            } else if (res.success === false) {
                swal('修改失败', res.msg, 'warning');
            }
        }
    });
};