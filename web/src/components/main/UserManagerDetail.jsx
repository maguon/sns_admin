import React from 'react';
import Select from 'react-select';
import {connect} from 'react-redux';
import {Link} from "react-router-dom";
import {UserManagerDetailActionType} from '../../types';
// import {InquiryInfoModal} from '../modules/index';

const userManagerDetailAction = require('../../actions/main/UserManagerDetailAction');
// const inquiryInfoModalAction = require('../../actions/modules/InquiryInfoModalAction');
// const commonAction = require('../../actions/main/CommonAction');
const sysConst = require('../../utils/SysConst');
const formatUtil = require('../../utils/FormatUtil');
const commonUtil = require('../../utils/CommonUtil');

class UserManagerDetail extends React.Component {

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
        // 取得用户信息
        this.props.getUserInfo();
        // 初始，默认显示 个人资料
        this.onClickBaseTab();
        // TAB引入
        $('ul.tabs').tabs();
    }

    /**
     * 个人资料TAB：点击事件
     */
    onClickBaseTab = () => {
        // 清除TAB状态
        this.props.initTabStatus();
        // 显示 个人资料TAB
        this.props.showUserBaseTab();
    };

    /**
     * 发布文章TAB：点击事件
     */
    onClickArticleTab = () => {
        // 清除TAB状态
        this.props.initTabStatus();
        // 显示 发布文章TAB
        this.props.showUserArticleTab();
    };

    /**
     * 评论回复TAB：点击事件
     */
    onClickReplyTab = () => {
        // 清除TAB状态
        this.props.initTabStatus();
        // 显示 评论回复TAB
        this.props.showUserReplyTab();
    };

    /**
     * 投票TAB：点击事件
     */
    onClickVoteTab = () => {
        // 清除TAB状态
        this.props.initTabStatus();
        // 显示 投票TAB
        this.props.showUserVoteTab();
    };

    /**
     * 社交圈TAB：点击事件
     */
    onClickSocialTab = () => {
        // 清除TAB状态
        this.props.initTabStatus();
        // 显示 社交圈TAB
        this.props.showUserSocialTab();
    };

    /**
     * 社交圈TAB：点击事件
     */
    onClickMessageTab = () => {
        // 清除TAB状态
        this.props.initTabStatus();
        // 显示 社交圈TAB
        this.props.showUserMessageTab();
    };

    /**
     * 收藏文章TAB：点击事件
     */
    onClickCollectionArticleTab = () => {
        // 清除TAB状态
        this.props.initTabStatus();
        // 显示 收藏文章TAB
        this.props.showUserCollectionArticleTab();
    };

    /**
     * 收藏地址TAB：点击事件
     */
    onClickCollectionAddressTab = () => {
        // 清除TAB状态
        this.props.initTabStatus();
        // 显示 收藏地址TAB
        this.props.showUserCollectionAddressTab();
    };



















    /**
     * 询价记录TAB：查询用户询价记录列表
     */
    queryUserInquiryList = () => {
        // 默认第一页
        this.props.setInquiryStartNumber(0);
        this.props.getUserInquiryList();
    };

    /**
     * 询价记录TAB：上一页
     */
    inquiryPreBtn = () => {
        this.props.setInquiryStartNumber(this.props.userManagerDetailReducer.inquiryStart - (this.props.userManagerDetailReducer.inquirySize - 1));
        this.props.getUserInquiryList();
    };

    /**
     * 询价记录TAB：下一页
     */
    inquiryNextBtn = () => {
        this.props.setInquiryStartNumber(this.props.userManagerDetailReducer.inquiryStart + (this.props.userManagerDetailReducer.inquirySize - 1));
        this.props.getUserInquiryList();
    };

    /**
     * 询价记录TAB：显示询价信息详细内容
     */
    showInquiryInfoModal = (inquiryId) => {
        this.props.initInquiryInfoModalData(inquiryId);
    };


    render() {
        const {
            userManagerDetailReducer
            , showUserBase, showSecond, showThird , showFourth
        } = this.props;
        return (
            <div>
                {/* 标题部分 */}
                <div className="row margin-bottom0">
                    <div className="input-field col s12">
                        <Link to={{pathname: '/user', state: {fromDetail: true}}}>
                            <a className="btn-floating btn waves-effect custom-blue waves-light fz15">
                                <i className="mdi mdi-arrow-left-bold"/>
                            </a>
                        </Link>
                        <span className="page-title margin-left30">用户管理 - 用户详情</span>
                        <div className="divider custom-divider margin-top10"/>
                    </div>
                </div>

                {/* TAB 头部 用户详情 */}
                <div className="row margin-bottom0">
                    <div className="col s12 grey-text text-darken-1">
                        {userManagerDetailReducer.userInfo.length > 0 &&
                        <div className="user-detail-header">
                            {/* 左侧：图标 */}
                            <div className="col s1 margin-top10 center">
                                {/* 用户头像 */}
                                {userManagerDetailReducer.userInfo[0].avatar !== null && userManagerDetailReducer.userInfo[0].avatar !== '' &&
                                <img className="circle height-90" src={userManagerDetailReducer.userInfo[0].avatar}/>}
                                {/* 用户默认头像 */}
                                {(userManagerDetailReducer.userInfo[0].avatar === null || userManagerDetailReducer.userInfo[0].avatar === '') &&
                                <div className="user-title-icon grey lighten-1 vc-center">
                                    <i className="mdi mdi-account"/>
                                </div>}
                            </div>

                            {/* 中间：基本信息 */}
                            <div className="col s5">
                                <div className="row margin-bottom0 margin-top10">
                                    <div className="col s10">
                                        {/* 用户昵称 */}
                                        <span className="fz18">{userManagerDetailReducer.userInfo[0].nick_name}</span>
                                        {/* 性别 */}
                                        {userManagerDetailReducer.userInfo[0].sex === sysConst.GENDER[0].value ?
                                            <i className="mdi margin-left30 fz20 mdi-gender-female pink-font"/> :
                                            <i className="mdi margin-left30 fz20 mdi-gender-male blue-font"/>}
                                    </div>
                                    {/* 状态（1-正常，2-禁言，3-停用，4-注销） */}
                                    <div className="col s2">{commonUtil.getJsonValue(sysConst.USER_STATUS, userManagerDetailReducer.userInfo[0].user_login_info[0].status)}</div>
                                </div>
                                <div className="row margin-bottom0 margin-top10">
                                    {/* 手机 */}
                                    <div className="col s4">{userManagerDetailReducer.userInfo[0].user_login_info[0].phone}</div>
                                    {/* 城市 */}
                                    <div className="col s4">{userManagerDetailReducer.userInfo[0].city_name}</div>
                                    {/* 驾照类型 */}
                                    {/*<div className="col s4">{commonUtil.getJsonValue(sysConst.DRIVING_TYPE, userManagerDetailReducer.userInfo[0]._userDriveId.driving_type)}</div>*/}
                                </div>

                                <div className="row margin-bottom0 margin-top10">
                                    <div className="col s6">注册时间：{formatUtil.getDateTime(userManagerDetailReducer.userInfo[0].created_at)}</div>
                                    <div className="col s6">最后登录时间：{formatUtil.getDateTime(userManagerDetailReducer.userInfo[0].user_login_info[0].last_login_on)}</div>
                                </div>
                            </div>

                            {/* 统计信息 */}
                            <div className="col s5">
                                <div className="col s3 no-padding">
                                    <div className="margin-top30">发布文章：{formatUtil.formatNumber(userManagerDetailReducer.userInfo[0].messagesNum)}</div>
                                    <div className="margin-top15">发布求助：{formatUtil.formatNumber(userManagerDetailReducer.userInfo[0].messagesHelpNum)}</div>
                                </div>
                                <div className="col s3 no-padding">
                                    <div className="margin-top30">评论：{formatUtil.formatNumber(userManagerDetailReducer.userInfo[0].commentsNum)}</div>
                                    <div className="margin-top15">回复：{formatUtil.formatNumber(userManagerDetailReducer.userInfo[0].commentsReplyNum)}</div>
                                </div>
                                <div className="col s3 no-padding">
                                    <div className="margin-top30">关注：{formatUtil.formatNumber(userManagerDetailReducer.userInfo[0].followNum)}</div>
                                    <div className="margin-top15">被关注：{formatUtil.formatNumber(userManagerDetailReducer.userInfo[0].attentionNum)}</div>
                                </div>
                                <div className="col s3 no-padding">
                                    <div className="margin-top30">收藏文章：{formatUtil.formatNumber(userManagerDetailReducer.userInfo[0].messageCollectionNum)}</div>
                                    <div className="margin-top15">收藏地址：{formatUtil.formatNumber(userManagerDetailReducer.userInfo[0].locationCollectionNum)}</div>
                                </div>
                            </div>

                            <div className="col s1">
                                <div className="margin-top30 center">参与投票</div>
                                <div className="margin-top10 center">{formatUtil.formatNumber(userManagerDetailReducer.userInfo[0].voteNum)}</div>
                            </div>
                        </div>}
                    </div>
                </div>

                {/* 下部：主体内容 */}
                <div className="row margin-top10">
                    <div className="col s12">
                        <ul className="tabs">
                            <li className="tab col s-percent-1-8 pointer tab_base"><a onClick={this.onClickBaseTab}>个人资料</a></li>
                            <li className="tab col s-percent-1-8 pointer tab_article"><a onClick={this.onClickArticleTab}>发布文章</a></li>
                            <li className="tab col s-percent-1-8 pointer tab_reply"><a onClick={this.onClickReplyTab}>评论回复</a></li>
                            <li className="tab col s-percent-1-8 pointer tab_vote"><a onClick={this.onClickVoteTab}>投票</a></li>
                            <li className="tab col s-percent-1-8 pointer tab_social"><a onClick={this.onClickSocialTab}>社交圈</a></li>
                            <li className="tab col s-percent-1-8 pointer tab_message"><a onClick={this.onClickMessageTab}>消息</a></li>
                            <li className="tab col s-percent-1-8 pointer tab_collection_article"><a onClick={this.onClickCollectionArticleTab}>收藏文章</a></li>
                            <li className="tab col s-percent-1-8 pointer tab_collection_address"><a onClick={this.onClickCollectionAddressTab}>收藏地址</a></li>
                        </ul>
                    </div>

                    {/* 个人资料 */}
                    <div id="tab_base" className="col s12 tab_box">
                        <div className="row margin-top20 margin-left50 margin-right50">
                            <div className="col s6">
                                用户信息
                            </div>
                            <div className="col s6 right-align">
                                <button type="button" className="btn orange-btn" onClick={this.onClickCollectionAddressTab}>确认售罄</button>
                                <button type="button" className="btn orange-btn margin-left20" onClick={this.onClickCollectionAddressTab}>保存</button>
                                {/*<button type="button" className="btn purple-btn margin-left40 btn-height24 fz14" onClick={() => {this.showOrderPaymentModal()}}>查看详情</button>*/}
                            </div>


                            {/* 分割线 */}
                            <div className="col s12 no-padding"><div className="col s12 margin-top5 divider bold-divider"/></div>
                        </div>
                    </div>


                    <div id="tab_article" className="col s12 tab_box">发布文章列表</div>
                    <div id="tab_reply" className="col s12 tab_box">评论回复内容</div>
                    <div id="tab_vote" className="col s12 tab_box">投票列表</div>
                    <div id="tab_social" className="col s12 tab_box">社交圈 内容</div>
                    <div id="tab_message" className="col s12 tab_box">消息 内容</div>
                    <div id="tab_collection_article" className="col s12 tab_box">收藏文章 内容</div>
                    <div id="tab_collection_address" className="col s12 tab_box">收藏地址 内容</div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        userManagerDetailReducer: state.UserManagerDetailReducer,
        commonReducer: state.CommonReducer
    }
};

