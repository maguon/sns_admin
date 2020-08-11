import React from 'react';
import {connect} from 'react-redux';
import {Link} from "react-router-dom";
import {TextInput, DatePicker} from 'react-materialize';
import {ArticleManagerActionType} from '../../types';
import Select from "react-select";

const articleManagerAction = require('../../actions/main/ArticleManagerAction');
const articleManagerDetailAction = require('../../actions/main/ArticleManagerDetailAction');
const sysConst = require('../../utils/SysConst');
const formatUtil = require('../../utils/FormatUtil');
const commonUtil = require('../../utils/CommonUtil');

// 文章管理
class ArticleManager extends React.Component {

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

            this.props.setConditionArticleId('');
            this.props.setConditionNickName('');
            this.props.changeConditionType(null);
            this.props.changeConditionCarrier(null);
            this.props.setConditionCreatedOnStart('');
            this.props.setConditionCreatedOnEnd('');
        }
        this.props.getArticleList();
        this.props.initDetailData();
    }

    /**
     * 更新 检索条件：文章编号
     */
    changeConditionArticleId = (event) => {
        this.props.setConditionArticleId(event.target.value);
    };

    /**
     * 更新 检索条件：作者昵称
     */
    changeConditionNickName = (event) => {
        this.props.setConditionNickName(event.target.value);
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
    queryArticleList = () => {
        // 默认第一页
        this.props.setStartNumber(0);
        this.props.getArticleList();
    };

    /**
     * 上一页
     */
    preBtn = () => {
        this.props.setStartNumber(this.props.articleManagerReducer.start - (this.props.articleManagerReducer.size - 1));
        this.props.getArticleList();
    };

    /**
     * 下一页
     */
    nextBtn = () => {
        this.props.setStartNumber(this.props.articleManagerReducer.start + (this.props.articleManagerReducer.size - 1));
        this.props.getArticleList();
    };

    /**
     * 删除文章
     */
    deleteArticle = (messageCommentsId) => {
        this.props.deleteArticle(messageCommentsId);
    };

    /**
     * 修改文章状态
     */
    changeArticleStatus = (messageCommentsId, status) => {
        this.props.changeArticleStatus(messageCommentsId, status);
    };

    render() {
        const {articleManagerReducer, changeConditionType, changeConditionCarrier} = this.props;
        return (
            <div>
                {/* 标题部分 */}
                <div className="row">
                    <div className="input-field col s12 page-title">
                        <span className="margin-left10">文章管理</span>
                        <div className="divider custom-divider margin-top10"/>
                    </div>
                </div>

                {/* 上部分：检索条件输入区域 */}
                <div className="row grey-text text-darken-1">
                    <div className="col s11 search-condition-box">
                        <TextInput s={2} label="文章编号" value={articleManagerReducer.conditionArticleId} onChange={this.changeConditionArticleId}/>
                        <TextInput s={2} label="作者昵称" value={articleManagerReducer.conditionNickName} onChange={this.changeConditionNickName}/>

                        <div className="input-field col s2">
                            <Select
                                options={sysConst.MESSAGE_TYPE}
                                onChange={changeConditionType}
                                value={articleManagerReducer.conditionType}
                                isSearchable={false}
                                placeholder={"请选择"}
                                styles={sysConst.CUSTOM_REACT_SELECT_STYLE}
                                isClearable={true}
                            />
                            <label className="active">文章类型</label>
                        </div>
                        <div className="input-field col s2">
                            <Select
                                options={sysConst.CARRIER_TYPE}
                                onChange={changeConditionCarrier}
                                value={articleManagerReducer.conditionCarrier}
                                isSearchable={false}
                                placeholder={"请选择"}
                                styles={sysConst.CUSTOM_REACT_SELECT_STYLE}
                                isClearable={true}
                            />
                            <label className="active">载体类型</label>
                        </div>

                        {/* 查询条件：发布时间(始) */}
                        <div className="custom-input-field col s2 input-field">
                            <DatePicker s={12} label="发布时间(始)" options={sysConst.DATE_PICKER_OPTION}
                                        value={articleManagerReducer.conditionCreatedOnStart} onChange={this.changeConditionCreatedOnStart} />
                            {articleManagerReducer.conditionCreatedOnStart !== '' && <span className="mdi data-clear-icon mdi-window-close" onClick={this.clearConditionCreatedOnStart}/>}
                            <span className="mdi data-icon mdi-table-large"/>
                        </div>

                        {/* 查询条件：发布时间(终) */}
                        <div className="custom-input-field col s2 input-field">
                            <DatePicker s={12} label="发布时间(终)" options={sysConst.DATE_PICKER_OPTION}
                                        value={articleManagerReducer.conditionCreatedOnEnd} onChange={this.changeConditionCreatedOnEnd} />
                            {articleManagerReducer.conditionCreatedOnEnd !== '' && <span className="mdi data-clear-icon mdi-window-close" onClick={this.clearConditionCreatedOnEnd}/>}
                            <span className="mdi data-icon mdi-table-large"/>
                        </div>
                    </div>

                    {/* 查询按钮 */}
                    <div className="col s1">
                        <a className="btn-floating btn-large waves-light waves-effect btn query-btn" onClick={this.queryArticleList}>
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
                                <th>文章编号</th>
                                <th>作者昵称</th>
                                <th>发布位置</th>
                                <th>文章类型</th>
                                <th>载体类型</th>
                                <th>评论数</th>
                                <th>点赞数</th>
                                <th className="center">发布时间</th>
                                <th className="center">状态</th>
                                <th className="center">操作</th>
                            </tr>
                            </thead>
                            <tbody>
                            {articleManagerReducer.articleArray.map(function (item) {
                                return (
                                    <tr className="grey-text text-darken-1">
                                        {/* 文章编号 */}
                                        <td>{item._id}</td>
                                        {/* 作者昵称 */}
                                        <td>{item.user_detail_info[0].nick_name}</td>
                                        {/* 发布位置 */}
                                        <td>{item.address_name}</td>
                                        {/* 文章类型 */}
                                        <td>{commonUtil.getJsonValue(sysConst.MESSAGE_TYPE, item.type)}</td>
                                        {/* 载体类型 */}
                                        <td>{commonUtil.getJsonValue(sysConst.CARRIER_TYPE, item.carrier)}</td>

                                        {/* 评论数 */}
                                        <td>{formatUtil.formatNumber(item.comment_num)}</td>
                                        {/* 点赞数 */}
                                        <td>{formatUtil.formatNumber(item.agree_num)}</td>
                                        {/* 发布时间 */}
                                        <td className="center">{formatUtil.getDateTime(item.created_at)}</td>
                                        {/* 状态 */}
                                        <td className="center">{commonUtil.getJsonValue(sysConst.ARTICLE_STATUS, item.status)}</td>
                                        {/* 操作 */}
                                        <td className="operation center">
                                            <i className="mdi mdi-close purple-font pointer margin-right10" onClick={() => {this.deleteArticle(item._id)}}/>
                                            {/* 状态：不可见 */}
                                            {item.status === sysConst.COMMENT_STATUS[0].value &&
                                            <i className="mdi mdi-eye purple-font pointer" onClick={() => {this.changeArticleStatus(item._id,item.status)}}/>}
                                            {/* 状态：可见 */}
                                            {item.status === sysConst.COMMENT_STATUS[1].value &&
                                            <i className="mdi mdi-eye-off purple-font pointer" onClick={() => {this.changeArticleStatus(item._id,item.status)}}/>}

                                            <Link to={{pathname: '/article/' + item._id}}>
                                                <i className="mdi mdi-table-search purple-font margin-left10"/>
                                            </Link>
                                        </td>
                                    </tr>
                                )
                            },this)}
                            {articleManagerReducer.articleArray.length === 0 &&
                            <tr className="grey-text text-darken-1">
                                <td className="no-data-tr" colSpan="10">暂无数据</td>
                            </tr>}
                            </tbody>
                        </table>
                    </div>

                    {/* 上下页按钮 */}
                    <div className="col s12 margin-top10">
                        <div className="right">
                            {articleManagerReducer.start > 0 && articleManagerReducer.dataSize > 0 &&
                            <a className="waves-light waves-effect custom-blue btn margin-right10" id="pre" onClick={this.preBtn}>
                                上一页
                            </a>}
                            {articleManagerReducer.dataSize >= articleManagerReducer.size &&
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
        articleManagerReducer: state.ArticleManagerReducer,
        fromDetail: fromDetail
    }
};

const mapDispatchToProps = (dispatch) => ({
    getArticleList: () => {
        dispatch(articleManagerAction.getArticleList());
    },
    initDetailData: () => {
        dispatch(articleManagerDetailAction.initDetailData());
    },
    setStartNumber: (start) => {
        dispatch(ArticleManagerActionType.setStartNumber(start))
    },

    setConditionArticleId: (value) => {
        dispatch(ArticleManagerActionType.setConditionArticleId(value))
    },
    setConditionNickName: (value) => {
        dispatch(ArticleManagerActionType.setConditionNickName(value))
    },
    changeConditionType: (value) => {
        dispatch(ArticleManagerActionType.setConditionType(value))
    },
    changeConditionCarrier: (value) => {
        dispatch(ArticleManagerActionType.setConditionCarrier(value))
    },
    setConditionCreatedOnStart: (value) => {
        dispatch(ArticleManagerActionType.setConditionCreatedOnStart(value))
    },
    setConditionCreatedOnEnd: (value) => {
        dispatch(ArticleManagerActionType.setConditionCreatedOnEnd(value))
    },

    deleteArticle: (id) => {
        dispatch(articleManagerAction.deleteArticle(id));
    },
    changeArticleStatus: (id, status) => {
        dispatch(articleManagerAction.changeArticleStatus(id, status));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(ArticleManager)