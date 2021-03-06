import React from 'react';
import {connect} from 'react-redux';
import {Link} from "react-router-dom";
import {TextInput, DatePicker} from 'react-materialize';
import {FakeArticleManagerActionType} from '../../types';
import Select from "react-select";
import {NewFakeArticleModal} from "../modules";

const fakeArticleManagerAction = require('../../actions/main/FakeArticleManagerAction');
const fakeArticleManagerDetailAction = require('../../actions/main/FakeArticleManagerDetailAction');
const newFakeArticleModalAction = require('../../actions/modules/NewFakeArticleModalAction');
const commonAction = require('../../actions/layout/CommonAction');
const sysConst = require('../../utils/SysConst');
const formatUtil = require('../../utils/FormatUtil');
const commonUtil = require('../../utils/CommonUtil');

// Fake文章管理
class FakeArticleManager extends React.Component {

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
        this.props.getFakeUserList();
        if (!this.props.fromDetail) {
            this.props.setStartNumber(0);

            this.props.setConditionArticleId('');
            this.props.changeConditionFakeUser(null);
            this.props.changeConditionType(null);
            this.props.changeConditionCarrier(null);
            this.props.setConditionCreatedOnStart('');
            this.props.setConditionCreatedOnEnd('');
        }
        this.props.getFakeArticleList();
        this.props.initDetailData();
    }

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
    queryArticleList = () => {
        // 默认第一页
        this.props.setStartNumber(0);
        this.props.getFakeArticleList();
    };

    /**
     * 上一页
     */
    preBtn = () => {
        this.props.setStartNumber(this.props.fakeArticleManagerReducer.start - (this.props.fakeArticleManagerReducer.size - 1));
        this.props.getFakeArticleList();
    };

    /**
     * 下一页
     */
    nextBtn = () => {
        this.props.setStartNumber(this.props.fakeArticleManagerReducer.start + (this.props.fakeArticleManagerReducer.size - 1));
        this.props.getFakeArticleList();
    };

    /**
     * 修改文章状态
     */
    changeArticleStatus = (messageCommentsId, status) => {
        this.props.changeArticleStatus(messageCommentsId, status);
    };

    render() {
        const {fakeArticleManagerReducer, commonReducer, changeConditionFakeUser, changeConditionType, changeConditionCarrier, initModalData} = this.props;
        return (
            <div>
                {/* 标题部分 */}
                <div className="row">
                    <div className="input-field col s12 page-title">
                        <span className="margin-left10">Fake文章管理</span>
                        <div className="divider custom-divider margin-top10"/>
                    </div>
                </div>

                {/* 上部分：检索条件输入区域 */}
                <div className="row grey-text text-darken-1">
                    <div className="col s10 search-condition-box">
                        <TextInput s={2} label="文章编号" value={fakeArticleManagerReducer.conditionArticleId} onChange={this.changeConditionArticleId}/>
                        <div className="input-field col s2">
                            <Select
                                options={commonReducer.fakeUserList}
                                onChange={changeConditionFakeUser}
                                value={fakeArticleManagerReducer.conditionFakeUser}
                                isSearchable={false}
                                placeholder={"请选择"}
                                noOptionsMessage={() => "无"}
                                styles={sysConst.CUSTOM_REACT_SELECT_STYLE}
                                isClearable={true}
                            />
                            <label className="active">Fake用户</label>
                        </div>

                        <div className="input-field col s2">
                            <Select
                                options={sysConst.MESSAGE_TYPE}
                                onChange={changeConditionType}
                                value={fakeArticleManagerReducer.conditionType}
                                isSearchable={false}
                                placeholder={"请选择"}
                                styles={sysConst.CUSTOM_REACT_SELECT_STYLE}
                                isClearable={true}
                            />
                            <label className="active">文章类型</label>
                        </div>
                        <div className="input-field col s2">
                            <Select
                                options={sysConst.FAKE_CARRIER_TYPE}
                                onChange={changeConditionCarrier}
                                value={fakeArticleManagerReducer.conditionCarrier}
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
                                        value={fakeArticleManagerReducer.conditionCreatedOnStart} onChange={this.changeConditionCreatedOnStart} />
                            {fakeArticleManagerReducer.conditionCreatedOnStart !== '' && <span className="mdi data-clear-icon mdi-window-close" onClick={this.clearConditionCreatedOnStart}/>}
                            <span className="mdi data-icon mdi-table-large"/>
                        </div>

                        {/* 查询条件：发布时间(终) */}
                        <div className="custom-input-field col s2 input-field">
                            <DatePicker s={12} label="发布时间(终)" options={sysConst.DATE_PICKER_OPTION}
                                        value={fakeArticleManagerReducer.conditionCreatedOnEnd} onChange={this.changeConditionCreatedOnEnd} />
                            {fakeArticleManagerReducer.conditionCreatedOnEnd !== '' && <span className="mdi data-clear-icon mdi-window-close" onClick={this.clearConditionCreatedOnEnd}/>}
                            <span className="mdi data-icon mdi-table-large"/>
                        </div>
                    </div>

                    {/* 查询按钮 */}
                    <div className="col s1">
                        <a className="btn-floating btn-large waves-light waves-effect btn query-btn" onClick={this.queryArticleList}>
                            <i className="mdi mdi-magnify"/>
                        </a>
                    </div>

                    {/* 追加按钮 */}
                    <div className="col s1">
                        <a className="btn-floating btn-large waves-light waves-effect btn add-btn modal-trigger" href="#newFakeUserArticle" onClick={initModalData}>
                            <i className="mdi mdi-plus"/>
                        </a>
                    </div>
                    <NewFakeArticleModal/>
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
                            {fakeArticleManagerReducer.articleArray.map(function (item) {
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
                                        <td>{commonUtil.getJsonValue(sysConst.FAKE_CARRIER_TYPE, item.carrier)}</td>

                                        {/* 评论数 */}
                                        <td>{formatUtil.formatNumber(item.comments_num)}</td>
                                        {/* 点赞数 */}
                                        <td>{formatUtil.formatNumber(item.agree_num)}</td>
                                        {/* 发布时间 */}
                                        <td className="center">{formatUtil.getDateTime(item.created_at)}</td>
                                        {/* 状态 */}
                                        <td className="center">{commonUtil.getJsonValue(sysConst.ARTICLE_STATUS, item.status)}</td>
                                        {/* 操作 */}
                                        <td className="operation center">
                                            {/* 状态：不可见 */}
                                            {item.status === sysConst.COMMENT_STATUS[0].value &&
                                            <i className="mdi mdi-eye purple-font pointer" onClick={() => {this.changeArticleStatus(item._id,item.status)}}/>}
                                            {/* 状态：可见 */}
                                            {item.status === sysConst.COMMENT_STATUS[1].value &&
                                            <i className="mdi mdi-eye-off purple-font pointer" onClick={() => {this.changeArticleStatus(item._id,item.status)}}/>}

                                            <Link to={{pathname: '/fake_article/' + item._id}}>
                                                <i className="mdi mdi-table-search purple-font margin-left10"/>
                                            </Link>
                                        </td>
                                    </tr>
                                )
                            },this)}
                            {fakeArticleManagerReducer.articleArray.length === 0 &&
                            <tr className="grey-text text-darken-1">
                                <td className="no-data-tr" colSpan="10">暂无数据</td>
                            </tr>}
                            </tbody>
                        </table>
                    </div>

                    {/* 上下页按钮 */}
                    <div className="col s12 margin-top10">
                        <div className="right">
                            {fakeArticleManagerReducer.start > 0 && fakeArticleManagerReducer.dataSize > 0 &&
                            <a className="waves-light waves-effect custom-blue btn margin-right10" id="pre" onClick={this.preBtn}>
                                上一页
                            </a>}
                            {fakeArticleManagerReducer.dataSize >= fakeArticleManagerReducer.size &&
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
        fakeArticleManagerReducer: state.FakeArticleManagerReducer,
        commonReducer: state.CommonReducer,
        fromDetail: fromDetail
    }
};