const mapDispatchToProps = (dispatch, ownProps) => ({
    // 基本信息
    getUserInfo: () => {
        // dispatch(commonAction.getCityList());
        dispatch(userManagerDetailAction.getUserInfo(ownProps.match.params.id));
    },



    initTabStatus: () => {
        $('.tabs .tab').removeClass("active");
        $(".tab_box").removeClass("active");
        $(".tab_box").hide();
    },
    // TAB1：询价记录
    setInquiryStartNumber: (start) => {
        dispatch(UserManagerDetailActionType.setInquiryStartNumber(start))
    },
    changeInquiryConditionStartCity: (value) => {
        dispatch(UserManagerDetailActionType.setInquiryConditionStartCity(value))
    },
    changeInquiryConditionEndCity: (value) => {
        dispatch(UserManagerDetailActionType.setInquiryConditionEndCity(value))
    },
    changeInquiryConditionServiceType: (value) => {
        dispatch(UserManagerDetailActionType.setInquiryConditionServiceType(value))
    },
    changeInquiryConditionStatus: (value) => {
        dispatch(UserManagerDetailActionType.setInquiryConditionStatus(value))
    },
    getUserInquiryList: () => {
        dispatch(userManagerDetailAction.getUserInquiryList(ownProps.match.params.id))
    },
    initInquiryInfoModalData: (inquiryId) => {
        // dispatch(InquiryInfoModalActionType.setPrePage('user'));
        // dispatch(InquiryInfoModalActionType.setShowOrderInfoFlag(false));
        // dispatch(inquiryInfoModalAction.getInquiryInfo(inquiryId,ownProps.match.params.id));
        // dispatch(inquiryInfoModalAction.getInquiryCarList(inquiryId,ownProps.match.params.id));
        // dispatch(inquiryInfoModalAction.getOrderInfo(inquiryId,ownProps.match.params.id));
    },
    // TAB2：收发货信息
    getLogInfoList: () => {
        dispatch(userManagerDetailAction.getLogInfoList(ownProps.match.params.id))
    },
    // TAB3：银行卡
    getBankCardList: () => {
        dispatch(userManagerDetailAction.getBankCardList(ownProps.match.params.id))
    },
    // TAB4：发票信息
    getInvoiceList: () => {
        dispatch(userManagerDetailAction.getInvoiceList(ownProps.match.params.id))
    },




    // 显示 个人资料 TAB 内容
    showUserBaseTab: () => {
        $('.tabs .tab_base').addClass("active");
        $("#tab_base").addClass("active");
        $("#tab_base").show();
    },
    // 显示 发布文章 TAB 内容
    showUserArticleTab: () => {
        $('.tabs .tab_article').addClass("active");
        $("#tab_article").addClass("active");
        $("#tab_article").show();
    },
    // 显示 评论回复 TAB 内容
    showUserReplyTab: () => {
        $('.tabs .tab_reply').addClass("active");
        $("#tab_reply").addClass("active");
        $("#tab_reply").show();
    },
    // 显示 投票 TAB 内容
    showUserVoteTab: () => {
        $('.tabs .tab_vote').addClass("active");
        $("#tab_vote").addClass("active");
        $("#tab_vote").show();
    },
    // 显示 社交圈 TAB 内容
    showUserSocialTab: () => {
        $('.tabs .tab_social').addClass("active");
        $("#tab_social").addClass("active");
        $("#tab_social").show();
    },
    // 显示 消息 TAB 内容
    showUserMessageTab: () => {
        $('.tabs .tab_message').addClass("active");
        $("#tab_message").addClass("active");
        $("#tab_message").show();
    },
    // 显示 收藏文章 TAB 内容
    showUserCollectionArticleTab: () => {
        $('.tabs .tab_collection_article').addClass("active");
        $("#tab_collection_article").addClass("active");
        $("#tab_collection_article").show();
    },
    // 显示 收藏地址 TAB 内容
    showUserCollectionAddressTab: () => {
        $('.tabs .tab_collection_address').addClass("active");
        $("#tab_collection_address").addClass("active");
        $("#tab_collection_address").show();
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(UserManagerDetail)