import {apiHost} from '../../config/HostConfig';
import {MessageManagerActionType} from '../../types';

const httpUtil = require('../../utils/HttpUtil');
const localUtil = require('../../utils/LocalUtil');
const sysConst = require('../../utils/SysConst');

export const getMessageList = () => async (dispatch, getState) => {
    try {
        // 检索条件：开始位置
        const start = getState().MessageManagerReducer.start;
        // 检索条件：每页数量
        const size = getState().MessageManagerReducer.size;

        // 检索条件：消息编号
        const conditionId = getState().MessageManagerReducer.conditionId.trim();
        // 检索条件：消息类型
        const conditionType = getState().MessageManagerReducer.conditionType;
        // 检索条件：接收人ID
        const conditionReceiverId = getState().MessageManagerReducer.conditionReceiverId.trim();
        // 检索条件：接收人昵称
        const conditionReceiverName = getState().MessageManagerReducer.conditionReceiverName.trim();
        // 检索条件：接收人手机
        const conditionReceiverPhone = getState().MessageManagerReducer.conditionReceiverPhone.trim();

        // 检索条件：文章编号
        const conditionArticleId = getState().MessageManagerReducer.conditionArticleId.trim();
        // 检索条件：评论编号
        const conditionCommentId = getState().MessageManagerReducer.conditionCommentId.trim();
        // 检索条件：相关人ID
        const conditionConnectId = getState().MessageManagerReducer.conditionConnectId.trim();
        // 检索条件：发送时间
        const conditionCreatedOnStart = getState().MessageManagerReducer.conditionCreatedOnStart;
        const conditionCreatedOnEnd = getState().MessageManagerReducer.conditionCreatedOnEnd;

        console.log('conditionId',conditionId);
        console.log('conditionType',conditionType);
        console.log('conditionReceiverId',conditionReceiverId);
        console.log('conditionReceiverName',conditionReceiverName);
        console.log('conditionReceiverPhone',conditionReceiverPhone);

        console.log('conditionArticleId',conditionArticleId);
        console.log('conditionCommentId',conditionCommentId);
        console.log('conditionConnectId',conditionConnectId);
        console.log('conditionCreatedOnStart',conditionCreatedOnStart);
        console.log('conditionCreatedOnEnd',conditionCreatedOnEnd);

        // 基本检索URL
        let url = apiHost + '/api/admin/' + localUtil.getSessionItem(sysConst.USER_ID)
            + '/messages?start=' + start + '&size=' + size;

        // 检索条件
        let conditionsObj = {
            // 检索条件：电话
            messagesId: conditionId,
            // 检索条件：姓名
            // user_id: conditionUserId,
            // 检索条件：员工编号
            type: conditionType === null ? '' : conditionType.value,
            // 检索条件：状态
            // status: conditionStatus === null ? '' : conditionStatus.value
        };
        let conditions = httpUtil.objToUrl(conditionsObj);
        // 检索URL
        url = conditions.length > 0 ? url + "&" + conditions : url;
        const res = await httpUtil.httpGet(url);
        if (res.success === true) {
            dispatch({type: MessageManagerActionType.setDataSize, payload: res.result.length});
            dispatch({type: MessageManagerActionType.getMessageList, payload: res.result.slice(0, size - 1)});
        } else if (res.success === false) {
            swal('获取消息列表信息失败', res.msg, 'warning');
        }
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};