import React from 'react';
import {connect} from 'react-redux';
import {Link} from "react-router-dom";

const commentManagerDetailAction = require('../../actions/main/CommentManagerDetailAction');
const sysConst = require('../../utils/SysConst');
const formatUtil = require('../../utils/FormatUtil');

// 评论管理 - 评论详情
class CommentManagerDetail extends React.Component {

    /**
     * 组件准备要挂载的最一开始，调用执行
     */
    constructor(props) {
        super(props);
    }

    /**
     * 组件完全挂载到页面上，调用执行
     */
    componentDidMount() {
        // 取得基本信息
        this.props.getCommentInfo();
    }

    render() {
        const {commentManagerDetailReducer} = this.props;
        return (
            <div>
                {/* 标题部分 */}
                <div className="row margin-bottom0">
                    <div className="input-field col s12">
                        <Link to={{pathname: '/comment', state: {fromDetail: true}}}>
                            <a className="btn-floating btn waves-effect custom-blue waves-light fz15">
                                <i className="mdi mdi-arrow-left-bold"/>
                            </a>
                        </Link>
                        <span className="page-title margin-left30">评论管理 - 评论详情</span>
                        <div className="divider custom-divider margin-top10"/>
                    </div>
                </div>

                {/* 文章 */}
                {commentManagerDetailReducer.articleInfo.length > 0 &&
                <div className="row margin-top20 margin-left20 margin-right20">

                    {/* 文章作者 头像 */}
                    <div className="col s1 margin-top10 center">
                        {/*{commentManagerDetailReducer.articleInfo[0].user_detail_info[0].avatar !== null && commentManagerDetailReducer.articleInfo[0].user_detail_info[0].avatar !== '' &&*/}
                        <img className="circle height-90" src={commentManagerDetailReducer.articleInfo[0].user_detail_info[0].avatar}/>
                        {/*}*/}
                    </div>

                    {/* 文章作者 昵称 */}
                    <div className="col s5">
                        {commentManagerDetailReducer.articleInfo[0].user_detail_info[0].nick_name}
                    </div>

                    {/* 文章 发布时间 / 地址 */}
                    <div className="col s6">
                        发布时间：{formatUtil.getDateTime(commentManagerDetailReducer.articleInfo[0].created_at)}
                        <div className="margin-top10">
                            <i className="mdi mdi-map-marker margin-right10"/>
                            {commentManagerDetailReducer.articleInfo[0].addressName}
                        </div>
                    </div>

                    {/* 文章内容 */}
                    <div className="col s12">{commentManagerDetailReducer.articleInfo[0].info}</div>
                </div>}

                {/* 评论 */}
                {commentManagerDetailReducer.commentInfo.length > 0 &&
                <div className="row margin-top20 margin-left20 margin-right20">
                    <div className="col s12">
                        <div className="col s12 detail-box grey lighten-3 border-bottom-line">
                            <div className="col s12">
                                {commentManagerDetailReducer.commentInfo[0].user_detail_info[0].nick_name}
                            </div>
                            {/* 评论者 ID / 手机 */}
                            <div className="col s6">
                                ID：{commentManagerDetailReducer.commentInfo[0].user_login_info[0]._id}
                                <span className="margin-left20">手机：{commentManagerDetailReducer.commentInfo[0].user_login_info[0].phone}</span>
                            </div>
                            {/* 评论时间 */}
                            <div className="col s6 right-align">评论时间：{formatUtil.getDateTime(commentManagerDetailReducer.commentInfo[0].created_at)}</div>
                        </div>
                        {/* 评论内容 */}
                        <div className="col s12 detail-box">
                            {commentManagerDetailReducer.commentInfo[0].commentsMsg}
                        </div>
                    </div>
                </div>}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        commentManagerDetailReducer: state.CommentManagerDetailReducer
    }
};

const mapDispatchToProps = (dispatch, ownProps) => ({
    // 基本信息
    getCommentInfo: () => {
        dispatch(commentManagerDetailAction.getCommentInfo(ownProps.match.params.id))
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(CommentManagerDetail)