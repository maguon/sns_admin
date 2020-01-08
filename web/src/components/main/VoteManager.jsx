import React from 'react';
import {connect} from 'react-redux';
import {Link} from "react-router-dom";
import {TextInput, DatePicker} from 'react-materialize';
import {VoteManagerActionType} from '../../types';
import Select from "react-select";
import {NewVoteModal} from "../modules";

const voteManagerAction = require('../../actions/main/VoteManagerAction');
const newVoteModalAction = require('../../actions/modules/NewVoteModalAction');
const sysConst = require('../../utils/SysConst');
const formatUtil = require('../../utils/FormatUtil');
const commonUtil = require('../../utils/CommonUtil');

// 投票管理
class VoteManager extends React.Component {

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

            this.props.setConditionVoteId('');
            this.props.setConditionTitle('');
            this.props.setConditionMaxNum('');
            this.props.changeConditionStatus(null);
            this.props.setConditionCreatedOnStart('');
            this.props.setConditionCreatedOnEnd('');
        }
        this.props.getVoteList();
    }

    /**
     * 更新 检索条件：投票编号
     */
    changeConditionVoteId = (event) => {
        this.props.setConditionVoteId(event.target.value);
    };

    /**
     * 更新 检索条件：标题检索
     */
    changeConditionTitle = (event) => {
        this.props.setConditionTitle(event.target.value);
    };

    /**
     * 更新 检索条件：最多选项数
     */
    changeConditionMaxNum = (event) => {
        this.props.setConditionMaxNum(event.target.value);
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
        this.props.getVoteList();
    };

    /**
     * 上一页
     */
    preBtn = () => {
        this.props.setStartNumber(this.props.voteManagerReducer.start - (this.props.voteManagerReducer.size - 1));
        this.props.getVoteList();
    };

    /**
     * 下一页
     */
    nextBtn = () => {
        this.props.setStartNumber(this.props.voteManagerReducer.start + (this.props.voteManagerReducer.size - 1));
        this.props.getVoteList();
    };

    /**
     * 删除文章
     */
    deleteVote = (messageCommentsId) => {
        this.props.deleteVote(messageCommentsId);
    };

    render() {
        const {voteManagerReducer, changeConditionStatus, initVoteModalData} = this.props;
        return (
            <div>
                {/* 标题部分 */}
                <div className="row">
                    <div className="input-field col s12 page-title">
                        <span className="margin-left10">投票管理</span>
                        <div className="divider custom-divider margin-top10"/>
                    </div>
                </div>

                {/* 上部分：检索条件输入区域 */}
                <div className="row grey-text text-darken-1">
                    <div className="col s10 search-condition-box">
                        <TextInput s={2} label="投票编号" value={voteManagerReducer.conditionVoteId} onChange={this.changeConditionVoteId}/>
                        <TextInput s={2} label="标题检索" value={voteManagerReducer.conditionTitle} onChange={this.changeConditionTitle}/>
                        <TextInput s={2} label="最多选项数" type="number" value={voteManagerReducer.conditionMaxNum} onChange={this.changeConditionMaxNum}/>

                        <div className="input-field col s2">
                            <Select
                                options={sysConst.VOTE_STATUS}
                                onChange={changeConditionStatus}
                                value={voteManagerReducer.conditionStatus}
                                isSearchable={false}
                                placeholder={"请选择"}
                                styles={sysConst.CUSTOM_REACT_SELECT_STYLE}
                                isClearable={true}
                            />
                            <label className="active">状态</label>
                        </div>

                        {/* 查询条件：发布时间(始) */}
                        <div className="custom-input-field col s2 input-field">
                            <DatePicker s={12} label="发布时间(始)" options={sysConst.DATE_PICKER_OPTION}
                                        value={voteManagerReducer.conditionCreatedOnStart} onChange={this.changeConditionCreatedOnStart} />
                            {voteManagerReducer.conditionCreatedOnStart !== '' && <span className="mdi data-clear-icon mdi-window-close" onClick={this.clearConditionCreatedOnStart}/>}
                            <span className="mdi data-icon mdi-table-large"/>
                        </div>

                        {/* 查询条件：发布时间(终) */}
                        <div className="custom-input-field col s2 input-field">
                            <DatePicker s={12} label="发布时间(终)" options={sysConst.DATE_PICKER_OPTION}
                                        value={voteManagerReducer.conditionCreatedOnEnd} onChange={this.changeConditionCreatedOnEnd} />
                            {voteManagerReducer.conditionCreatedOnEnd !== '' && <span className="mdi data-clear-icon mdi-window-close" onClick={this.clearConditionCreatedOnEnd}/>}
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
                        <a className="btn-floating btn-large waves-light waves-effect btn add-btn modal-trigger" href="#newVoteModal" onClick={initVoteModalData}>
                            <i className="mdi mdi-plus"/>
                        </a>
                    </div>
                    <NewVoteModal/>
                </div>

                {/* 下部分：检索结果显示区域 */}
                <div className="row">
                    <div className="col s12">
                        <table className="bordered striped">
                            <thead className="custom-dark-grey table-top-line">
                            <tr className="grey-text text-darken-2">
                                <th>投票编号</th>
                                <th>最多选项数</th>
                                <th>投票标题</th>
                                <th>参与人数</th>
                                <th>发布人</th>
                                <th className="center">发布时间</th>
                                <th className="center">截止时间</th>
                                <th className="center">状态</th>
                                <th className="center">操作</th>
                            </tr>
                            </thead>
                            <tbody>
                            {voteManagerReducer.voteArray.map(function (item) {
                                return (
                                    <tr className="grey-text text-darken-1">
                                        {/* 投票编号 */}
                                        <td>{item._id}</td>
                                        {/* 最多选项数 */}
                                        <td>{formatUtil.formatNumber(item.max_num)}</td>
                                        {/* 投票标题 */}
                                        <td>{item.title}</td>
                                        {/* 参与人数 */}
                                        <td>{formatUtil.formatNumber(item.participants_num)}</td>
                                        {/* 发布人 */}
                                        <td>{item.admin_info[0].name}</td>

                                        {/* 发布时间 */}
                                        <td className="center">{formatUtil.getDateTime(item.created_at)}</td>
                                        {/* 截止时间 */}
                                        <td className="center">{formatUtil.getDateTime(item.end_time)}</td>
                                        {/* 状态 */}
                                        <td className="center">{commonUtil.getJsonValue(sysConst.VOTE_STATUS, item.status)}</td>
                                        {/* 操作 */}
                                        <td className="operation center">
                                            <i className="mdi mdi-close purple-font pointer margin-right10" onClick={() => {this.deleteVote(item._id)}}/>
                                            <Link to={{pathname: '/vote/' + item._id}}>
                                                <i className="mdi mdi-table-search purple-font margin-left10"/>
                                            </Link>
                                        </td>
                                    </tr>
                                )
                            },this)}
                            {voteManagerReducer.voteArray.length === 0 &&
                            <tr className="grey-text text-darken-1">
                                <td className="no-data-tr" colSpan="9">暂无数据</td>
                            </tr>}
                            </tbody>
                        </table>
                    </div>

                    {/* 上下页按钮 */}
                    <div className="col s12 margin-top10">
                        <div className="right">
                            {voteManagerReducer.start > 0 && voteManagerReducer.dataSize > 0 &&
                            <a className="waves-light waves-effect custom-blue btn margin-right10" id="pre" onClick={this.preBtn}>
                                上一页
                            </a>}
                            {voteManagerReducer.dataSize >= voteManagerReducer.size &&
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
        voteManagerReducer: state.VoteManagerReducer,
        fromDetail: fromDetail
    }
};

const mapDispatchToProps = (dispatch) => ({
    getVoteList: () => {
        dispatch(voteManagerAction.getVoteList());
    },
    setStartNumber: (start) => {
        dispatch(VoteManagerActionType.setStartNumber(start))
    },

    setConditionVoteId: (value) => {
        dispatch(VoteManagerActionType.setConditionVoteId(value))
    },
    setConditionTitle: (value) => {
        dispatch(VoteManagerActionType.setConditionTitle(value))
    },
    setConditionMaxNum: (value) => {
        dispatch(VoteManagerActionType.setConditionMaxNum(value))
    },
    changeConditionStatus: (value) => {
        dispatch(VoteManagerActionType.setConditionStatus(value))
    },
    setConditionCreatedOnStart: (value) => {
        dispatch(VoteManagerActionType.setConditionCreatedOnStart(value))
    },
    setConditionCreatedOnEnd: (value) => {
        dispatch(VoteManagerActionType.setConditionCreatedOnEnd(value))
    },
    initVoteModalData: () => {
        dispatch(newVoteModalAction.initNewVoteModal());
    },
    deleteVote: (id) => {
        dispatch(voteManagerAction.deleteVote(id));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(VoteManager)