import React from 'react';
import {connect} from 'react-redux';
import {Link} from "react-router-dom";
import {fileHost, mediaHost} from "../../config/HostConfig";
import VideoPlayer from "../utils/VideoPlayer";
import {TextInput} from "react-materialize";
import {ReportManagerDetailActionType} from "../../types";
import Select from "react-select";

const reportManagerDetailAction = require('../../actions/main/ReportManagerDetailAction');
const sysConst = require('../../utils/SysConst');
const formatUtil = require('../../utils/FormatUtil');
const commonUtil = require('../../utils/CommonUtil');

class ReportManagerDetail extends React.Component {

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
        this.props.getReportInfo();
    }

    // 更新
    componentDidUpdate(prevProps, prevState, snapshot) {
        // 载体类型：图片
        if (this.props.reportManagerDetailReducer.articleInfo.length > 0 &&
            this.props.reportManagerDetailReducer.articleInfo[0].carrier === sysConst.CARRIER_TYPE[1].value &&
            this.props.reportManagerDetailReducer.articleInfo[0].media.length >= 1) {
            let viewer = new Viewer(document.getElementById('viewer'), {
                show: function (){  // 动态加载图片后，更新实例
                    viewer.update();
                },
            });
        }
    }

    /**
     * 更新 举报处理内容
     */
    changeReportReview = (event) => {
        this.props.setReportReview(event.target.value);
    };

    render() {
        const {reportManagerDetailReducer, changeValidResults, confirmReport} = this.props;
        return (
            <div>
                {/* 标题部分 */}
                <div className="row margin-bottom0">
                    <div className="input-field col s12">
                        <Link to={{pathname: '/report', state: {fromDetail: true}}}>
                            <a className="btn-floating btn waves-effect custom-blue waves-light fz15">
                                <i className="mdi mdi-arrow-left-bold"/>
                            </a>
                        </Link>
                        <span className="page-title margin-left30">举报管理 - 举报详情</span>
                        <div className="divider custom-divider margin-top10"/>
                    </div>
                </div>

                {/* 文章信息 */}
                {reportManagerDetailReducer.articleInfo.length > 0 &&
                <div className="row detail-box margin-top20 margin-left20 margin-right20 padding-bottom10 padding-top10">
                    <div className="col s12 fz18 bold-font padding-bottom10">文章详情</div>
                    {/* 作者昵称 */}
                    <div className="col s6">作者昵称：{reportManagerDetailReducer.articleInfo[0].user_detail_info[0].nick_name}</div>
                    {/* 发布时间 */}
                    <div className="col s6 right-align">发布时间：{formatUtil.getDateTime(reportManagerDetailReducer.articleInfo[0].created_at)}</div>
                    {/* 手机 */}
                    <div className="col s6 margin-top5">&nbsp;</div>
                    {/* 发布位置 */}
                    <div className="col s6 margin-top5 right-align">发布位置：{reportManagerDetailReducer.articleInfo[0].address_name}</div>
                    {/* 分割线 */}
                    <div className="col s12 no-padding"><div className="col s12 margin-top10 divider"/></div>
                    {/* 文章内容 */}
                    <div className="col s12 margin-top10">{reportManagerDetailReducer.articleInfo[0].info}</div>

                    {/* 载体类型: 图片 */}
                    {reportManagerDetailReducer.articleInfo[0].carrier === sysConst.CARRIER_TYPE[1].value && reportManagerDetailReducer.articleInfo[0].media.length >= 1 &&
                    <ul id="viewer" className="margin-top0">
                        {reportManagerDetailReducer.articleInfo[0].media.map(function (item) {
                            return (
                                <div className="col s2 margin-top40">
                                    <div className="img-box z-depth-1 detail-box">
                                        <li className="picture-list vc-center">
                                            <img src={item !== '' ? "http://" + fileHost + "/api/image/" + item.url : ""} className="responsive-img"/>
                                        </li>
                                    </div>
                                </div>
                            )
                        })}
                    </ul>}

                    {/* 载体类型: 视频 */}
                    {reportManagerDetailReducer.articleInfo[0].carrier === sysConst.CARRIER_TYPE[2].value && reportManagerDetailReducer.articleInfo[0].media.length >= 1 &&
                    <ul id="video" className="margin-top0">
                        {reportManagerDetailReducer.articleInfo[0].media.map(function (item) {
                            return (
                                <div className="col s12 margin-top40">
                                    {/*<VideoPlayer src="//vjs.zencdn.net/v/oceans.mp4" pic={item.preview === '' ? item.preview : "/assets/images/no_pic.png"}/>*/}
                                    <VideoPlayer src={"http://" + mediaHost + "/" + item.url} pic={item.preview !== '' ? item.preview : "/assets/images/no_pic.png"}/>
                                </div>
                            )
                        })}
                    </ul>}
                </div>}

                {/* 举报信息 */}
                {reportManagerDetailReducer.reportInfo.length > 0 &&
                <div className="row margin-top20 margin-left20 margin-right20">
                    <div className={`col s6 bold-font ${reportManagerDetailReducer.reportInfo[0].status === sysConst.REPORT_STATUS[0].value ? "pink-font" : "blue-font"}`}>
                        {commonUtil.getJsonValue(sysConst.REPORT_STATUS, reportManagerDetailReducer.reportInfo[0].status)}
                    </div>
                    <div className="col s6 right-align">
                        处理时间：{reportManagerDetailReducer.reportInfo[0].status === sysConst.REPORT_STATUS[0].value ? '' : formatUtil.getDateTime(reportManagerDetailReducer.reportInfo[0].created_at)}
                    </div>
                    <div className="col s6 margin-top10">举报人昵称：{reportManagerDetailReducer.reportInfo[0].user_detail_info[0].nick_name}</div>
                    <div className="col s6 margin-top10 right-align">举报时间：{formatUtil.getDateTime(reportManagerDetailReducer.reportInfo[0].created_at)}</div>
                    <div className="col s12 margin-top10 padding-bottom10">{reportManagerDetailReducer.reportInfo[0].remarks}</div>

                    <div className="col s1 input-field">
                        <Select
                            options={sysConst.REPORT_VALID_RESULT}
                            onChange={changeValidResults}
                            value={reportManagerDetailReducer.validResults}
                            isSearchable={false}
                            placeholder={"请选择"}
                            styles={sysConst.CUSTOM_REACT_SELECT_STYLE}
                            isClearable={false}
                        />
                        <label className="active">处理结果</label>
                    </div>
                    <div className="col s11">
                        <TextInput s={12} label="处理意见" maxLength="50" value={reportManagerDetailReducer.reportReview} onChange={this.changeReportReview}/>
                    </div>

                    {reportManagerDetailReducer.reportInfo[0].status === sysConst.REPORT_STATUS[0].value &&
                    <div className="col s12 fz18 right-align">
                        <button type="button" className="btn orange-btn" onClick={() => {confirmReport()}}>确认处理</button>
                    </div>}
                </div>}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        reportManagerDetailReducer: state.ReportManagerDetailReducer
    }
};

const mapDispatchToProps = (dispatch, ownProps) => ({
    // 基本信息
    getReportInfo: () => {
        dispatch(reportManagerDetailAction.getReportInfo(ownProps.match.params.id))
    },
    changeValidResults: (value) => {
        dispatch(ReportManagerDetailActionType.setValidResults(value))
    },
    setReportReview: (value) => {
        dispatch(ReportManagerDetailActionType.setReportReview(value))
    },
    // 处理举报
    confirmReport: () => {
        dispatch(reportManagerDetailAction.confirmReport(ownProps.match.params.id))
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(ReportManagerDetail)