const mapDispatchToProps = (dispatch) => ({
    getFakeArticleList: () => {
        dispatch(fakeArticleManagerAction.getFakeArticleList());
    },
    initDetailData: () => {
        dispatch(fakeArticleManagerDetailAction.initDetailData());
    },
    getFakeUserList: () => {
        dispatch(commonAction.getFakeUserList());
    },

    setStartNumber: (start) => {
        dispatch(FakeArticleManagerActionType.setStartNumber(start))
    },

    setConditionArticleId: (value) => {
        dispatch(FakeArticleManagerActionType.setConditionArticleId(value))
    },
    changeConditionFakeUser: (value) => {
        dispatch(FakeArticleManagerActionType.setConditionFakeUser(value))
    },
    changeConditionType: (value) => {
        dispatch(FakeArticleManagerActionType.setConditionType(value))
    },
    changeConditionCarrier: (value) => {
        dispatch(FakeArticleManagerActionType.setConditionCarrier(value))
    },
    setConditionCreatedOnStart: (value) => {
        dispatch(FakeArticleManagerActionType.setConditionCreatedOnStart(value))
    },
    setConditionCreatedOnEnd: (value) => {
        dispatch(FakeArticleManagerActionType.setConditionCreatedOnEnd(value))
    },

    changeArticleStatus: (id, status) => {
        dispatch(fakeArticleManagerAction.changeArticleStatus(id, status));
    },
    initModalData: () => {
        dispatch(newFakeArticleModalAction.initNewFakeArticleModal());
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(FakeArticleManager)