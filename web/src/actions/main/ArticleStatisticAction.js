import {apiHost} from '../../config/HostConfig';
import Highcharts from "highcharts/highstock";

const httpUtil = require('../../utils/HttpUtil');
const localUtil = require('../../utils/LocalUtil');
const sysConst = require('../../utils/SysConst');
const formatUtil = require('../../utils/FormatUtil');

// export const getUserStatByMonth = () => async (dispatch, getState) => {
//     try {
//         // 统计开始月份
//         let monthStart = $('#monthStart').val();
//         if (monthStart === "" || monthStart === undefined) {
//             monthStart = getState().UserStatisticReducer.monthStart;
//         }
//         // 统计结束月份
//         let monthEnd = $('#monthEnd').val();
//         if (monthEnd === "" || monthEnd === undefined) {
//             monthEnd = getState().UserStatisticReducer.monthEnd;
//         }
//         // 基本检索URL
//         let url = apiHost + '/api/admin/' + localUtil.getSessionItem(sysConst.LOGIN_USER_ID)
//             + '/statisticsNewUserByMonth?startMonth=' + monthStart + '&endMonth=' + monthEnd;
//         let res = await httpUtil.httpGet(url);
//         if (res.success === true) {
//             // 初始化 x轴数据 月份
//             let xAxisData = [];
//             // 初始化 y轴数据 新增用户-按月统计
//             let yAxisData = [
//                 {
//                     name: '新增用户',
//                     data: []
//                 }
//             ];
//
//             // 数据反转
//             res.result.reverse();
//             for (let i = 0; i < res.result.length; i++) {
//                 // x轴月份
//                 xAxisData.push(res.result[i]._id);
//                 // 用户数
//                 yAxisData[0].data.push(res.result[i].value);
//             }
//             dispatch(showMonthChart(xAxisData, yAxisData));
//         } else if (res.success === false) {
//             swal('获取新增用户按月统计信息失败', res.msg, 'warning');
//         }
//     } catch (err) {
//         swal('操作失败', err.message, 'error');
//     }
// };

