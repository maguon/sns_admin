import React from 'react';
import {connect} from 'react-redux';
import {Link} from "react-router-dom";
import {DatePicker} from 'react-materialize';
import {ReportManagerActionType} from '../../types';
import Select from "react-select";

const reportManagerAction = require('../../actions/main/ReportManagerAction');
const sysConst = require('../../utils/SysConst');
const formatUtil = require('../../utils/FormatUtil');
const commonUtil = require('../../utils/CommonUtil');

// 举报管理
class ReportManager extends React.Component {

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

            this.props.changeConditionStatus(null);
            this.props.changeConditionValidResults(null);
            this.props.setConditionCreatedOnStart('');
            this.props.setConditionCreatedOnEnd('');
        }
        this.props.getReportList();
    }

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
     * 查询举报列表
     */
    queryReportList = () => {
        // 默认第一页
        this.props.setStartNumber(0);
        this.props.getReportList();
    };

    /**
     * 上一页
     */
    preBtn = () => {
        this.props.setStartNumber(this.props.reportManagerReducer.start - (this.props.reportManagerReducer.size - 1));
        this.props.getReportList();
    };

    /**
     * 下一页
     */
    nextBtn = () => {
        this.props.setStartNumber(this.props.reportManagerReducer.start + (this.props.reportManagerReducer.size - 1));
        this.props.getReportList();
    };

    render() {
        const {reportManagerReducer, changeConditionStatus, changeConditionValidResults} = this.props;
        return (
            <div>
                {/* 标题部分 */}
                <div className="row">
                    <div className="input-field col s12 page-title">
                        <span className="margin-left10">举报管理</span>
                        <div className="divider custom-divider margin-top10"/>
                    </div>
                </div>

                {/* 上部分：检索条件输入区域 */}
                <div className="row grey-text text-darken-1">
                    <div className="col s11 search-condition-box">
                        <div className="input-field col s3">
                            <Select
                                options={sysConst.REPORT_STATUS}
                                onChange={changeConditionStatus}
                                value={reportManagerReducer.conditionStatus}
                                isSearchable={false}
                                placeholder={"请选择"}
                                styles={sysConst.CUSTOM_REACT_SELECT_STYLE}
                                isClearable={true}
                            />
                            <label className="active">处理状态</label>
                        </div>
                        <div className="input-field col s3">
                            <Select
                                options={sysConst.REPORT_VALID_RESULT}
                                onChange={changeConditionValidResults}
                                value={reportManagerReducer.conditionValidResults}
                                isSearchable={false}
                                placeholder={"请选择"}
                                styles={sysConst.CUSTOM_REACT_SELECT_STYLE}
                                isClearable={true}
                            />
                            <label className="active">处理结果</label>
                        </div>

                        {/* 查询条件：发布时间(始) */}
                        <div className="custom-input-field col s3 input-field">
                            <DatePicker s={12} label="发布时间(始)" options={sysConst.DATE_PICKER_OPTION}
                                        value={reportManagerReducer.conditionCreatedOnStart} onChange={this.changeConditionCreatedOnStart} />
                            {reportManagerReducer.conditionCreatedOnStart !== '' && <span className="mdi data-clear-icon mdi-window-close" onClick={this.clearConditionCreatedOnStart}/>}
                            <span className="mdi data-icon mdi-table-large"/>
                        </div>

                        {/* 查询条件：发布时间(终) */}
                        <div className="custom-input-field col s3 input-field">
                            <DatePicker s={12} label="发布时间(终)" options={sysConst.DATE_PICKER_OPTION}
                                        value={reportManagerReducer.conditionCreatedOnEnd} onChange={this.changeConditionCreatedOnEnd} />
                            {reportManagerReducer.conditionCreatedOnEnd !== '' && <span className="mdi data-clear-icon mdi-window-close" onClick={this.clearConditionCreatedOnEnd}/>}
                            <span className="mdi data-icon mdi-table-large"/>
                        </div>
                    </div>

                    {/* 查询按钮 */}
                    <div className="col s1">
                        <a className="btn-floating btn-large waves-light waves-effect btn query-btn" onClick={this.queryReportList}>
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
                                <th>举报人昵称</th>
                                <th className="text-ellipsis" style={{width: '360px'}}>举报内容</th>
                                <th className="center">举报时间</th>
                                <th className="center">处理时间</th>
                                <th className="center">状态</th>
                                <th className="center">结果</th>
                                <th className="center">操作</th>
                            </tr>
                            </thead>
                            <tbody>
                            {reportManagerReducer.reportArray.map(function (item) {
                                return (
                                    <tr className="grey-text text-darken-1">
                                        {/* 举报人昵称 */}
                                        <td>{item.user_detail_info[0].nick_name}</td>
                                        {/* 举报内容 */}
                                        <td className="text-ellipsis" style={{width: '360px'}}>{item.remarks}</td>
                                        {/* 举报时间 */}
                                        <td className="center">{formatUtil.getDateTime(item.created_at)}</td>
                                        {/* 处理时间 */}
                                        <td className="center">{item.status === sysConst.REPORT_STATUS[0].value ? '' : formatUtil.getDateTime(item.created_at)}</td>
                                        {/* 状态 */}
                                        <td className="center">{commonUtil.getJsonValue(sysConst.REPORT_STATUS, item.status)}</td>
                                        {/* 结果 */}
                                        <td className="center">{commonUtil.getJsonValue(sysConst.REPORT_VALID_RESULT, item.valid_results)}</td>
                                        {/* 操作 */}
                                        <td className="operation center">
                                            <Link to={{pathname: '/report/' + item._id}}>
                                                <i className="mdi mdi-table-search purple-font margin-left10"/>
                                            </Link>
                                        </td>
                                    </tr>
                                )
                            },this)}
                            {reportManagerReducer.reportArray.length === 0 &&
                            <tr className="grey-text text-darken-1">
                                <td className="no-data-tr" colSpan="7">暂无数据</td>
                            </tr>}
                            </tbody>
                        </table>
                    </div>

                    {/* 上下页按钮 */}
                    <div className="col s12 margin-top10">
                        <div className="right">
                            {reportManagerReducer.start > 0 && reportManagerReducer.dataSize > 0 &&
                            <a className="waves-light waves-effect custom-blue btn margin-right10" id="pre" onClick={this.preBtn}>
                                上一页
                            </a>}
                            {reportManagerReducer.dataSize >= reportManagerReducer.size &&
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
        reportManagerReducer: state.ReportManagerReducer,
        fromDetail: fromDetail
    }
};

const mapDispatchToProps = (dispatch) => ({
    getReportList: () => {
        dispatch(reportManagerAction.getReportList());
    },
    setStartNumber: (start) => {
        dispatch(ReportManagerActionType.setStartNumber(start))
    },
    changeConditionStatus: (value) => {
        dispatch(ReportManagerActionType.setConditionStatus(value))
    },
    changeConditionValidResults: (value) => {
        dispatch(ReportManagerActionType.setConditionValidResults(value))
    },
    setConditionCreatedOnStart: (value) => {
        dispatch(ReportManagerActionType.setConditionCreatedOnStart(value))
    },
    setConditionCreatedOnEnd: (value) => {
        dispatch(ReportManagerActionType.setConditionCreatedOnEnd(value))
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(ReportManager)