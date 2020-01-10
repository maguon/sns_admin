import React from 'react';
import {connect} from 'react-redux';
import {Link} from "react-router-dom";
import {DatePicker, Textarea, TextInput} from 'react-materialize';
import {VoteManagerDetailActionType} from "../../types";
import {VoteDetailModal} from "../modules";

const voteManagerDetailAction = require('../../actions/main/VoteManagerDetailAction');
const voteDetailModalAction = require('../../actions/modules/VoteDetailModalAction');
const sysConst = require('../../utils/SysConst');
const formatUtil = require('../../utils/FormatUtil');
const commonUtil = require('../../utils/CommonUtil');

class VoteManagerDetail extends React.Component {

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
        // 取得投票基本信息
        this.props.getVoteInfo();
    }

    /**
     * 更新 标题
     */
    changeVoteTitle = (event) => {
        this.props.setVoteTitle(event.target.value);
    };

    /**
     * 更新 投票内容
     */
    changeVoteInfo = (event) => {
        this.props.setVoteInfo(event.target.value);
    };

    /**
     * 更新 最多选项数
     */
    changeVoteMaxNum = (event) => {
        this.props.setVoteMaxNum(event.target.value);
    };

    /**
     * 更新 检索条件：开始时间
     */
    changeVoteStartTime = (value) => {
        this.props.setVoteStartTime(formatUtil.getDate(value));
    };
    clearVoteStartTime = () => {
        this.props.setVoteStartTime('');
    };

    /**
     * 更新 检索条件：结束时间
     */
    changeVoteEndTime = (value) => {
        this.props.setVoteEndTime(formatUtil.getDate(value));
    };
    clearVoteEndTime = () => {
        this.props.setVoteEndTime('');
    };

    /**
     * 更新 输入投票选项
     */
    changeVoteInputOption = (event) => {
        this.props.setVoteInputOption(event.target.value);
    };

    /**
     * 添加 输入投票选项
     */
    addVoteOption = () => {
        // 输入投票选项列表
        let options = this.props.voteManagerDetailReducer.options;
        // 输入投票选项内容
        let inputOption = this.props.voteManagerDetailReducer.inputOption.trim();

        if (inputOption === '') {
            swal('', '投票选项内容不能为空！', 'warning');
        } else {
            // 将当前 输入投票选项 添加到数组
            options.push({txt: inputOption});
            // 清空 输入投票选项
            this.props.setVoteInputOption('');
            // 更新 输入投票选项列表
            this.props.setVoteOptions(options);
        }
    };

    /**
     * 修改指定投票选项
     */
    changeVoteOption = (event, optionIdx) => {
        // 输入投票选项列表
        let options = this.props.voteManagerDetailReducer.options;
        // 将当前 输入投票选项 添加到数组
        options.splice(optionIdx, 1, {txt: event.target.value});
        // 更新 输入投票选项列表
        this.props.setVoteOptions(options);
    };

    /**
     * 删除指定 输入投票选项
     * @param index 删除数组索引
     */
    deleteVote = (index) => {
        let options = this.props.voteManagerDetailReducer.options;
        options.splice(index, 1);
        this.props.setVoteOptions(options);
    };


    /**
     * 显示 投票详情 画面
     * @param pageType 画面区分
     */
    initVoteDetailModal = (pageType) => {
        this.props.initVoteDetailData(pageType);
    };

    render() {
        const {voteManagerDetailReducer, saveVote} = this.props;
        return (
            <div>
                {/* 标题部分 */}
                <div className="row margin-bottom0">
                    <div className="input-field col s12">
                        <Link to={{pathname: '/vote', state: {fromDetail: true}}}>
                            <a className="btn-floating btn waves-effect custom-blue waves-light fz15">
                                <i className="mdi mdi-arrow-left-bold"/>
                            </a>
                        </Link>
                        <span className="page-title margin-left30">投票管理 - 投票详情</span>
                        <div className="divider custom-divider margin-top10"/>
                    </div>
                </div>

                {voteManagerDetailReducer.voteInfo.length > 0 &&
                <div>
                    {/* 投票状态：未开启 */}
                    {voteManagerDetailReducer.voteInfo[0].status == sysConst.VOTE_STATUS[0].value &&
                    <div className="row margin-top10 padding-left50 padding-right50">
                        {/* 上部分基本信息 */}
                        <div className="col s1"></div>
                        <div className="col s11">
                            <div className="col s8">{voteManagerDetailReducer.voteInfo[0].admin_info[0].name}</div>
                            <div className="col s4 right-align pink-font">{commonUtil.getJsonValue(sysConst.VOTE_STATUS, voteManagerDetailReducer.voteInfo[0].status)}</div>
                            <div className="col s12 margin-top10">创建时间：{formatUtil.getDateTime(voteManagerDetailReducer.voteInfo[0].created_at)}</div>
                        </div>
                        {/* 分割线 */}
                        <div className="col s12 no-padding"><div className="col s12 margin-top10 margin-bottom15 divider"/></div>

                        <TextInput s={12} label="标题" maxLength="30" value={voteManagerDetailReducer.title} onChange={this.changeVoteTitle}/>
                        <Textarea s={12} label="内容" maxLength="200" value={voteManagerDetailReducer.info} onChange={this.changeVoteInfo}/>

                        <TextInput s={4} label="最多选项数" type="number" value={voteManagerDetailReducer.maxNum} onChange={this.changeVoteMaxNum}/>

                        <div className="custom-input-field col s4 input-field">
                            <DatePicker s={12} label="开始时间" options={sysConst.DATE_PICKER_OPTION} value={voteManagerDetailReducer.startTime} onChange={this.changeVoteStartTime} />
                            {voteManagerDetailReducer.startTime !== '' && <span className="mdi data-clear-icon mdi-window-close" onClick={this.clearVoteStartTime}/>}
                            <span className="mdi data-icon mdi-table-large"/>
                        </div>

                        <div className="custom-input-field col s4 input-field">
                            <DatePicker s={12} label="结束时间" options={sysConst.DATE_PICKER_OPTION} value={voteManagerDetailReducer.endTime} onChange={this.changeVoteEndTime} />
                            {voteManagerDetailReducer.endTime !== '' && <span className="mdi data-clear-icon mdi-window-close" onClick={this.clearVoteEndTime}/>}
                            <span className="mdi data-icon mdi-table-large"/>
                        </div>

                        <TextInput s={11} label="投票选项" maxLength="50" value={voteManagerDetailReducer.inputOption} onChange={this.changeVoteInputOption}/>
                        {/* 追加按钮 */}
                        <div className="input-field col s1 right-align">
                            <a className="btn-floating btn-small waves-light waves-effect btn add-btn" onClick={() => {this.addVoteOption()}}>
                                <i className="mdi mdi-plus"/>
                            </a>
                        </div>

                        {voteManagerDetailReducer.options.length > 0 &&
                        <div className="col s12 detail-box padding-bottom10">
                            {voteManagerDetailReducer.options.map(function (item, key) {
                                return (
                                    <div className="no-helper-input">
                                        {/* 投票选项内容 */}
                                        <TextInput s={11} maxLength="50" className="no-margin" value={item.txt} onChange={(e) => {this.changeVoteOption(e, key)}}/>
                                        {/* 删除按钮 */}
                                        <div className="col s1 right-align margin-top30">
                                            <i className="mdi mdi-close purple-font pointer small-icon" onClick={() => {this.deleteVote(key)}}/>
                                        </div>
                                    </div>
                                )
                            },this)}
                        </div>}

                        <div className="col s12 right-align margin-top40">
                            <button type="button" className="btn confirm-btn" onClick={saveVote}>确定</button>
                        </div>
                    </div>}

                    {/* 投票状态：进行中 已结束 */}
                    {voteManagerDetailReducer.voteInfo[0].status != sysConst.VOTE_STATUS[0].value &&
                    <div className="row margin-top10 padding-left50 padding-right50">
                        {/* 上部分基本信息 */}
                        <div className="col s1"></div>
                        <div className="col s11">
                            <div className="col s8">{voteManagerDetailReducer.voteInfo[0].admin_info[0].name}</div>
                            <div className="col s4 right-align pink-font">{commonUtil.getJsonValue(sysConst.VOTE_STATUS, voteManagerDetailReducer.voteInfo[0].status)}</div>
                            <div className="col s4 margin-top10">创建时间：{formatUtil.getDateTime(voteManagerDetailReducer.voteInfo[0].created_at)}</div>
                            <div className="col s3 margin-top10">最多选项数：{voteManagerDetailReducer.voteInfo[0].max_num}</div>
                            <div className="col s5 margin-top10 right-align">
                                投票时间：{formatUtil.getDate(voteManagerDetailReducer.voteInfo[0].start_time)} 至 {formatUtil.getDate(voteManagerDetailReducer.voteInfo[0].end_time)}
                            </div>
                        </div>
                        {/* 分割线 */}
                        <div className="col s12 no-padding"><div className="col s12 margin-top10 margin-bottom15 divider"/></div>

                        {/* 投票标题 */}
                        <div className="col s12 bold-font">{voteManagerDetailReducer.voteInfo[0].title}</div>
                        {/* 投票内容 */}
                        <div className="col s12 margin-top10">{voteManagerDetailReducer.voteInfo[0].info}</div>
                        {/* 分割线 */}
                        <div className="col s12 no-padding"><div className="col s12 margin-top10 margin-bottom15 divider"/></div>
                        {/* 参与人数 */}
                        <div className="col s12 right-align">
                            <a className="modal-trigger grey-text text-darken-3" href="#voteDetailModal" onClick={() => {this.initVoteDetailModal('total')}}>
                                参与人数：{formatUtil.formatNumber(voteManagerDetailReducer.voteInfo[0].participants_num)}
                            </a>
                        </div>
                        <VoteDetailModal/>

                        {/* 投票选项明细 */}
                        {voteManagerDetailReducer.options.map(function (item, key) {
                            return (
                                <div className="col s12 grey-text text-darken-1 margin-top10 no-padding">
                                    {/* 投票选项内容 */}
                                    <div className="col s9">{item.txt}</div>
                                    {/* 投票数 */}
                                    <div className="col s3 right-align">
                                        <a className="modal-trigger grey-text text-darken-3" href="#voteDetailModal" onClick={() => {this.initVoteDetailModal('single')}}>
                                            {formatUtil.formatNumber(item.voteNum)}票
                                        </a>
                                    </div>
                                    {/* 分割线 */}
                                    <div className="col s12 no-padding"><div className="col s12 margin-top5 divider"/></div>
                                </div>
                            )
                        },this)}
                    </div>}
                </div>}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        voteManagerDetailReducer: state.VoteManagerDetailReducer
    }
};

