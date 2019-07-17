import React from 'react';
import {HashRouter as Router, Route, Link, NavLink} from "react-router-dom";
import {connect} from 'react-redux';
import {fileHost} from '../../config/HostConfig';
import {
    // 主控面板
    FinancePanel,
    RecommendBusinessManager,
    RecommendBusinessManagerDetail,
    // 统计
    OrderStatistic,
    // 表单
    FormElements,
    FormValidation,
    // 表格
    BasicTable,
    ReactTablePivoting,

    // 系统设置
    CitySetting,
    RouteSetting,
    AdminUserSetting,
    AdminUserSettingDetail

} from '../main/index';

const routes = [
    // 默认打开画面 - 暂定财务主控面板
    {
        path: "/",
        exact: true,
        component: FinancePanel
    },
    // 财务主控面板
    {
        path: "/finance_panel",
        exact: true,
        component: FinancePanel
    },
    // 推广业绩
    {
        path: "/recommend_business",
        exact: true,
        component: RecommendBusinessManager
    },
    {
        path: '/recommend_business/:id',
        exact: true,
        component: RecommendBusinessManagerDetail
    },


    // 统计
    {
        // 订单统计
        path: "/order_statistic",
        exact: true,
        component: OrderStatistic
    },


    // Forms （表单）
    {
        // 表单组件
        path: "/form_elements",
        exact: true,
        component: FormElements
    },
    {
        // 表单验证
        path: '/form_validation',
        exact: true,
        component: FormValidation
    },

    // Tables （表格）
    {
        // material table
        path: '/basic_table',
        exact: true,
        component: BasicTable
    },
    {
        // react table （第三方）
        path: '/react_table',
        exact: true,
        component: ReactTablePivoting
    },

    // 设置模块
    {
        // 城市
        path: "/city_setting",
        exact: true,
        component: CitySetting
    },
    {
        // 线路
        path: "/route_setting",
        exact: true,
        component: RouteSetting
    },
    {
        // 员工管理
        path: "/admin_user_setting",
        exact: true,
        component: AdminUserSetting
    },
    {
        path: '/admin_user_setting/:id',
        exact: true,
        component: AdminUserSettingDetail
    }
];

class Container extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }

    render() {
        const {headerReducer} = this.props;
        let avatarUrl = "";
        if (headerReducer.userInfo && headerReducer.userInfo.avatar_image) {
            avatarUrl = "http://" + fileHost + "/api/image/" + headerReducer.userInfo.avatar_image;
        } else {
            avatarUrl = "/assets/images/avatar.png"
        }

        // TODO 后期可以根据登录用户权限 动态生成 不同的菜单数组
        let menuItem = [
            {
                "label": '主控面板',
                "icon": 'mdi-speedometer',
                "children": [
                    {
                        "link": '/finance_panel',
                        "name": '财务主控'
                    },
                    {
                        "link": '/recommend_business',
                        "name": '推广业绩'
                    }
                ]
            }, {
                "label": '数据统计',
                "icon": 'mdi-chart-line',
                "children": [
                    {
                        "link": '/order_statistic',
                        "name": '订单统计'
                    }
                ]
            },
            {
                "label": 'Form表单',
                "icon": 'mdi-account-group',
                "children": [
                    {
                        "link": '/form_elements',
                        "name": 'Form表单组件'
                    },
                    {
                        "link": '/form_validation',
                        "name": 'Form表单验证'
                    }
                ]
            },
            {
                "label": 'Table表格',
                "icon": 'mdi-account-group',
                "children": [
                    {
                        "link": '/basic_table',
                        "name": '基本表格'
                    },
                    {
                        "link": '/react_table',
                        "name": 'React 表格'
                    }
                ]
            },
            {
                "label": '系统设置',
                "icon": 'mdi-settings-outline',
                "children": [
                    {
                        "link": '/city_setting',
                        "name": '城市'
                    },
                    {
                        "link": '/route_setting',
                        "name": '线路'
                    },
                    {
                        "link": '/admin_user_setting',
                        "name": '员工管理'
                    }
                ]
            }
        ];

        return (
            <Router hashType={"hashbang"}>
                <div className="main-body">
                    <ul id="slide-out" className="sidenav height-percent100">
                        <li>
                            <div className="user-view blue-grey">
                                <img className="circle" src={avatarUrl}/>
                                <span className="white-text name">Name:{headerReducer.userInfo.real_name}</span>
                                <span className="white-text email">Phone:{headerReducer.userInfo.phone}</span>
                            </div>
                        </li>

                        {menuItem.map(function (item) {
                            return (
                                <div>
                                    <li>
                                        <ul className="collapsible collapsible-accordion">
                                            <li>
                                                <a className="collapsible-header"><i className={`mdi ${item.icon}`}/>{item.label}</a>
                                                <div className="collapsible-body">
                                                    {item.children.map(function (menu) {
                                                        return (
                                                            <ul>
                                                                <li><NavLink to={menu.link} className="sidenav-close" activeClassName="active"><i className="mdi mdi-chevron-right"/>{menu.name}
                                                                </NavLink></li>
                                                                <li><div className="divider"/></li>
                                                            </ul>
                                                        )
                                                    })}
                                                </div>
                                            </li>
                                        </ul>
                                    </li>
                                    <li><div className="divider"/></li>
                                </div>
                            )
                        })}
                    </ul>
                    {routes.map((route, index) => (
                        // Render more <Route>s with the same paths as above, but different components this time.
                        <Route
                            key={index}
                            path={route.path}
                            exact={route.exact}
                            component={route.component}
                        />
                    ))}
                </div>
            </Router>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        headerReducer: state.HeaderReducer
    }
};

const mapDispatchToProps = (dispatch) => ({
    // getUserDetail: (userId) => {
    //     dispatch(headerAction.getUserDetail({userId: userId}));
    // },
    // logout: () => {
    //     dispatch(headerAction.logout())
    // }
});

export default connect(mapStateToProps, mapDispatchToProps)(Container)