export const getArticleStatByDay = () => async (dispatch, getState) => {
    try {
        // 取得 画面前 XX 天数
        let dateSize = getState().ArticleStatisticReducer.dataSize;
        // 当前时间
        let curDate = new Date();
        let startDay = formatUtil.formatDate(new Date(curDate.getTime() - dateSize*24*60*60*1000), 'yyyyMMdd');
        let endDay = formatUtil.formatDate(curDate, 'yyyyMMdd');
        // 基本检索URL
        let url = apiHost + '/api/admin/' + localUtil.getSessionItem(sysConst.LOGIN_USER_ID)
            + '/statisticsNewMsgByDay?startDay=' + startDay + '&endDay=' + endDay + '&carrier=0';
        let res = await httpUtil.httpGet(url);
        if (res.success === true) {
            // 初始化 x轴数据 日期
            let xAxisDat = [];
            // 初始化 y轴数据 消息发送-按日统计
            let yAxisDat = [
                {
                    name: '文章',
                    data: []
                },
                {
                    name: '求助',
                    data: []
                }
            ];
            // 数据反转
            res.result.reverse();
            for (let i = 0; i < res.result.length; i++) {
                // 文章数
                if (res.result[i]._id.m_type === 1) {
                    yAxisDat[0].data.push(res.result[i].value);
                } else {
                    // 求助数
                    yAxisDat[1].data.push(res.result[i].value);
                    // x轴日期
                    xAxisDat.push(res.result[i]._id.m_date);
                }
            }
            dispatch(showDayChartType(xAxisDat, yAxisDat));
            // 新增文章-按日统计 (载体类型)
            dispatch(getArticleStatByDayCarrier());
            // 新增评论
            dispatch(getArticleStatByDayCom());
        } else if (res.success === false) {
            swal('获取新增文章按日统计信息失败', res.msg, 'warning');
        }
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};

export const getArticleStatByDayCarrier = () => async (dispatch, getState) => {
    try {
        // 取得 画面前 XX 天数
        let dateSize = getState().ArticleStatisticReducer.dataSize;
        // 当前时间
        let curDate = new Date();
        let startDay = formatUtil.formatDate(new Date(curDate.getTime() - dateSize*24*60*60*1000), 'yyyyMMdd');
        let endDay = formatUtil.formatDate(curDate, 'yyyyMMdd');
        // 基本检索URL
        let url = apiHost + '/api/admin/' + localUtil.getSessionItem(sysConst.LOGIN_USER_ID)
            + '/statisticsNewMsgByDay?startDay=' + startDay + '&endDay=' + endDay + '&type=0';
        let res = await httpUtil.httpGet(url);
        if (res.success === true) {
            // 初始化 x轴数据 日期
            let xAxisData = [];
            // 初始化 y轴数据 消息发送-按日统计
            let yAxisData = [
                {
                    name: '文本',
                    data: []
                },
                {
                    name: '图片',
                    data: []
                },
                {
                    name: '视频',
                    data: []
                },
                {
                    name: '位置分享',
                    data: []
                }
            ];
            // 数据反转
            res.result.reverse();
            for (let i = 0; i < res.result.length; i++) {
                // 载体类型
                switch (res.result[i]._id.m_carrier) {
                    case 1:
                        // 文本
                        yAxisData[0].data.push(res.result[i].value);
                        break;
                    case 2:
                        // 图片
                        yAxisData[1].data.push(res.result[i].value);
                        break;
                    case 3:
                        // 视频
                        yAxisData[2].data.push(res.result[i].value);
                        break;
                    case 4:
                        // 位置分享
                        yAxisData[3].data.push(res.result[i].value);
                        // x轴日期
                        xAxisData.push(res.result[i]._id.m_date);
                        break;
                    default:
                        break;
                }
            }
            dispatch(showDayChartCarrier(xAxisData, yAxisData));
        } else if (res.success === false) {
            swal('获取新增文章按日统计信息失败', res.msg, 'warning');
        }
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};

export const getArticleStatByDayCom = () => async (dispatch, getState) => {
    try {
        // 取得 画面前 XX 天数
        let dateSize = getState().ArticleStatisticReducer.dataSize;
        // 当前时间
        let curDate = new Date();
        let startDay = formatUtil.formatDate(new Date(curDate.getTime() - dateSize*24*60*60*1000), 'yyyyMMdd');
        let endDay = formatUtil.formatDate(curDate, 'yyyyMMdd');
        // 基本检索URL
        let url = apiHost + '/api/admin/' + localUtil.getSessionItem(sysConst.LOGIN_USER_ID)
            + '/statisticsNewComByDay?startDay=' + startDay + '&endDay=' + endDay + '&type=0&level=0';
        let res = await httpUtil.httpGet(url);
        if (res.success === true) {
            // 初始化 x轴数据 日期
            let xAxisData = [];
            // 初始化 y轴数据 消息发送-按日统计
            let yAxisData = [
                {
                    name: '评论',
                    data: []
                }
            ];
            // 数据反转
            res.result.reverse();
            for (let i = 0; i < res.result.length; i++) {
                // x轴数据
                yAxisData[0].data.push(res.result[i].value);
                // x轴日期
                xAxisData.push(res.result[i]._id.c_date);
            }
            // 新增评论-按日统计
            dispatch(showDayChartCom(xAxisData, yAxisData));
        } else if (res.success === false) {
            swal('获取新增评论按日统计信息失败', res.msg, 'warning');
        }
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};

const highChartOptions = (xAxisData, yAxisData) => {
    return {
        // bar: 条形图，line：折线图，column：柱状图
        chart: {
            type: 'column',
        },
        title: {
            text: null
        },
        xAxis: {
            categories: xAxisData,
            crosshair: true
        },
        yAxis: {
            title: {
                text: '数量',
                // 可用的值有 "low"，"middle" 和 "high"，分别表示于最小值对齐、居中对齐、与最大值对齐。 默认是：middle.
                align: 'middle'
            }
        },
        plotOptions: {
            bar: {
                dataLabels: {
                    enabled: true
                }
            }
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle',
            borderWidth: 0
        },
        credits: {
            enabled: false
        },
        series: yAxisData
    };
};

// export const showMonthChart = (xAxisData, yAxisData) => () => {
//     // 初始化图表
//     Highcharts.chart('month-chart', highChartOptions(xAxisData, yAxisData));
// };

export const showDayChartType = (xAxisData, yAxisData) => () => {
    // 初始化图表
    Highcharts.chart('day-chart-type', highChartOptions(xAxisData, yAxisData));
};

export const showDayChartCarrier = (xAxisData, yAxisData) => () => {
    // 初始化图表
    Highcharts.chart('day-chart-carrier', highChartOptions(xAxisData, yAxisData));
};

export const showDayChartCom = (xAxisData, yAxisData) => () => {
    // 初始化图表
    Highcharts.chart('day-chart-com', highChartOptions(xAxisData, yAxisData));
};