const mapDispatchToProps = (dispatch, ownProps) => ({
    // 基本信息
    getVoteInfo: () => {
        dispatch(voteManagerDetailAction.getVoteInfo(ownProps.match.params.id))
    },

    setVoteTitle: (value) => {
        dispatch(VoteManagerDetailActionType.setVoteTitle(value));
    },
    setVoteInfo: (value) => {
        dispatch(VoteManagerDetailActionType.setVoteInfo(value));
    },
    setVoteMaxNum: (value) => {
        dispatch(VoteManagerDetailActionType.setVoteMaxNum(value));
    },
    setVoteStartTime: (value) => {
        dispatch(VoteManagerDetailActionType.setVoteStartTime(value));
    },
    setVoteEndTime: (value) => {
        dispatch(VoteManagerDetailActionType.setVoteEndTime(value));
    },
    setVoteInputOption: (value) => {
        dispatch(VoteManagerDetailActionType.setVoteInputOption(value));
    },
    setVoteOptions: (value) => {
        dispatch(VoteManagerDetailActionType.setVoteOptions(value));
    },

    saveVote: () => {
        dispatch(voteManagerDetailAction.saveVote(ownProps.match.params.id));
    },
    initVoteDetailData: (pageType) => {
        dispatch(voteDetailModalAction.initVoteDetailData(pageType));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(VoteManagerDetail)