import React from 'react';
import {connect} from 'react-redux';
import {ArticleStatisticActionType} from "../../types";

const articleStatisticAction = require('../../actions/main/ArticleStatisticAction');
const formatUtil = require('../../utils/FormatUtil');
const sysConst = require('../../utils/SysConst');

class ArticleStatistic extends React.Component {

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
        // // 初期化 开始月/终了月
        // this.props.setMonthStart(formatUtil.formatDate(new Date(), 'yyyy') + '01');
        // this.props.setMonthEnd(formatUtil.formatDate(new Date(), 'yyyyMM'));
        // // 消息发送-按月统计
        // this.props.getMsgStatByMonth();

        // 初期化 统计日数（暂定20）
        this.props.setDataSize(sysConst.STATISTIC_DAYS[0].value);
        // 消息发送-按日统计
        this.props.getMsgStatByDay();

        // 初期化 month-picker 组件
        // $('#monthStart,#monthEnd').MonthPicker({
        //     Button: false,
        //     MonthFormat: 'yymm'
        // });
    }

    render() {
        const {articleStatisticReducer, getUserStatByMonth} = this.props;
        return (
            <div>
                {/* 上部分：新增用户-按月统计 */}
                {/*<div className="row margin-top40 margin-left50 margin-right50 z-depth-1 white">*/}
                {/*    <div className="col s12 custom-purple bold white-text text-darken-1 no-padding">*/}
                {/*        <div className="col s6 margin-top15">新增用户-按月统计</div>*/}

                {/*        <div className="col s6 right">*/}
                {/*            <div className="col s4 left"/>*/}

                {/*            <div className="col s3 position-relative">*/}
                {/*                <input type="text" className="margin-bottom0" readOnly id="monthStart" value={articleStatisticReducer.monthStart}/>*/}
                {/*                <i className="mdi mdi-table-large table-icon"/>*/}
                {/*            </div>*/}

                {/*            <div className="col s1 center"><p>至</p></div>*/}

                {/*            <div className="col s3 position-relative">*/}
                {/*                <input type="text" className="margin-bottom0" readOnly id="monthEnd" value={articleStatisticReducer.monthEnd}/>*/}
                {/*                <i className="mdi mdi-table-large table-icon"/>*/}
                {/*            </div>*/}
                {/*            <div className="col s1 center padding-top10">*/}
                {/*                <i className="mdi mdi-magnify fz24 pointer" onClick={getUserStatByMonth}/>*/}
                {/*            </div>*/}

                {/*        </div>*/}
                {/*    </div>*/}
                {/*    <div id="month-chart" className="statistic-half-page"/>*/}
                {/*</div>*/}

                {/* 下部分：新增用户-按月统计 */}
                <div className="row margin-top40 margin-left50 margin-right50 z-depth-1 white">
                    <div className="col s12 custom-purple bold white-text text-darken-1 no-padding">
                        <div className="col s6 margin-top15 margin-bottom15">新增文章-按日统计 (消息类型)</div>
                        <div className="col s6 margin-top15 margin-bottom15 padding-right20 right-align">{sysConst.STATISTIC_DAYS[0].label}</div>
                    </div>
                    <div id="day-chart-type" className="statistic-half-page"/>
                </div>

                {/* 下部分：新增用户-按月统计 */}
                <div className="row margin-top40 margin-left50 margin-right50 z-depth-1 white">
                    <div className="col s12 custom-purple bold white-text text-darken-1 no-padding">
                        <div className="col s6 margin-top15 margin-bottom15">新增文章-按日统计 (载体类型)</div>
                        <div className="col s6 margin-top15 margin-bottom15 padding-right20 right-align">{sysConst.STATISTIC_DAYS[0].label}</div>
                    </div>
                    <div id="day-chart-carrier" className="statistic-half-page"/>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        articleStatisticReducer: state.ArticleStatisticReducer
    }
};

const mapDispatchToProps = (dispatch) => ({
    getUserStatByMonth: () => {
        // dispatch(articleStatisticAction.getUserStatByMonth())
    },
    // setMonthStart: (value) => {
    //     dispatch(ArticleStatisticActionType.setMonthStart(value))
    // },
    // setMonthEnd: (value) => {
    //     dispatch(ArticleStatisticActionType.setMonthEnd(value))
    // },
    getMsgStatByDay: () => {
        dispatch(articleStatisticAction.getArticleStatByDay())
    },
    setDataSize: (value) => {
        dispatch(ArticleStatisticActionType.setDataSize(value))
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(ArticleStatistic)