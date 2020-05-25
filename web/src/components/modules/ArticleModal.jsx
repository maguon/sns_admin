import React from 'react';
import {Modal, Tabs, Tab} from 'react-materialize';
import {connect} from 'react-redux';

const articleModalAction = require('../../actions/modules/ArticleModalAction');
const formatUtil = require('../../utils/FormatUtil');

// 文章详情
class ArticleModal extends React.Component {

    /**
     * 组件准备要挂载的最一开始，调用执行
     */
    constructor() {
        super();
    }

    /**
     * 组件完全挂载到页面上，调用执行
     */
    componentDidMount() {
    }

    /**
     * 显示2级评论列表
     */
    showCommentDetail = (msgComId) => {
        $(".details").hide();
        $(".detail_" + msgComId).show();
        this.props.getCommentLv2List(msgComId);
    };

    /**
     * 渲染(挂载)画面。
     */
    render() {
        const {articleModalReducer, changeTab} = this.props;
        return (
            <Modal
                actions={[
                    <button type="button" className="btn close-btn modal-close">取消</button>
                ]}
                bottomSheet={false}
                fixedFooter={true}
                className="custom-modal"
                header="文章详情"
                id="msgCollModal"
                options={{
                    dismissible: true,
                    endingTop: '10%',
                    inDuration: 250,
                    onCloseEnd: null,
                    onCloseStart: null,
                    onOpenEnd: null,
                    onOpenStart: null,
                    opacity: 0.5,
                    outDuration: 250,
                    preventScrolling: true,
                    startingTop: '4%'
                }}
            >
                <div className="row margin-top20 padding-left20 padding-right20">

                    {articleModalReducer.articleInfo.length > 0 &&
                    <div className="row margin-top20 margin-left20 margin-right20">
                        {/* 作者昵称 */}
                        <div className="col s6">作者昵称：{articleModalReducer.articleInfo[0].user_detail_info[0].nick_name}</div>
                        {/* 发布时间 */}
                        <div className="col s6 right-align">发布时间：{formatUtil.getDateTime(articleModalReducer.articleInfo[0].created_at)}</div>
                        {/* 手机 */}
                        <div className="col s6 margin-top5">&nbsp;</div>
                        {/* 发布位置 */}
                        <div className="col s6 margin-top5 right-align">发布位置：{articleModalReducer.articleInfo[0].address_name}</div>
                        {/* 分割线 */}
                        <div className="col s12 no-padding"><div className="col s12 margin-top10 divider"/></div>
                        {/* 文章内容 */}
                        <div className="col s12 margin-top10">{articleModalReducer.articleInfo[0].info}</div>
                    </div>}

                    <div className="row margin-left20 margin-right20">
                        <Tabs className='tab-demo z-depth-1' onChange={changeTab}>
                            <Tab title="评论" idx="1000" className="margin-top10" active>
                                {articleModalReducer.commentArray.map(function (item) {
                                    return (
                                        <div className="col s12 margin-top10">
                                            <div className="col s8 margin-top10">{item.user_detail_info[0].nick_name}</div>
                                            <div className="col s4 margin-top10 right-align">{formatUtil.getDateTime(item.created_at)}</div>
                                            <div className="col s12 margin-top10">{item.comment}</div>
                                            <div className="col s12 no-padding"><div className="col s12 margin-top10 divider"/></div>
                                            <div className="col s6 margin-top10 blue-font">共{item.comment_num}条评论
                                                <span onClick={() => {this.showCommentDetail(item._id)}} className="pointer">{item.comment_num > 0 ? ' 展开更多 >>' : ''}</span>
                                            </div>
                                            <div className="col s6 margin-top10 right-align">赞({item.agree_num})</div>

                                            <div className={`col s12 margin-top10 details detail_${item._id}`}>
                                                {articleModalReducer.commentLv2Array.map(function (item) {
                                                    return (
                                                        <div className="col s12 margin-top10">
                                                            <div className="col s1 margin-top10">&nbsp;</div>
                                                            <div className="col s7 margin-top10">{item.user_detail_info[0].nick_name}</div>
                                                            <div className="col s4 margin-top10 right-align">{formatUtil.getDateTime(item.created_at)}</div>
                                                            <div className="col s1 margin-top10">&nbsp;</div>
                                                            <div className="col s11 margin-top10">{item.comment}</div>
                                                            <div className="col s1"></div>
                                                            <div className="col s11 no-padding"><div className="col s12 margin-top10 divider"/></div>
                                                            <div className="col s1 margin-top10">&nbsp;</div>
                                                            <div className="col s6 margin-top10 blue-font">共{item.comment_num}条评论 {item.comment_num > 0 ? '展开更多 >>' : ''}</div>
                                                            <div className="col s5 margin-top10 right-align">赞({item.agree_num})</div>
                                                        </div>
                                                    )
                                                })}
                                            </div>
                                        </div>
                                    )
                                },this)}
                            </Tab>

                            <Tab title="点赞" idx="1001" className="margin-top10">
                                {articleModalReducer.praiseArray.map(function (item) {
                                    return (
                                        <div>
                                            <div className="col s8 margin-top10">{item.user_detail_info[0].nick_name}</div>
                                            <div className="col s4 margin-top10 right-align">{formatUtil.getDateTime(item.created_at)}</div>
                                            <div className="col s12 no-padding"><div className="col s12 margin-top5 divider"/></div>
                                        </div>
                                    )
                                },this)}
                            </Tab>
                        </Tabs>
                    </div>
                </div>
            </Modal>
        );
    }
}

/**
 * 输入逻辑：外部的数据（即state对象）转换为 UI 组件的参数。
 */
const mapStateToProps = (state) => {
    return {
        articleModalReducer: state.ArticleModalReducer
    }
};

/**
 * 输出逻辑：用户发出的动作变为 Action 对象，从 UI 组件传出去。
 */
const mapDispatchToProps = (dispatch) => ({
    changeTab: () => {
        dispatch(articleModalAction.getCommentInfo());
        dispatch(articleModalAction.getPraiseInfo());
    },
    getCommentLv2List: (msgComId) => {
        dispatch(articleModalAction.getComLv2List(msgComId));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(ArticleModal);