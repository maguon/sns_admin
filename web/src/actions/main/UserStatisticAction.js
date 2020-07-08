import {apiHost} from '../../config/HostConfig';
import Highcharts from "highcharts/highstock";

const httpUtil = require('../../utils/HttpUtil');
const localUtil = require('../../utils/LocalUtil');
const sysConst = require('../../utils/SysConst');
const formatUtil = require('../../utils/FormatUtil');

export const getUserStatByMonth = () => async (dispatch, getState) => {
    try {
        // 统计开始月份
        let monthStart = $('#monthStart').val();
        if (monthStart === "" || monthStart === undefined) {
            monthStart = getState().UserStatisticReducer.monthStart;
        }
        // 统计结束月份
        let monthEnd = $('#monthEnd').val();
        if (monthEnd === "" || monthEnd === undefined) {
            monthEnd = getState().UserStatisticReducer.monthEnd;
        }
        // 基本检索URL
        let url = apiHost + '/api/admin/' + localUtil.getSessionItem(sysConst.LOGIN_USER_ID)
            + '/statisticsNewUserByMonth?startMonth=' + monthStart + '&endMonth=' + monthEnd;
        let res = await httpUtil.httpGet(url);
        if (res.success === true) {
            // 初始化 x轴数据 月份
            let xAxisData = [];
            // 初始化 y轴数据 新增用户-按月统计
            let yAxisData = [
                {
                    name: '新增用户',
                    data: []
                }
            ];

            // 数据反转
            res.result.reverse();
            for (let i = 0; i < res.result.length; i++) {
                // x轴月份
                xAxisData.push(res.result[i]._id);
                // 用户数
                yAxisData[0].data.push(res.result[i].value);
            }
            dispatch(showMonthChart(xAxisData, yAxisData));
        } else if (res.success === false) {
            swal('获取新增用户按月统计信息失败', res.msg, 'warning');
        }
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};

export const getUserStatByDay = () => async (dispatch, getState) => {
    try {
        // 取得 画面前 XX 天数
        let dateSize = getState().UserStatisticReducer.dataSize;
        // 当前时间
        let curDate = new Date();
        let startDay = formatUtil.formatDate(new Date(curDate.getTime() - dateSize*24*60*60*1000), 'yyyyMMdd');
        let endDay = formatUtil.formatDate(curDate, 'yyyyMMdd');
        // 基本检索URL
        let url = apiHost + '/api/admin/' + localUtil.getSessionItem(sysConst.LOGIN_USER_ID)
            + '/statisticsNewUserByDay?startDay=' + startDay + '&endDay=' + endDay;
        let res = await httpUtil.httpGet(url);
        if (res.success === true) {
            // 初始化 x轴数据 日期
            let xAxisData = [];
            // 初始化 y轴数据 新增用户-按日统计
            let yAxisData = [
                {
                    name: '新增用户',
                    data: []
                }
            ];

            // 数据反转
            res.result.reverse();
            for (let i = 0; i < res.result.length; i++) {
                // x轴月份
                xAxisData.push(res.result[i]._id);
                // 用户数
                yAxisData[0].data.push(Math.ceil(res.result[i].value));
            }
            dispatch(showDayChart(xAxisData, yAxisData));
        } else if (res.success === false) {
            swal('获取新增用户按日统计信息失败', res.msg, 'warning');
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
                text: '用户数',
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

export const showMonthChart = (xAxisData, yAxisData) => () => {
    // 初始化图表
    Highcharts.chart('month-chart', highChartOptions(xAxisData, yAxisData));
};

export const showDayChart = (xAxisData, yAxisData) => () => {
    // 初始化图表
    Highcharts.chart('day-chart', highChartOptions(xAxisData, yAxisData));
};