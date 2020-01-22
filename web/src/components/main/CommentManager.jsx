import React from 'react';
import {connect} from 'react-redux';
import {Link} from "react-router-dom";
import {TextInput, DatePicker} from 'react-materialize';
import {CommentManagerActionType} from '../../types';
import Select from "react-select";

const commentManagerAction = require('../../actions/main/CommentManagerAction');
const sysConst = require('../../utils/SysConst');
const formatUtil = require('../../utils/FormatUtil');
const commonUtil = require('../../utils/CommonUtil');

// 评论管理
class CommentManager extends React.Component {

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
        if (!this.props.fromDetail) {
            this.props.setStartNumber(0);

            this.props.setConditionCommentId('');
            this.props.changeConditionType(null);
            this.props.setConditionCommentUserPhone('');
            this.props.setConditionArticleId('');
            this.props.setConditionCreatedOnStart('');
            this.props.setConditionCreatedOnEnd('');
            this.props.changeConditionStatus(null);
        }
        this.props.getCommentList();
    }

    /**
     * 更新 检索条件：评论编号
     */
    changeConditionCommentId = (event) => {
        this.props.setConditionCommentId(event.target.value);
    };

    /**
     * 更新 检索条件：注册手机
     */
    changeConditionCommentUserPhone = (event) => {
        this.props.setConditionCommentUserPhone(event.target.value);
    };

    /**
     * 更新 检索条件：文章编号
     */
    changeConditionArticleId = (event) => {
        this.props.setConditionArticleId(event.target.value);
    };

    /**
     * 更新 检索条件：评论时间(始)
     */
    changeConditionCreatedOnStart = (value) => {
        this.props.setConditionCreatedOnStart(formatUtil.getDate(value));
    };
    clearConditionCreatedOnStart = () => {
        this.props.setConditionCreatedOnStart('');
    };

    /**
     * 更新 检索条件：评论时间(终)
     */
    changeConditionCreatedOnEnd = (value) => {
        this.props.setConditionCreatedOnEnd(formatUtil.getDate(value));
    };
    clearConditionCreatedOnEnd = () => {
        this.props.setConditionCreatedOnEnd('');
    };

    /**
     * 查询评论列表
     */
    queryCommentList = () => {
        // 默认第一页
        this.props.setStartNumber(0);
        this.props.getCommentList();
    };

    /**
     * 上一页
     */
    preBtn = () => {
        this.props.setStartNumber(this.props.commentManagerReducer.start - (this.props.commentManagerReducer.size - 1));
        this.props.getCommentList();
    };

    /**
     * 下一页
     */
    nextBtn = () => {
        this.props.setStartNumber(this.props.commentManagerReducer.start + (this.props.commentManagerReducer.size - 1));
        this.props.getCommentList();
    };

    /**
     * 删除评论
     */
    deleteComment = (messageCommentsId) => {
        this.props.deleteComment(messageCommentsId);
    };

    /**
     * 修改评论状态
     */
    changeCommentStatus = (messageCommentsId, status) => {
        this.props.changeCommentStatus(messageCommentsId, status);
    };

    render() {
        const {commentManagerReducer, changeConditionType, changeConditionStatus} = this.props;
        return (
            <div>
                {/* 标题部分 */}
                <div className="row">
                    <div className="input-field col s12 page-title">
                        <span className="margin-left10">评论管理</span>
                        <div className="divider custom-divider margin-top10"/>
                    </div>
                </div>

                {/* 上部分：检索条件输入区域 */}
                <div className="row grey-text text-darken-1">
                    <div className="col s11 search-condition-box">
                        <TextInput s={3} label="评论编号" value={commentManagerReducer.conditionCommentId} onChange={this.changeConditionCommentId}/>
                        <div className="input-field col s3">
                            <Select
                                options={sysConst.MESSAGE_TYPE}
                                onChange={changeConditionType}
                                value={commentManagerReducer.conditionType}
                                isSearchable={false}
                                placeholder={"请选择"}
                                styles={sysConst.CUSTOM_REACT_SELECT_STYLE}
                                isClearable={true}
                            />
                            <label className="active">评论类型</label>
                        </div>
                        <TextInput s={3} label="注册手机" value={commentManagerReducer.conditionCommentUserPhone} onChange={this.changeConditionCommentUserPhone}/>
                        <TextInput s={3} label="文章编号" value={commentManagerReducer.conditionArticleId} onChange={this.changeConditionArticleId}/>

                        {/* 查询条件：评论时间(始) */}
                        <div className="custom-input-field col s3 input-field">
                            <DatePicker s={12} label="评论时间(始)" options={sysConst.DATE_PICKER_OPTION}
                                        value={commentManagerReducer.conditionCreatedOnStart} onChange={this.changeConditionCreatedOnStart} />
                            {commentManagerReducer.conditionCreatedOnStart !== '' && <span className="mdi data-clear-icon mdi-window-close" onClick={this.clearConditionCreatedOnStart}/>}
                            <span className="mdi data-icon mdi-table-large"/>
                        </div>

                        {/* 查询条件：评论时间(终) */}
                        <div className="custom-input-field col s3 input-field">
                            <DatePicker s={12} label="评论时间(终)" options={sysConst.DATE_PICKER_OPTION}
                                        value={commentManagerReducer.conditionCreatedOnEnd} onChange={this.changeConditionCreatedOnEnd} />
                            {commentManagerReducer.conditionCreatedOnEnd !== '' && <span className="mdi data-clear-icon mdi-window-close" onClick={this.clearConditionCreatedOnEnd}/>}
                            <span className="mdi data-icon mdi-table-large"/>
                        </div>

                        <div className="input-field col s3">
                            <Select
                                options={sysConst.COMMENT_STATUS}
                                onChange={changeConditionStatus}
                                value={commentManagerReducer.conditionStatus}
                                isSearchable={false}
                                placeholder={"请选择"}
                                styles={sysConst.CUSTOM_REACT_SELECT_STYLE}
                                isClearable={true}
                            />
                            <label className="active">评论状态</label>
                        </div>
                    </div>

                    {/* 查询按钮 */}
                    <div className="col s1">
                        <a className="btn-floating btn-large waves-light waves-effect btn query-btn" onClick={this.queryCommentList}>
                            <i className="mdi mdi-magnify"/>
                        </a>
                    </div>
                </div>

                {/* 下部分：检索结果显示区域 */}
                <div className="row">
                    <div className="col s12">
                        <table className="fixed-table bordered striped">
                            <thead className="custom-dark-grey table-top-line">
                            <tr className="grey-text text-darken-2">
                                <th style={{width: '230px'}}>评论编号</th>
                                <th style={{width: '80px'}}>评论类型</th>
                                <th style={{width: '130px'}}>注册手机</th>
                                <th style={{width: '230px'}}>文章编号</th>
                                <th className="text-ellipsis" style={{width: '260px'}}>评论内容</th>
                                <th>评论数</th>
                                <th>点赞数</th>
                                <th className="center" style={{width: '180px'}}>评论时间</th>
                                <th className="center">状态</th>
                                <th className="center" style={{width: '150px'}}>操作</th>
                            </tr>
                            </thead>
                            <tbody>
                            {commentManagerReducer.commentArray.map(function (item) {
                                return (
                                    <tr className="grey-text text-darken-1">
                                        {/* 评论编号 */}
                                        <td style={{width: '230px'}}>{item._id}</td>
                                        {/* 评论类型 */}
                                        <td  style={{width: '80px'}}>{commonUtil.getJsonValue(sysConst.MESSAGE_TYPE, item.msg_type)}</td>
                                        {/* 注册手机 */}
                                        <td  style={{width: '130px'}}>{item.user_login_info[0].phone}</td>
                                        {/* 文章编号 */}
                                        <td style={{width: '230px'}}>{item._msg_id}</td>
                                        {/* 评论内容 */}
                                        <td className="text-ellipsis" style={{width: '260px'}}>{item.comment}</td>
                                        {/* 评论数 */}
                                        <td>{formatUtil.formatNumber(item.comment_num)}</td>
                                        {/* 点赞数 */}
                                        <td>{formatUtil.formatNumber(item.agree_num)}</td>

                                        {/* 评论时间 */}
                                        <td className="center" style={{width: '180px'}}>{formatUtil.getDateTime(item.created_at)}</td>
                                        {/* 状态 */}
                                        <td className="center">{commonUtil.getJsonValue(sysConst.COMMENT_STATUS, item.status)}</td>
                                        {/* 操作 */}
                                        <td className="operation center"  style={{width: '150px'}}>
                                            <i className="mdi mdi-close purple-font pointer margin-right10" onClick={() => {this.deleteComment(item._id)}}/>
                                            {/* 状态：屏蔽 */}
                                            {item.status === sysConst.COMMENT_STATUS[0].value &&
                                            <i className="mdi mdi-eye purple-font pointer" onClick={() => {this.changeCommentStatus(item._id,item.status)}}/>}
                                            {/* 状态：正常 */}
                                            {item.status === sysConst.COMMENT_STATUS[1].value &&
                                            <i className="mdi mdi-eye-off purple-font pointer" onClick={() => {this.changeCommentStatus(item._id,item.status)}}/>}

                                            <Link to={{pathname: '/comment/' + item._id}}>
                                                <i className="mdi mdi-table-search purple-font margin-left10"/>
                                            </Link>
                                        </td>
                                    </tr>
                                )
                            },this)}
                            {commentManagerReducer.commentArray.length === 0 &&
                            <tr className="grey-text text-darken-1">
                                <td className="no-data-tr" colSpan="10">暂无数据</td>
                            </tr>}
                            </tbody>
                        </table>
                    </div>

                    {/* 上下页按钮 */}
                    <div className="col s12 margin-top10">
                        <div className="right">
                            {commentManagerReducer.start > 0 && commentManagerReducer.dataSize > 0 &&
                            <a className="waves-light waves-effect custom-blue btn margin-right10" id="pre" onClick={this.preBtn}>
                                上一页
                            </a>}
                            {commentManagerReducer.dataSize >= commentManagerReducer.size &&
                            <a className="waves-light waves-effect custom-blue btn" id="next" onClick={this.nextBtn}>
                                下一页
                            </a>}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    let fromDetail = false;
    if (typeof ownProps.location.state !== 'undefined' && ownProps.location.state.fromDetail === true) {
        fromDetail = true;
    }
    return {
        commentManagerReducer: state.CommentManagerReducer,
        fromDetail: fromDetail
    }
};

const mapDispatchToProps = (dispatch) => ({
    getCommentList: () => {
        dispatch(commentManagerAction.getCommentList());
    },
    setStartNumber: (start) => {
        dispatch(CommentManagerActionType.setStartNumber(start))
    },

    setConditionCommentId: (value) => {
        dispatch(CommentManagerActionType.setConditionCommentId(value))
    },
    changeConditionType: (value) => {
        dispatch(CommentManagerActionType.setConditionType(value))
    },
    setConditionCommentUserPhone: (value) => {
        dispatch(CommentManagerActionType.setConditionCommentUserPhone(value))
    },
    setConditionArticleId: (value) => {
        dispatch(CommentManagerActionType.setConditionArticleId(value))
    },
    setConditionCreatedOnStart: (value) => {
        dispatch(CommentManagerActionType.setConditionCreatedOnStart(value))
    },
    setConditionCreatedOnEnd: (value) => {
        dispatch(CommentManagerActionType.setConditionCreatedOnEnd(value))
    },
    changeConditionStatus: (value) => {
        dispatch(CommentManagerActionType.setConditionStatus(value))
    },

    deleteComment: (id) => {
        dispatch(commentManagerAction.deleteComment(id));
    },
    changeCommentStatus: (id, status) => {
        dispatch(commentManagerAction.changeCommentStatus(id, status));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(CommentManager)