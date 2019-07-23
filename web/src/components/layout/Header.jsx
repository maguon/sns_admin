import React from 'react';
import {connect} from 'react-redux';
import {InquiryModal} from '../modules/index';

const headerAction = require('../../actions/layout/HeaderAction');
const commonAction = require('../../actions/main/CommonAction');
// const inquiryModalAction = require('../../actions/modules/InquiryModalAction');
const httpHeaders = require('../../utils/HttpHeaders');
const localUtil = require('../../utils/LocalUtil');
const sysConst = require('../../utils/SysConst');

/**
 * UI组件：主画面头部。
 */
class Header extends React.Component {

    /**
     * 组件准备要挂载的最一开始，调用执行
     * @param props
     */
    constructor(props) {
        super(props);
    }

    /**
     * 组件完全挂载到页面上，调用执行
     */
    componentDidMount() {
        // TODO
        // const userId = localUtil.getSessionItem(sysConst.USER_ID);
        // const token = localUtil.getSessionItem(sysConst.AUTH_TOKEN);
        // const userType = localUtil.getSessionItem(sysConst.USER_TYPE);
        // httpHeaders.set(sysConst.USER_ID, userId);
        // httpHeaders.set(sysConst.USER_TYPE, userType);
        // httpHeaders.set(sysConst.AUTH_TOKEN, token);
        // if (userId == null || userType == null || token == null) {
        //     window.location.href = '/login.html';
        // } else {
        //     this.props.getUserDetail(userId);
        // }
        $('.sidenav').sidenav();
        // $("#sideNav").sideNav({closeOnClick: true});
        $('.collapsible').collapsible();
    }

    /**
     * 渲染(挂载)画面。
     */
    render() {
        //
        const {openInquiryModal, openEditLoginUserModal, logout} = this.props;
        return (
            <div>
                <nav>
                    <div className="nav-wrapper z-depth-3 custom-purple">


                        {/*<a href="#" id="sideNav" data-activates="slide-out" className="sidenav-trigger brand-logo"*/}
                        {/*   style={{display: 'block',paddingLeft: '10px'}}>*/}
                        {/*    <i className="mdi mdi-menu mdi-36px"/>*/}
                        {/*</a>*/}


                        <a href="#" data-target="slide-out"
                           className="sidenav-trigger" style={{display: 'block',paddingLeft: '10px'}}><i className="mdi mdi-menu mdi-36px"/></a>

                        <span className="header-icon">
                            <img src="../../../assets/images/logo_48.png" alt=""/>
                        </span>
                        <span className="header-font">广运车管理系统</span>

                        <ul id="nav-mobile" className="right hide-on-med-and-down">
                            <li>
                                <a className="right-align">
                                    <i className="mdi mdi-home-currency-usd mdi-36px modal-trigger" data-target="inquiryModal" onClick={openInquiryModal}/>
                                </a>
                            </li>
                            <li>
                                <a className="right-align">
                                    <i className="mdi mdi-account mdi-36px modal-trigger" data-target="editLoginUserModal" onClick={openEditLoginUserModal}/>
                                </a>
                            </li>
                            <li><a><i className="mdi mdi-exit-to-app mdi-36px" onClick={logout}/></a></li>
                        </ul>
                    </div>
                </nav>
                <InquiryModal/>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        headerReducer: state.HeaderReducer
    }
};

const mapDispatchToProps = (dispatch) => ({
    // 取得登录用户基本信息
    getUserDetail: (userId) => {
        dispatch(headerAction.getUserDetail({userId: userId}))
    },
    // 询价
    openInquiryModal: () => {
        dispatch(commonAction.getCityList());
        // dispatch(inquiryModalAction.initInquiryModal());
    },
    // 修改密码
    openEditLoginUserModal: () => {
    },
    // 退出
    logout: () => {
        dispatch(headerAction.logout())
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Header)