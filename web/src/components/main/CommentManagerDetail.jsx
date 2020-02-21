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

                    {/* 文章作者 头像 昵称 */}
                    <div className="col s6">
                        <img className="circle height-90" src={commentManagerDetailReducer.articleInfo[0].user_detail_info[0].avatar}/>
                        <span className="margin-left10">{commentManagerDetailReducer.articleInfo[0].user_detail_info[0].nick_name}</span>
                    </div>

                    {/* 文章 发布时间 */}
                    <div className="col s6 right-align">发布时间：{formatUtil.getDateTime(commentManagerDetailReducer.articleInfo[0].created_at)}</div>

                    {/* 文章 发布地址 */}
                    <div className="col s12 right-align"><i className="mdi mdi-map-marker margin-right10"/>{commentManagerDetailReducer.articleInfo[0].address_name}</div>

                    {/* 文章内容 */}
                    <div className="col s12 margin-top10">{commentManagerDetailReducer.articleInfo[0].info}</div>
                </div>}

                {/* 评论 */}
                {commentManagerDetailReducer.commentInfo.length > 0 &&
                <div className="row margin-left20 margin-right20">
                    <div className="col s12 no-padding"><div className="col s12 margin-top10 divider"/></div>

                    <div className="col s12 margin-top10">评论详情</div>
                    <div className="col s8 margin-top10">{commentManagerDetailReducer.commentInfo[0].user_detail_info[0].nick_name}</div>
                    <div className="col s4 margin-top10 right-align">{formatUtil.getDateTime(commentManagerDetailReducer.commentInfo[0].created_at)}</div>
                    <div className="col s12 margin-top10">{commentManagerDetailReducer.commentInfo[0].comment}</div>
                    <div className="col s6 margin-top10">共{commentManagerDetailReducer.commentInfo[0].comment_num}条评论</div>
                    <div className="col s6 margin-top10 right-align">赞({commentManagerDetailReducer.commentInfo[0].agree_num})</div>
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