'use strict'

export const LOGIN_USER_ID ='user-id';
export const LOGIN_USER_TYPE ='user-type';
export const LOGIN_USER_STATUS='user-status';
export const AUTH_TOKEN ='auth-token';

/**
 * 日期控件 国际化用
 */
export const DATE_PICKER_OPTION = {
    autoClose: true,
    // showClearBtn: true,
    format: 'yyyy-mm-dd',
    i18n: {
        cancel: '取消',
        clear: '清除',
        done: '确认',
        previousMonth: '‹',
        nextMonth: '›',
        months: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
        monthsShort: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
        weekdays: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        weekdaysShort: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
        weekdaysAbbrev: ['S', 'M', 'T', 'W', 'T', 'F', 'S']
    },
};

/**
 * 单选下拉菜单样式
 */
export const CUSTOM_REACT_SELECT_STYLE = {
    // 整体容器
    // container: styles => ({ ...styles,  border:'1px solid #ff0000'}),
    // 控制器
    control: (styles, {isFocused}) => ({
        ...styles,
        height: 'calc(3rem + 1px)',
        borderRadius: '0',
        boxShadow: '0',
        borderTop: '0',
        borderLeft: '0',
        borderRight: '0',
        background: '#FFFFFF',
        margin: "0 0 26px 0",
        borderColor: isFocused ? '#26a69a' : '#ACACAC',
        ':hover': {
            borderColor: "#26a69a"
        }
    }),
    // 下拉菜单和输入框距离
    menu: styles => ({ ...styles, marginTop:'1px'}),
    // 指示器（删除/下拉）分隔符(竖线)
    indicatorSeparator: styles => ({...styles, display: 'none'}),
    // 检索输入框
    input: styles => ({...styles, margin: '0', paddingTop: '0',paddingBottom: '0',height: 'calc(3rem)'}),
    // 选中内容显示区域
    valueContainer: styles => ({
        ...styles,
        paddingLeft: '0',
        height: 'calc(3rem + 1px)'
    })
};

export const STATISTIC_SELECT_STYLE = {
    control: (styles, {isFocused}) => ({
        ...styles,
        height: '38px',
        borderRadius: '0',
        boxShadow: '0',
        borderTop: '0',
        borderLeft: '0',
        borderRight: '0',
        background: '#FFFFFF',
        margin: "0 0 0 0",
        borderColor: isFocused ? '#26a69a' : '#ACACAC',
        ':hover': {
            borderColor: "#26a69a"
        }
    }),
    // 下拉菜单和输入框距离
    menu: styles => ({ ...styles, marginTop:'1px'}),
    indicatorSeparator: styles => ({...styles, display: 'none'}),
    valueContainer: styles => ({...styles, paddingLeft: '0',height: '38px'})
};

/**
 * 单选下拉菜单样式（自定义下拉菜单高度，120px 3项目高度）
 */
export const CUSTOM_REACT_SELECT_STYLE_FOR_MODAL = {
    control: (styles, {isFocused}) => ({
        ...styles,
        height: 'calc(3rem + 1px)',
        borderRadius: '0',
        boxShadow: '0',
        borderTop: '0',
        borderLeft: '0',
        borderRight: '0',
        background: '#FFFFFF',
        margin: "0 0 26px 0",
        borderColor: isFocused ? '#26a69a' : '#ACACAC',
        ':hover': {
            borderColor: "#26a69a"
        }
    }),
    // 下拉菜单和输入框距离
    menu: styles => ({ ...styles, marginTop:'1px'}),
    // 下拉菜单最大高度
    menuList: styles => ({ ...styles, maxHeight: '120px' }),
    indicatorSeparator: styles => ({...styles, display: 'none'}),
    // 检索输入框
    input: styles => ({...styles, margin: '0', paddingTop: '0',paddingBottom: '0',height: 'calc(3rem)'}),
    // 选中内容显示区域
    valueContainer: styles => ({
        ...styles,
        paddingLeft: '0',
        height: 'calc(3rem + 1px)'
    })
};

// 按日统计-日数
export const STATISTIC_DAYS = [
    {
        value: 10,
        label: "近 10 天"
    },
    {
        value: 30,
        label: "近 30 天"
    }
];

// 可用/停用 标记
export const USE_FLAG = [
    {
        value: 0,
        label: "停用"
    },
    {
        value: 1,
        label: "可用"
    }
];

// 消息类型
export const MSG_TYPE = [
    {
        value: 1,
        label: "系统消息"
    },
    {
        value: 2,
        label: "用户消息"
    }
];

// 性别
export const GENDER = [
    {
        value: 0,
        label: "女"

    },
    {
        value: 1,
        label: "男"
    }
];

// 驾照类型
export const DRIVING_TYPE = [
    {value: 1, label: "A1"},
    {value: 2, label: "A2"},
    {value: 3, label: "A3"},
    {value: 4, label: "B1"},
    {value: 5, label: "B2"},
    {value: 6, label: "C1"},
    {value: 7, label: "C2"},
    {value: 8, label: "C3"},
    {value: 9, label: "C4"},
    {value: 10, label: "C5"},
    {value: 11, label: "D"},
    {value: 12, label: "E"},
    {value: 13, label: "F"},
    {value: 14, label: "M"},
    {value: 15, label: "N"},
    {value: 16, label: "P"}
];

// 用户状态
export const USER_STATUS = [
    {value: 1, label: "正常"},
    {value: 2, label: "禁言"},
    {value: 3, label: "停用"},
    {value: 4, label: "注销"}
];