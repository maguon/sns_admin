import {apiHost} from '../../config/HostConfig';
import {CommentManagerActionType} from '../../types';

const httpUtil = require('../../utils/HttpUtil');
const localUtil = require('../../utils/LocalUtil');
const sysConst = require('../../utils/SysConst');

export const getCommentList = () => async (dispatch, getState) => {
    try {
        // 检索条件：开始位置
        const start = getState().CommentManagerReducer.start;
        // 检索条件：每页数量
        const size = getState().CommentManagerReducer.size;

        // 检索条件：评论编号
        const conditionCommentId = getState().CommentManagerReducer.conditionCommentId.trim();
        // 检索条件：评论类型
        const conditionType = getState().CommentManagerReducer.conditionType;
        // 检索条件：评论人ID
        const conditionCommentUserId = getState().CommentManagerReducer.conditionCommentUserId.trim();
        // 检索条件：昵称
        const conditionCommentUserName = getState().CommentManagerReducer.conditionCommentUserName.trim();
        // 检索条件：注册手机
        const conditionCommentUserPhone = getState().CommentManagerReducer.conditionCommentUserPhone.trim();

        // 检索条件：文章编号
        const conditionArticleId = getState().CommentManagerReducer.conditionArticleId.trim();
        // 检索条件：回复的评论编号
        const conditionReplyCommentId = getState().CommentManagerReducer.conditionReplyCommentId.trim();
        // 检索条件：评论时间
        const conditionCreatedOnStart = getState().CommentManagerReducer.conditionCreatedOnStart;
        const conditionCreatedOnEnd = getState().CommentManagerReducer.conditionCreatedOnEnd;
        // 检索条件：评论状态
        const conditionStatus = getState().CommentManagerReducer.conditionStatus;


        console.log('conditionCommentId',conditionCommentId);
        console.log('conditionType',conditionType);
        console.log('conditionCommentUserId',conditionCommentUserId);
        console.log('conditionCommentUserName',conditionCommentUserName);
        console.log('conditionCommentUserPhone',conditionCommentUserPhone);

        console.log('conditionArticleId',conditionArticleId);
        console.log('conditionReplyCommentId',conditionReplyCommentId);
        console.log('conditionCreatedOnStart',conditionCreatedOnStart);
        console.log('conditionCreatedOnEnd',conditionCreatedOnEnd);
        console.log('conditionStatus',conditionStatus);



        // 基本检索URL
        let url = apiHost + '/api/admin/' + localUtil.getSessionItem(sysConst.USER_ID)
            + '/achievement?start=' + start + '&size=' + size;
        // 检索条件
        // let conditionsObj = {
        //     // 检索条件：推荐人编号
        //     recommendId: conditionRecommendId,
        //     // 检索条件：推荐人
        //     recommendName: conditionRecommendName,
        //     // 检索条件：推荐时间
        //     recommendOnStart: conditionRecommendOnStart,
        //     recommendOnEnd: conditionRecommendOnEnd
        // };
        //
        // let conditions = httpUtil.objToUrl(conditionsObj);
        // // 检索URL
        // url = conditions.length > 0 ? url + "&" + conditions : url;
        const res = await httpUtil.httpGet(url);
        if (res.success === true) {
            dispatch({type: CommentManagerActionType.setDataSize, payload: res.result.length});
            dispatch({type: CommentManagerActionType.getCommentList, payload: res.result.slice(0, size - 1)});
        } else if (res.success === false) {
            swal('获取评论列表信息失败', res.msg, 'warning');
        }
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};