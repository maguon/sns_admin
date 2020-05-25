import React from 'react';
import {Modal} from 'react-materialize';
import {connect} from 'react-redux';

const formatUtil = require('../../utils/FormatUtil');

// 评论模态
class CommentModal extends React.Component {

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
     * 渲染(挂载)画面。
     */
    render() {
        const {commentModalReducer} = this.props;
        return (
            <Modal
                actions={[
                    <button type="button" className="btn close-btn modal-close">取消</button>
                ]}
                bottomSheet={false}
                fixedFooter={true}
                className="custom-modal"
                header="评论详情"
                id="commentModal"
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



                    {/* 文章 */}
                    {commentModalReducer.articleInfo.length > 0 &&
                    <div className="row margin-top20 margin-left20 margin-right20">

                        {/* 文章作者 头像 昵称 */}
                        <div className="col s6">
                            <img className="circle height-90" src={commentModalReducer.articleInfo[0].user_detail_info[0].avatar}/>
                            <span className="margin-left10">{commentModalReducer.articleInfo[0].user_detail_info[0].nick_name}</span>
                        </div>

                        {/* 文章 发布时间 */}
                        <div className="col s6 right-align">发布时间：{formatUtil.getDateTime(commentModalReducer.articleInfo[0].created_at)}</div>

                        {/* 文章 发布地址 */}
                        <div className="col s12 right-align"><i className="mdi mdi-map-marker margin-right10"/>{commentModalReducer.articleInfo[0].address_name}</div>

                        {/* 文章内容 */}
                        <div className="col s12 margin-top10">{commentModalReducer.articleInfo[0].info}</div>
                    </div>}

                    {/* 评论 */}
                    {commentModalReducer.commentInfo.length > 0 &&
                    <div className="row margin-left20 margin-right20">
                        <div className="col s12 no-padding"><div className="col s12 margin-top10 divider"/></div>

                        <div className="col s12 margin-top10">评论详情</div>
                        <div className="col s8 margin-top10">{commentModalReducer.commentInfo[0].user_detail_info[0].nick_name}</div>
                        <div className="col s4 margin-top10 right-align">{formatUtil.getDateTime(commentModalReducer.commentInfo[0].created_at)}</div>
                        <div className="col s12 margin-top10">{commentModalReducer.commentInfo[0].comment}</div>
                        <div className="col s6 margin-top10">共{commentModalReducer.commentInfo[0].comment_num}条评论</div>
                        <div className="col s6 margin-top10 right-align">赞({commentModalReducer.commentInfo[0].agree_num})</div>
                    </div>}




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
        commentModalReducer: state.CommentModalReducer
    }
};

/**
 * 输出逻辑：用户发出的动作变为 Action 对象，从 UI 组件传出去。
 */
const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(CommentModal);