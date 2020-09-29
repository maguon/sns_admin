import React from 'react';
import {HashRouter as Router, Route, Link, NavLink} from "react-router-dom";
import {connect} from 'react-redux';
import {fileHost} from '../../config/HostConfig';
import {
    // 综合页面
    MainPanel,

    // 统计
    UserStatistic,
    ArticleStatistic,

    // 用户管理
    UserManager,
    UserManagerDetail,

    // 文章管理
    // 文章
    ArticleManager,
    ArticleManagerDetail,
    // 投票
    VoteManager,
    VoteManagerDetail,

    // 评论管理
    CommentManager,
    CommentManagerDetail,

    // 消息管理
    MessageManager,

    // 举报管理
    ReportManager,
    ReportManagerDetail,

    // Faker用户管理
    FakeUserSetting,
    FakeUserSettingDetail,
    // Faker文章管理
    FakeArticleManager,
    FakeArticleManagerDetail,

    // 系统设置
    // 员工管理
    AdminUserSetting,
    AdminUserSettingDetail,
    // 权限设置
    AuthoritySetting,
    // 设备管理
    DeviceManager,
    DeviceManagerDetail,
    // APP系统
    AppVersion,
    AppVersionDetail

    // // 表单
    // ,FormElements,
    // FormValidation,
    // // 表格
    // BasicTable,
    // ReactTablePivoting,
} from '../main/index';

const routes = [
    // 默认打开画面 - 暂定综合页面
    {
        path: "/",
        exact: true,
        component: MainPanel
    },

    // 统计
    {
        // 新增用户统计
        path: "/user_statistic",
        exact: true,
        component: UserStatistic
    },
    {
        // 新增文章统计
        path: "/msg_statistic",
        exact: true,
        component: ArticleStatistic
    },

    // 用户管理
    {
        path: "/user",
        exact: true,
        component: UserManager
    },
    {
        path: "/user/:id",
        exact: true,
        component: UserManagerDetail
    },

    // 文章管理
    {
        path: "/article",
        exact: true,
        component: ArticleManager
    },
    {
        path: '/article/:id',
        exact: true,
        component: ArticleManagerDetail
    },
    // 投票管理
    {
        path: "/vote",
        exact: true,
        component: VoteManager
    },
    {
        path: '/vote/:id',
        exact: true,
        component: VoteManagerDetail
    },

    // 评论管理
    {
        path: "/comment",
        exact: true,
        component: CommentManager
    },
    {
        path: '/comment/:id',
        exact: true,
        component: CommentManagerDetail
    },

    // 消息管理
    {
        path: "/message",
        exact: true,
        component: MessageManager
    },

    // 举报管理
    {
        path: "/report",
        exact: true,
        component: ReportManager
    },
    {
        path: '/report/:id',
        exact: true,
        component: ReportManagerDetail
    },

    // Fake用户管理
    {
        path: "/fake_user_setting",
        exact: true,
        component: FakeUserSetting
    },
    {
        path: '/fake_user_setting/:id',
        exact: true,
        component: FakeUserSettingDetail
    },
    // Fake文章管理
    {
        path: "/fake_article",
        exact: true,
        component: FakeArticleManager
    },
    {
        path: '/fake_article/:id',
        exact: true,
        component: FakeArticleManagerDetail
    },

    // 员工管理
    {
        path: "/admin_user_setting",
        exact: true,
        component: AdminUserSetting
    },
    {
        path: '/admin_user_setting/:id',
        exact: true,
        component: AdminUserSettingDetail
    },
    // 权限管理
    {
        path: "/authority_setting",
        exact: true,
        component: AuthoritySetting
    },
    // 设备管理
    {
        path: "/device",
        exact: true,
        component: DeviceManager
    },
    {
        path: '/device/:id',
        exact: true,
        component: DeviceManagerDetail
    },
    // App系统
    {
        path: "/app_version",
        exact: true,
        component: AppVersion
    },
    {
        path: '/app_version/:id',
        exact: true,
        component: AppVersionDetail
    }

    // // Forms （表单）
    // ,{
    //     // 表单组件
    //     path: "/form_elements",
    //     exact: true,
    //     component: FormElements
    // },
    // {
    //     // 表单验证
    //     path: '/form_validation',
    //     exact: true,
    //     component: FormValidation
    // },
    // // Tables （表格）
    // {
    //     // material table
    //     path: '/basic_table',
    //     exact: true,
    //     component: BasicTable
    // },
    // {
    //     // react table （第三方）
    //     path: '/react_table',
    //     exact: true,
    //     component: ReactTablePivoting
    // }
];

class Container extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }

    // 更新
    componentDidUpdate(prevProps, prevState) {
        $('.sidenav').sidenav();
        $('.collapsible').collapsible();
    }

    render() {
        const {commonReducer} = this.props;
        let avatarUrl = "";
        if (commonReducer.loginUserInfo && commonReducer.loginUserInfo.avatar_image) {
            avatarUrl = "http://" + fileHost + "/api/image/" + commonReducer.loginUserInfo.avatar_image;
        } else {
            avatarUrl = "/assets/images/avatar.png"
        }

        return (
            <Router hashType={"hashbang"}>
                <div className="main-body">
                    <ul id="slide-out" className="sidenav" style={{height: '100%'}}>
                        <li>
                            <div className="user-view blue-grey">
                                <img className="circle" src={avatarUrl}/>
                                <span className="white-text name">Name:{commonReducer.loginUserInfo.name}</span>
                                <span className="white-text email">Phone:{commonReducer.loginUserInfo.phone}</span>
                            </div>
                        </li>

                        {commonReducer.loginUserMenuList.map(function (item) {
                            return (
                                <div>
                                    {/* 不含子菜单的样式 */}
                                    {item.children.length === 0 &&
                                    <li>
                                        <NavLink exact to={item.link} className="collapsible-header sidenav-close" activeClassName="selected-menu">
                                            <i className={`mdi ${item.icon}`}/>{item.label}
                                        </NavLink>
                                    </li>}

                                    {/* 含子菜单的样式 */}
                                    {item.children.length > 0 &&
                                    <li>
                                        <ul className="collapsible collapsible-accordion">
                                            <li>
                                                <a className="collapsible-header"><i className={`mdi ${item.icon}`}/>{item.label}</a>
                                                <div className="collapsible-body">
                                                    {item.children.map(function (menu) {
                                                        return (
                                                            <ul>
                                                                <li>
                                                                    <NavLink exact to={menu.link} className="sidenav-close" activeClassName="selected-menu">
                                                                        <i className="mdi mdi-chevron-right"/>{menu.name}
                                                                    </NavLink>
                                                                </li>
                                                            </ul>
                                                        )
                                                    })}
                                                </div>
                                            </li>
                                        </ul>
                                    </li>}

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
        commonReducer: state.CommonReducer
    }
};

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Container)