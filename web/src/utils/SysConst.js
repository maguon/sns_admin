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
    {value: 4, label: "停用"}
];

// 消息类型 1.文章 2.求助
export const MESSAGE_TYPE = [
    {value: 1, label: "文章"},
    {value: 2, label: "求助"}
];

// 载体类型 1.文本 2.图片 3.视频 4.位置分享
export const CARRIER_TYPE = [
    {value: 1, label: "文本"},
    {value: 2, label: "图片"},
    {value: 3, label: "视频"},
    {value: 4, label: "位置分享"}
];

// 载体类型 1.文本 2.图片 3.视频
export const FAKE_CARRIER_TYPE = [
    {value: 1, label: "文本"},
    {value: 2, label: "图片"},
    {value: 3, label: "视频"}
];

// 评论状态
export const COMMENT_STATUS = [
    {value: 0, label: "屏蔽"},
    {value: 1, label: "正常"}
];

// 文章状态 0-不可见，1-可见(默认)
export const ARTICLE_STATUS = [
    {value: 0, label: "不可见"},
    {value: 1, label: "可见"}
];

// 投票状态（0-未开启，1-进行中，3-已结束）
export const VOTE_STATUS = [
    {value: 0, label: "未开启"},
    {value: 1, label: "进行中"},
    {value: 3, label: "已结束"}
];

// 关注类型（0-已关注，1-被关注，2-互相关注）
export const ATTENTION_TYPE = [
    {value: 1, label: "已关注"},
    {value: 2, label: "被关注"},
    {value: 3, label: "互相关注"},
    {value: 4, label: "已屏蔽"}
];

// 消息类型
export const MSG_TYPE = [
    {value: 1, label: "系统消息"},
    {value: 2, label: "用户消息"}
];

// 消息类型(用户)
export const MSG_USER_TYPE = [
    {value: 1, label: "所有用户"},
    {value: 2, label: "单个用户"}
];

// 设备登录状态(-1-退出登录，1-登录中)
export const DEVICE_LOGIN_STATUS = [
    {value: -1, label: "退出登录"},
    {value: 1, label: "登录中"}
];

// 性别
export const GENDER = [
    {value: 0, label: "女"},
    {value: 1, label: "男"}
];

// app类型(1-司机之家)
export const APP_TYPE = [
    {value: 1, label: "司机之家"}
];

// 系统类型(1-安卓 2-苹果)
export const SYSTEM_TYPE = [
    {value: 1, label: "安卓"},
    {value: 2, label: "苹果"}
];

// 可用/停用 标记
export const USE_FLAG = [
    {value: 0, label: "停用"},
    {value: 1, label: "可用"}
];

// 强制更新(0-非强制更新 1-强制更新)
export const FORCE_UPDATE = [
    {value: 0, label: "否"},
    {value: 1, label: "是"}
];

// 不通知/通知 标记
export const NOTICE_FLAG = [
    {value: 0, label: "不通知"},
    {value: 1, label: "通知"}
];

// 处理状态（1-未处理（默认），2-已处理）
export const REPORT_STATUS = [
    {value: 1, label: "未处理"},
    {value: 2, label: "已处理"}
];

// 处理结果（1-有效，2-无效）
export const REPORT_VALID_RESULT = [
    {value: 1, label: "有效"},
    {value: 2, label: "无效"}
];

// 按日统计-日数
export const STATISTIC_DAYS = [
    {value: 20, label: "近 20 天"},
    {value: 30, label: "近 30 天"}
];

// 地图默认坐标：大连
export const DEFAULT_LOCATION = [121.61476, 38.91369];

// 发布文章：默认地址 大连
export const DEFAULT_ADDRESS = {
    addressName: '大连市金普新区金马路',
    addressReal: "大连市金普新区金马路中国银行金普支行",
    addressShow: ""
};

// 按日统计-日数
export const USER_TYPE_LIST = [
    {value: 99, label: "系统管理员"},
    {value: 50, label: "普通用户"},
    {value: 10, label: "访客"}
];

// 用于权限设定（包含所有机能设定）
export const ALL_PAGE_LIST = [
    {
        "label": "综合页面",
        "icon": "mdi-speedometer",
        "link": "/",
        "children": [],
        "usable": true
    },
    {
        "label": "统计",
        "icon": "mdi-chart-line",
        "children": [
            {
                "link": "/user_statistic",
                "name": "新增用户",
                "usable": false
            },
            {
                "link": "/msg_statistic",
                "name": "新增文章",
                "usable": false
            }
        ]
    },
    {
        "label": "用户管理",
        "icon": "mdi-account-group",
        "link": "/user",
        "children": [],
        "usable": true
    },
    {
        "label": "文章管理",
        "icon": "mdi-message-text",
        "children": [
            {
                "link": "/article",
                "name": "文章",
                "usable": false
            },
            {
                "link": "/vote",
                "name": "投票",
                "usable": false
            }
        ]
    },
    {
        "label": "评论管理",
        "icon": "mdi-comment-text-multiple",
        "link": "/comment",
        "children": [],
        "usable": true
    },
    {
        "label": "消息管理",
        "icon": "mdi-message-processing",
        "link": "/message",
        "children": [],
        "usable": true
    },
    {
        "label": "举报管理",
        "icon": "mdi-bell-plus",
        "link": "/report",
        "children": [],
        "usable": false
    },
    {
        "label": "Fake用户管理",
        "icon": "mdi-settings-outline",
        "children": [
            {
                "link": "/fake_user_setting",
                "name": "Fake用户",
                "usable": false
            },
            {
                "link": "/fake_article",
                "name": "Fake文章",
                "usable": false
            }
        ]
    },
    {
        "label": "系统设置",
        "icon": "mdi-settings-outline",
        "children": [
            {
                "link": "/admin_user_setting",
                "name": "员工管理",
                "usable": false
            },
            {
                "link": "/authority_setting",
                "name": "权限设置",
                "usable": false
            },
            {
                "link": "/device",
                "name": "设备管理",
                "usable": false
            },
            {
                "link": "/app_version",
                "name": "App系统",
                "usable": false
            }
        ]
    }
];