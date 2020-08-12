import React from 'react';
import {connect} from 'react-redux';
import {Link} from "react-router-dom";
import {DatePicker, Tab, Tabs, Textarea, TextInput} from 'react-materialize';
import {VoteManagerDetailActionType} from "../../types";
import Select from "react-select";

const voteManagerDetailAction = require('../../actions/main/VoteManagerDetailAction');
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
        // 默认第一页
        this.props.setStartNumber(0);
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
     * 更新 检索条件：用户电话
     */
    changeConditionPhone = (event) => {
        this.props.setConditionPhone(event.target.value);
    };

    /**
     * 查询用户投票列表
     */
    queryUserVoteList = () => {
        // 默认第一页
        this.props.setStartNumber(0);
        this.props.getUserVoteList();
    };

    /**
     * 上一页
     */
    preBtn = () => {
        this.props.setStartNumber(this.props.voteManagerDetailReducer.start - (this.props.voteManagerDetailReducer.size - 1));
        this.props.getUserVoteList();
    };

    /**
     * 下一页
     */
    nextBtn = () => {
        this.props.setStartNumber(this.props.voteManagerDetailReducer.start + (this.props.voteManagerDetailReducer.size - 1));
        this.props.getUserVoteList();
    };

    render() {
        const {voteManagerDetailReducer, saveVote, changeConditionVoteItem} = this.props;
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

                        <div className="col s12 margin-top10">
                            <Tabs className='tab-demo z-depth-1'>
                                <Tab title="投票结果">
                                    {/* 参与人数 */}
                                    <div className="col s12 right-align margin-top10">
                                        参与人数：{formatUtil.formatNumber(voteManagerDetailReducer.voteInfo[0].participants_num)}
                                    </div>
                                    {/* 投票选项明细 */}
                                    {voteManagerDetailReducer.options.map(function (item, key) {
                                        return (
                                            <div className="col s12 grey-text text-darken-1 margin-top10 no-padding">
                                                {/* 投票选项内容 */}
                                                <div className="col s9">{item.txt}</div>
                                                {/* 投票数 */}
                                                <div className="col s3 right-align">{formatUtil.formatNumber(item.num)}票</div>
                                                {/* 分割线 */}
                                                <div className="col s12 no-padding"><div className="col s12 margin-top5 divider"/></div>
                                            </div>
                                        )
                                    },this)}
                                </Tab>

                                <Tab title="参与人投票详情" idx="1002">
                                    {/* 上部分：检索条件输入区域 */}
                                    <div className="row grey-text text-darken-1 margin-top20 margin-bottom0">
                                        <div className="col s11 search-condition-box">
                                            <TextInput s={4} label="用户手机" value={voteManagerDetailReducer.conditionPhone} onChange={this.changeConditionPhone}/>

                                            <div className="input-field col s4">
                                                <Select
                                                    options={voteManagerDetailReducer.voteItemList}
                                                    onChange={changeConditionVoteItem}
                                                    value={voteManagerDetailReducer.conditionVoteItem}
                                                    isSearchable={false}
                                                    placeholder={"请选择"}
                                                    styles={sysConst.CUSTOM_REACT_SELECT_STYLE}
                                                    isClearable={true}
                                                />
                                                <label className="active">投票选项</label>
                                            </div>

                                        </div>

                                        {/* 查询按钮 */}
                                        <div className="col s1">
                                            <a className="btn-floating btn-large waves-light waves-effect btn query-btn" onClick={this.queryUserVoteList}>
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
                                                    <th>投票用户昵称</th>
                                                    <th>投票数</th>
                                                    <th>投票选项</th>
                                                    <th className="center">投票时间</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                {voteManagerDetailReducer.userVoteList.map(function (item) {
                                                    return (
                                                        <tr className="grey-text text-darken-1">
                                                            {/* 投票用户昵称 */}
                                                            <td>{item.user_detail_info[0].nick_name}</td>
                                                            {/* 投票数 */}
                                                            <td>{formatUtil.formatNumber(item.option_item.length)}</td>
                                                            {/* 投票选项 */}
                                                            <td>{item.option_item.map((n) => n.index).toString()}</td>
                                                            {/* 投票时间 */}
                                                            <td className="center">{formatUtil.getDateTime(item.created_at)}</td>
                                                        </tr>
                                                    )
                                                },this)}
                                                {voteManagerDetailReducer.userVoteList.length === 0 &&
                                                <tr className="grey-text text-darken-1">
                                                    <td className="no-data-tr" colSpan="4">暂无数据</td>
                                                </tr>}
                                                </tbody>
                                            </table>
                                        </div>

                                        {/* 上下页按钮 */}
                                        <div className="col s12 margin-top10">
                                            <div className="right">
                                                {voteManagerDetailReducer.start > 0 && voteManagerDetailReducer.dataSize > 0 &&
                                                <a className="waves-light waves-effect custom-blue btn margin-right10" id="pre" onClick={this.preBtn}>
                                                    上一页
                                                </a>}
                                                {voteManagerDetailReducer.dataSize >= voteManagerDetailReducer.size &&
                                                <a className="waves-light waves-effect custom-blue btn" id="next" onClick={this.nextBtn}>
                                                    下一页
                                                </a>}
                                            </div>
                                        </div>
                                    </div>
                                </Tab>
                            </Tabs>
                        </div>

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

    setStartNumber: (start) => {
        dispatch(VoteManagerDetailActionType.setStartNumber(start))
    },
    setConditionPhone: (value) => {
        dispatch(VoteManagerDetailActionType.setConditionPhone(value));
    },
    changeConditionVoteItem: (value) => {
        dispatch(VoteManagerDetailActionType.setConditionVoteItem(value));
    },
    getUserVoteList: () => {
        dispatch(voteManagerDetailAction.getUserVoteList(ownProps.match.params.id));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(VoteManagerDetail)