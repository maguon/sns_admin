import React from 'react';
import {connect} from 'react-redux';
import {Link} from "react-router-dom";
import {TextInput, DatePicker} from 'react-materialize';
import {CommentManagerActionType} from '../../types';
import Select from "react-select";

const commentManagerAction = require('../../actions/main/CommentManagerAction');
const sysConst = require('../../utils/SysConst');
const formatUtil = require('../../utils/FormatUtil');

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
            this.props.setConditionCommentUserId('');
            this.props.setConditionCommentUserName('');
            this.props.setConditionCommentUserPhone('');

            this.props.setConditionArticleId('');
            this.props.setConditionReplyCommentId('');
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
     * 更新 检索条件：评论人ID
     */
    changeConditionCommentUserId = (event) => {
        this.props.setConditionCommentUserId(event.target.value);
    };

    /**
     * 更新 检索条件：昵称
     */
    changeConditionCommentUserName = (event) => {
        this.props.setConditionCommentUserName(event.target.value);
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
     * 更新 检索条件：回复的评论编号
     */
    changeConditionReplyCommentId = (event) => {
        this.props.setConditionReplyCommentId(event.target.value);
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
                        <div className="custom-input-field col s-percent-20">
                            <TextInput s={12} label="评论编号" value={commentManagerReducer.conditionCommentId} onChange={this.changeConditionCommentId}/>
                        </div>

                        <div className="input-field col s-percent-20">
                            <Select
                                options={sysConst.MSG_TYPE}
                                onChange={changeConditionType}
                                value={commentManagerReducer.conditionType}
                                isSearchable={false}
                                placeholder={"请选择"}
                                styles={sysConst.CUSTOM_REACT_SELECT_STYLE}
                                isClearable={true}
                            />
                            <label className="active">评论类型</label>
                        </div>

                        <div className="custom-input-field col s-percent-20">
                            <TextInput s={12} label="评论人ID" value={commentManagerReducer.conditionCommentUserId} onChange={this.changeConditionCommentUserId}/>
                        </div>

                        <div className="custom-input-field col s-percent-20">
                            <TextInput s={12} label="昵称" value={commentManagerReducer.conditionCommentUserName} onChange={this.changeConditionCommentUserName}/>
                        </div>

                        <div className="custom-input-field col s-percent-20">
                            <TextInput s={12} label="注册手机" value={commentManagerReducer.conditionCommentUserPhone} onChange={this.changeConditionCommentUserPhone}/>
                        </div>



                        <div className="custom-input-field col s-percent-20">
                            <TextInput s={12} label="文章编号" value={commentManagerReducer.conditionArticleId} onChange={this.changeConditionArticleId}/>
                        </div>

                        <div className="custom-input-field col s-percent-20">
                            <TextInput s={12} label="回复的评论编号" value={commentManagerReducer.conditionReplyCommentId} onChange={this.changeConditionReplyCommentId}/>
                        </div>

                        {/* 查询条件：评论时间(始) */}
                        <div className="custom-input-field col s-percent-20 input-field">
                            <DatePicker s={12} label="评论时间(始)" options={sysConst.DATE_PICKER_OPTION}
                                        value={commentManagerReducer.conditionCreatedOnStart} onChange={this.changeConditionCreatedOnStart} />
                            {commentManagerReducer.conditionCreatedOnStart !== '' && <span className="mdi data-clear-icon mdi-window-close" onClick={this.clearConditionCreatedOnStart}/>}
                            <span className="mdi data-icon mdi-table-large"/>
                        </div>

                        {/* 查询条件：评论时间(终) */}
                        <div className="custom-input-field col s-percent-20 input-field">
                            <DatePicker s={12} label="评论时间(终)" options={sysConst.DATE_PICKER_OPTION}
                                        value={commentManagerReducer.conditionCreatedOnEnd} onChange={this.changeConditionCreatedOnEnd} />
                            {commentManagerReducer.conditionCreatedOnEnd !== '' && <span className="mdi data-clear-icon mdi-window-close" onClick={this.clearConditionCreatedOnEnd}/>}
                            <span className="mdi data-icon mdi-table-large"/>
                        </div>

                        <div className="input-field col s-percent-20">
                            <Select
                                options={sysConst.MSG_TYPE}
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
                        <table className="bordered striped">
                            <thead className="custom-dark-grey table-top-line">
                            <tr className="grey-text text-darken-2">
                                <th>推荐人编号</th>
                                <th>推荐人</th>
                                <th>授权用户</th>
                                <th>认证用户</th>
                                <th className="center">操作</th>
                            </tr>
                            </thead>
                            <tbody>
                            {commentManagerReducer.commentArray.map(function (item) {
                                return (
                                    <tr className="grey-text text-darken-1">
                                        <td>{item.id}</td>
                                        <td>{item.name}</td>
                                        <td>{formatUtil.formatNumber(item.user_count)}</td>
                                        <td>{formatUtil.formatNumber(item.auth_count)}</td>
                                        <td className="operation center">
                                            <Link to={{pathname: '/recommend_business/' + item.id}}>
                                                <i className="mdi mdi-table-search purple-font"/>
                                            </Link>
                                        </td>
                                    </tr>
                                )
                            })}
                            {commentManagerReducer.commentArray.length === 0 &&
                            <tr className="grey-text text-darken-1">
                                <td className="no-data-tr" colSpan="5">暂无数据</td>
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
    setConditionCommentUserId: (value) => {
        dispatch(CommentManagerActionType.setConditionCommentUserId(value))
    },
    setConditionCommentUserName: (value) => {
        dispatch(CommentManagerActionType.setConditionCommentUserName(value))
    },
    setConditionCommentUserPhone: (value) => {
        dispatch(CommentManagerActionType.setConditionCommentUserPhone(value))
    },

    setConditionArticleId: (value) => {
        dispatch(CommentManagerActionType.setConditionArticleId(value))
    },
    setConditionReplyCommentId: (value) => {
        dispatch(CommentManagerActionType.setConditionReplyCommentId(value))
    },
    setConditionCreatedOnStart: (value) => {
        dispatch(CommentManagerActionType.setConditionCreatedOnStart(value))
    },
    setConditionCreatedOnEnd: (value) => {
        dispatch(CommentManagerActionType.setConditionCreatedOnEnd(value))
    },
    changeConditionStatus: (value) => {
        dispatch(CommentManagerActionType.setConditionStatus(value))
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(CommentManager)