import React from 'react';
import {connect} from 'react-redux';
import {Link} from "react-router-dom";
import {Tab, Tabs} from "react-materialize";

const commentManagerDetailAction = require('../../actions/main/CommentManagerDetailAction');
const sysConst = require('../../utils/SysConst');
const formatUtil = require('../../utils/FormatUtil');

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
        // // 默认第一页
        // this.props.setDetailStartNumber(0);
        // // 清空检索条件
        // this.props.setConditionCreatedOnStart('');
        // this.props.setConditionCreatedOnEnd('');

        // 取得推广人基本信息
        this.props.getCommentInfo();
    }

    /**
     * 更新 检索条件：选择时间(始)
     */
    changeConditionCreatedOnStart = (event, value) => {
        this.props.setConditionCreatedOnStart(value);
    };

    /**
     * 更新 检索条件：选择时间(始)
     */
    changeConditionCreatedOnEnd = (event, value) => {
        this.props.setConditionCreatedOnEnd(value);
    };

    /**
     * 查询线路列表
     */
    queryLoadTaskList = () => {
        // 默认第一页
        this.props.setDetailStartNumber(0);
        // 取得推广人基本信息
        this.props.getCommentInfo();
        // 检索改推广人，推荐用户
        this.props.getUserList();
    };

    /**
     * 查询线路列表
     */
    changeTabs = (idx,e) => {
        // 默认第一页
        console.log('idx',idx);
        console.log('e',e);
    };

    /**
     * 上一页
     */
    preBtn = () => {
        this.props.setDetailStartNumber(this.props.commentManagerDetailReducer.detailStart - (this.props.commentManagerDetailReducer.detailSize - 1));
        this.props.getUserList();
    };

    /**
     * 下一页
     */
    nextBtn = () => {
        this.props.setDetailStartNumber(this.props.commentManagerDetailReducer.detailStart + (this.props.commentManagerDetailReducer.detailSize - 1));
        this.props.getUserList();
    };

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

                {commentManagerDetailReducer.commentInfo.length > 0 &&
                <div className="row margin-top20 margin-left20 margin-right20">
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
                    {/* 分割线 */}
                    <div className="col s12 no-padding"><div className="col s12 margin-top5 divider"/></div>
                    {/* 评论内容 */}
                    <div className="col s12">{commentManagerDetailReducer.commentInfo[0].commentsMsg}</div>


                    {/* 对应文章 */}
                    <div className="col s12">
                        <div className="col s12 detail-box grey lighten-3 border-bottom-line">
                            <div className="col s4">ID: {commentManagerDetailReducer.commentInfo[0].messages_info[0]._userId}</div>
                            <div className="col s8 right-align">
                                    <span>
                                        <i className="mdi mdi-map-marker margin-right10"/>
                                        {commentManagerDetailReducer.commentInfo[0].messages_info[0].addressReal}
                                        {commentManagerDetailReducer.commentInfo[0].messages_info[0].addressName}
                                    </span>
                                <span className="margin-left50">
                                        发布时间：{formatUtil.getDateTime(commentManagerDetailReducer.commentInfo[0].messages_info[0].created_at)}
                                    </span>
                            </div>
                        </div>
                        <div className="col s12 detail-box">
                            {commentManagerDetailReducer.commentInfo[0].commentsMsg}
                        </div>
                    </div>
                </div>}


                <div className="row">
                    <Tabs className='tab-demo z-depth-1' onChange={this.changeTabs}>
                        <Tab title={''} idx="1000" className="first">Test 1222222222222222222</Tab>
                        <Tab title="Test 2" idx="1001" className="second" active>Test 233333333333333333333</Tab>
                        <Tab title="Test 3" idx="1002" className="third">Test 44444444444443</Tab>
                        <Tab title="Test 4" idx="1003" className="fouth">Test 555555555555555554</Tab>
                    </Tabs>
                </div>

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
    },
    // getUserList: () => {
    //     dispatch(commentManagerDetailAction.getUserList(ownProps.match.params.id))
    // },
    // setDetailStartNumber: (start) => {
    //     dispatch(CommentManagerDetailActionType.setDetailStartNumber(start))
    // },
    // setConditionCreatedOnStart: (value) => {
    //     dispatch(CommentManagerDetailActionType.setConditionCreatedOnStart(value))
    // },
    // setConditionCreatedOnEnd: (value) => {
    //     dispatch(CommentManagerDetailActionType.setConditionCreatedOnEnd(value))
    // }
});

export default connect(mapStateToProps, mapDispatchToProps)(CommentManagerDetail)