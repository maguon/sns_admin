import React from 'react';
import Select from 'react-select';
import {connect} from 'react-redux';
import {Link} from "react-router-dom";
import {UserManagerDetailActionType} from '../../types';
import {AddressMapModal} from "../modules";

const userManagerDetailAction = require('../../actions/main/UserManagerDetailAction');
const addressMapModalAction = require('../../actions/modules/AddressMapModalAction');
// const commonAction = require('../../actions/main/CommonAction');
const sysConst = require('../../utils/SysConst');
const formatUtil = require('../../utils/FormatUtil');
const commonUtil = require('../../utils/CommonUtil');

// 用户管理 — 用户详情
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
        // TAB引入
        $('ul.tabs').tabs();
        // 取得用户信息
        this.props.getUserInfo();
        // 初始，默认显示 个人资料
        this.onClickBaseTab();
        this.props.setArticleStartNumber(0);
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
        // 取得 发布文章数据列表
        this.props.getUserArticleList();
    };

    /**
     * 发布文章TAB：上一页
     */
    articlePreBtn = () => {
        this.props.setArticleStartNumber(this.props.userManagerDetailReducer.articleStart - (this.props.userManagerDetailReducer.size - 1));
        this.props.getUserArticleList();
    };

    /**
     * 发布文章TAB：下一页
     */
    articleNextBtn = () => {
        this.props.setArticleStartNumber(this.props.userManagerDetailReducer.articleStart + (this.props.userManagerDetailReducer.size - 1));
        this.props.getUserArticleList();
    };

    /**
     * 评论回复TAB：点击事件
     */
    onClickReplyTab = () => {
        // 清除TAB状态
        this.props.initTabStatus();
        // 显示 评论回复TAB
        this.props.showUserReplyTab();
        this.props.getUserCommentList();
    };

    /**
     * 评论TAB：上一页
     */
    commentPreBtn = () => {
        this.props.setCommentStartNumber(this.props.userManagerDetailReducer.commentStart - (this.props.userManagerDetailReducer.size - 1));
        this.props.getUserCommentList();
    };

    /**
     * 评论TAB：下一页
     */
    commentNextBtn = () => {
        this.props.setCommentStartNumber(this.props.userManagerDetailReducer.commentStart + (this.props.userManagerDetailReducer.size - 1));
        this.props.getUserCommentList();
    };

    /**
     * 投票TAB：点击事件
     */
    onClickVoteTab = () => {
        // 清除TAB状态
        this.props.initTabStatus();
        // 显示 投票TAB
        this.props.showUserVoteTab();
        this.props.getUserVoteList();
    };

    /**
     * 评论TAB：上一页
     */
    votePreBtn = () => {
        this.props.setVoteStartNumber(this.props.userManagerDetailReducer.voteStart - (this.props.userManagerDetailReducer.size - 1));
        this.props.getUserVoteList();
    };

    /**
     * 评论TAB：下一页
     */
    voteNextBtn = () => {
        this.props.setVoteStartNumber(this.props.userManagerDetailReducer.voteStart + (this.props.userManagerDetailReducer.size - 1));
        this.props.getUserVoteList();
    };

    /**
     * 社交圈TAB：点击事件
     */
    onClickSocialTab = () => {
        // 清除TAB状态
        this.props.initTabStatus();
        // 显示 社交圈TAB
        this.props.showUserSocialTab();
        this.props.getUserAttentionList();
    };

    queryUserAttentionList = () => {
        this.props.getUserAttentionList();
    };

    /**
     * 社交圈TAB：上一页
     */
    attentionPreBtn = () => {
        this.props.setAttentionStartNumber(this.props.userManagerDetailReducer.attentionStart - (this.props.userManagerDetailReducer.size - 1));
        this.props.getUserAttentionList();
    };

    /**
     * 社交圈TAB：下一页
     */
    attentionNextBtn = () => {
        this.props.setAttentionStartNumber(this.props.userManagerDetailReducer.attentionStart + (this.props.userManagerDetailReducer.size - 1));
        this.props.getUserAttentionList();
    };

    /**
     * 消息TAB：点击事件
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
        this.props.getUserAddressList();
    };

    /**
     * 收藏地址TAB：上一页
     */
    addressPreBtn = () => {
        this.props.setAddressStartNumber(this.props.userManagerDetailReducer.addressStart - (this.props.userManagerDetailReducer.size - 1));
        this.props.getUserAddressList();
    };

    /**
     * 收藏地址TAB：下一页
     */
    addressNextBtn = () => {
        this.props.setAddressStartNumber(this.props.userManagerDetailReducer.addressStart + (this.props.userManagerDetailReducer.size - 1));
        this.props.getUserAddressList();
    };

    /**
     * 显示 收藏地址 模态
     */
    showAddressMapModal = (addressDetail) => {
        this.props.initAddressMapModalData(addressDetail);
    };

    render() {
        const {userManagerDetailReducer, changeUserStatus, changeConditionAttentionType, initModalData} = this.props;
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
                                {userManagerDetailReducer.userInfo[0].user_detail_info[0].avatar !== null && userManagerDetailReducer.userInfo[0].user_detail_info[0].avatar !== '' &&
                                <img className="circle height-90" src={userManagerDetailReducer.userInfo[0].user_detail_info[0].avatar}/>}
                                {/* 用户默认头像 */}
                                {(userManagerDetailReducer.userInfo[0].user_detail_info[0].avatar === null || userManagerDetailReducer.userInfo[0].user_detail_info[0].avatar === '') &&
                                <div className="user-title-icon grey lighten-1 vc-center">
                                    <i className="mdi mdi-account"/>
                                </div>}
                            </div>

                            {/* 中间：基本信息 */}
                            <div className="col s3">
                                {/* 昵称 */}
                                <div className="margin-top20 fz18">{userManagerDetailReducer.userInfo[0].user_detail_info[0].nick_name}</div>
                                {/* 状态（1-正常，2-禁言，3-停用，4-注销） */}
                                <div className="margin-top15 blue-font">{commonUtil.getJsonValue(sysConst.USER_STATUS, userManagerDetailReducer.userInfo[0].status)}</div>
                            </div>

                            {/* 统计信息 */}
                            <div className="col s7">
                                <div className="col s3 no-padding">
                                    <div className="margin-top20">发布文章：{formatUtil.formatNumber(userManagerDetailReducer.userInfo[0].user_detail_info[0].msg_num)}</div>
                                    <div className="margin-top15">发布求助：{formatUtil.formatNumber(userManagerDetailReducer.userInfo[0].user_detail_info[0].msg_help_num)}</div>
                                </div>
                                <div className="col s3 no-padding">
                                    <div className="margin-top20">评论：{formatUtil.formatNumber(userManagerDetailReducer.userInfo[0].user_detail_info[0].comment_num)}</div>
                                    <div className="margin-top15">回复：{formatUtil.formatNumber(userManagerDetailReducer.userInfo[0].user_detail_info[0].comment_reply_num)}</div>
                                </div>
                                <div className="col s3 no-padding">
                                    <div className="margin-top20">关注：{formatUtil.formatNumber(userManagerDetailReducer.userInfo[0].user_detail_info[0].follow_num)}</div>
                                    <div className="margin-top15">被关注：{formatUtil.formatNumber(userManagerDetailReducer.userInfo[0].user_detail_info[0].attention_num)}</div>
                                </div>
                                <div className="col s3 no-padding">
                                    <div className="margin-top20">收藏文章：{formatUtil.formatNumber(userManagerDetailReducer.userInfo[0].user_detail_info[0].msg_coll_num)}</div>
                                    <div className="margin-top15">收藏地址：{formatUtil.formatNumber(userManagerDetailReducer.userInfo[0].user_detail_info[0].loca_coll_num)}</div>
                                </div>
                            </div>

                            <div className="col s1">
                                <div className="margin-top20 center">参与投票</div>
                                <div className="margin-top15 center">{formatUtil.formatNumber(userManagerDetailReducer.userInfo[0].user_detail_info[0].vote_num)}</div>
                            </div>
                        </div>}
                    </div>
                </div>

                {/* 下部：主体内容 各个TAB */}
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
                        {userManagerDetailReducer.userInfo.length > 0 &&
                        <div className="row margin-top20 margin-left50 margin-right50">
                            <div className="col s6 fz18 bold-font">用户信息</div>

                            <div className="col s6 fz18 right-align">
                                {userManagerDetailReducer.userInfo[0].status === sysConst.USER_STATUS[0].value &&
                                <button type="button" className="btn orange-btn" onClick={() => {changeUserStatus(sysConst.USER_STATUS[1].value)}}>禁言</button>}
                                {(userManagerDetailReducer.userInfo[0].status === sysConst.USER_STATUS[0].value || userManagerDetailReducer.userInfo[0].status === sysConst.USER_STATUS[1].value) &&
                                <button type="button" className="btn orange-btn margin-left20" onClick={() => {changeUserStatus(sysConst.USER_STATUS[2].value)}}>停用</button>}
                                &nbsp;
                            </div>

                            <div className="col s4 margin-top15">注册帐号：{userManagerDetailReducer.userInfo[0].phone}</div>
                            <div className="col s4 margin-top15">真实姓名：{userManagerDetailReducer.userInfo[0].user_detail_info[0].real_name}</div>
                            <div className="col s4 margin-top15">性别：{commonUtil.getJsonValue(sysConst.GENDER, userManagerDetailReducer.userInfo[0].user_detail_info[0].sex)}</div>

                            <div className="col s4 margin-top10">所在城市：{userManagerDetailReducer.userInfo[0].user_detail_info[0].city_name}</div>
                            <div className="col s4 margin-top10">注册时间：{formatUtil.getDateTime(userManagerDetailReducer.userInfo[0].created_at)}</div>
                            <div className="col s4 margin-top10">最后登录时间：{formatUtil.getDateTime(userManagerDetailReducer.userInfo[0].last_login_on)}</div>

                            <div className="col s4 margin-top10">驾照类型：{commonUtil.getJsonValue(sysConst.DRIVING_TYPE, userManagerDetailReducer.userInfo[0].user_drive_info[0].driving_type)}</div>
                            <div className="col s4 margin-top10">发证日期：{formatUtil.getDate(userManagerDetailReducer.userInfo[0].user_drive_info[0].certification_date)}</div>

                            {/* 分割线 */}
                            <div className="col s12"><div className="col s12 margin-top15 margin-bottom15 divider bold-divider"/></div>

                            {userManagerDetailReducer.userNoticeInfo.length > 0 &&
                                <div>
                                    <div className="col s12 fz18 margin-bottom15 bold-font">通知设置</div>
                                    <div className="col s3">消息：</div>
                                    <div className="col s1 blue-font">{commonUtil.getJsonValue(sysConst.NOTICE_FLAG, userManagerDetailReducer.userNoticeInfo[0].sysmsg)}</div>
                                    <div className="col s3">赞：</div>
                                    <div className="col s1 blue-font">{commonUtil.getJsonValue(sysConst.NOTICE_FLAG, userManagerDetailReducer.userNoticeInfo[0].praise)}</div>
                                    <div className="col s3">评论：</div>
                                    <div className="col s1 blue-font">{commonUtil.getJsonValue(sysConst.NOTICE_FLAG, userManagerDetailReducer.userNoticeInfo[0].comment)}</div>

                                    <div className="col s3 margin-top10">被关注：</div>
                                    <div className="col s1 margin-top10 blue-font">{commonUtil.getJsonValue(sysConst.NOTICE_FLAG, userManagerDetailReducer.userNoticeInfo[0].attention)}</div>
                                    <div className="col s3 margin-top10">回复：</div>
                                    <div className="col s1 margin-top10 blue-font">{commonUtil.getJsonValue(sysConst.NOTICE_FLAG, userManagerDetailReducer.userNoticeInfo[0].others)}</div>
                                    <div className="col s3 margin-top10">关注人发布作品：</div>
                                    <div className="col s1 margin-top10 blue-font">{commonUtil.getJsonValue(sysConst.NOTICE_FLAG, userManagerDetailReducer.userNoticeInfo[0].follow_addmsg)}</div>

                                    {/* 分割线 */}
                                    <div className="col s12"><div className="col s12 margin-top15 divider bold-divider"/></div>
                                </div>
                            }
                        </div>}
                    </div>

                    {/* 发布文章 TAB */}
                    <div id="tab_article" className="col s12 tab_box">
                        <div className="row">
                            <div className="col s12">
                                <table className="fixed-table bordered striped">
                                    <thead className="custom-dark-grey table-top-line">
                                    <tr className="grey-text text-darken-2">
                                        <th style={{width: '230px'}}>文章编号</th>
                                        <th className="text-ellipsis" style={{width: '360px'}}>内容</th>
                                        <th className="text-ellipsis" style={{width: '200px'}}>发布位置</th>
                                        <th>文章类型</th>
                                        <th>载体类型</th>
                                        <th>评论数</th>
                                        <th>点赞数</th>
                                        <th className="center" style={{width: '180px'}}>发布时间</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {userManagerDetailReducer.userArticleList.map(function (item) {
                                        return (
                                            <tr className="grey-text text-darken-1">
                                                {/* 文章编号 */}
                                                <td style={{width: '230px'}}>{item._id}</td>
                                                {/* 内容 */}
                                                <td className="text-ellipsis" style={{width: '360px'}}>{item.info}</td>
                                                {/* 发布位置 */}
                                                <td className="text-ellipsis" style={{width: '200px'}}>{item.address_name}</td>
                                                {/* 文章类型 */}
                                                <td>{commonUtil.getJsonValue(sysConst.MESSAGE_TYPE, item.type)}</td>
                                                {/* 载体类型 */}
                                                <td>{commonUtil.getJsonValue(sysConst.CARRIER_TYPE, item.carrier)}</td>
                                                {/* 评论数 */}
                                                <td>{formatUtil.formatNumber(item.comment_num)}</td>
                                                {/* 点赞数 */}
                                                <td>{formatUtil.formatNumber(item.agree_num)}</td>
                                                {/* 发布时间 */}
                                                <td className="center" style={{width: '180px'}}>{formatUtil.getDateTime(item.created_at)}</td>
                                            </tr>
                                        )
                                    },this)}
                                    {userManagerDetailReducer.userArticleList.length === 0 &&
                                    <tr className="grey-text text-darken-1">
                                        <td className="no-data-tr" colSpan="9">暂无数据</td>
                                    </tr>}
                                    </tbody>
                                </table>
                            </div>

                            {/* 上下页按钮 */}
                            <div className="col s12 margin-top10">
                                <div className="right">
                                    {userManagerDetailReducer.articleStart > 0 && userManagerDetailReducer.articleDataSize > 0 &&
                                    <a className="waves-light waves-effect custom-blue btn margin-right10" id="pre" onClick={this.articlePreBtn}>
                                        上一页
                                    </a>}
                                    {userManagerDetailReducer.articleDataSize >= userManagerDetailReducer.size &&
                                    <a className="waves-light waves-effect custom-blue btn" id="next" onClick={this.articleNextBtn}>
                                        下一页
                                    </a>}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 评论回复 TAB */}
                    <div id="tab_reply" className="col s12 tab_box">
                        <div className="row">
                            <div className="col s12">
                                <table className="fixed-table bordered striped">
                                    <thead className="custom-dark-grey table-top-line">
                                    <tr className="grey-text text-darken-2">
                                        <th style={{width: '230px'}}>评论编号</th>
                                        <th style={{width: '80px'}}>评论类型</th>
                                        <th style={{width: '230px'}}>文章编号</th>
                                        <th className="text-ellipsis" style={{width: '260px'}}>评论内容</th>
                                        <th>评论数</th>
                                        <th>点赞数</th>
                                        <th className="center" style={{width: '180px'}}>评论时间</th>
                                        <th className="center">状态</th>
                                        {/*<th className="center" style={{width: '150px'}}>操作</th>*/}
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {userManagerDetailReducer.userCommentList.map(function (item) {
                                        return (
                                            <tr className="grey-text text-darken-1">
                                                {/* 评论编号 */}
                                                <td style={{width: '230px'}}>{item._id}</td>
                                                {/* 评论类型 */}
                                                <td  style={{width: '80px'}}>{commonUtil.getJsonValue(sysConst.MESSAGE_TYPE, item.msg_type)}</td>
                                                {/* 文章编号 */}
                                                <td style={{width: '230px'}}>{item._msg_id}</td>
                                                {/* 评论内容 */}
                                                <td className="text-ellipsis" style={{width: '260px'}}>{item.comment}</td>
                                                {/* 评论数 */}
                                                <td>{formatUtil.formatNumber(item.comment_num)}</td>
                                                {/* 点赞数 */}
                                                <td>{formatUtil.formatNumber(item.agree_num)}</td>

                                                {/* 评论时间 */}
                                                <td className="center" style={{width: '180px'}}>{formatUtil.getDateTime(item.created_at)}</td>
                                                {/* 状态 */}
                                                <td className="center">{commonUtil.getJsonValue(sysConst.COMMENT_STATUS, item.status)}</td>
                                                {/* 操作 */}
                                                {/*<td className="operation center"  style={{width: '150px'}}>*/}
                                                {/*    <i className="mdi mdi-close purple-font pointer margin-right10" onClick={() => {this.deleteComment(item._id)}}/>*/}
                                                {/*</td>*/}
                                            </tr>
                                        )
                                    },this)}
                                    {userManagerDetailReducer.userCommentList.length === 0 &&
                                    <tr className="grey-text text-darken-1">
                                        <td className="no-data-tr" colSpan="8">暂无数据</td>
                                    </tr>}
                                    </tbody>
                                </table>
                            </div>

                            {/* 上下页按钮 */}
                            <div className="col s12 margin-top10">
                                <div className="right">
                                    {userManagerDetailReducer.commentStart > 0 && userManagerDetailReducer.commentDataSize > 0 &&
                                    <a className="waves-light waves-effect custom-blue btn margin-right10" id="pre" onClick={this.commentPreBtn}>
                                        上一页
                                    </a>}
                                    {userManagerDetailReducer.commentDataSize >= userManagerDetailReducer.size &&
                                    <a className="waves-light waves-effect custom-blue btn" id="next" onClick={this.commentNextBtn}>
                                        下一页
                                    </a>}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 投票 TAB */}
                    <div id="tab_vote" className="col s12 tab_box">
                        {/* 下部分：检索结果显示区域 */}
                        <div className="row">
                            <div className="col s12">
                                <table className="bordered striped">
                                    <thead className="custom-dark-grey table-top-line">
                                    <tr className="grey-text text-darken-2">
                                        <th>投票编号</th>
                                        <th>最多选项数</th>
                                        <th>投票标题</th>
                                        <th>参与人数</th>
                                        <th>发布人</th>
                                        <th className="center">状态</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {userManagerDetailReducer.userVoteList.map(function (item) {
                                        return (
                                            <tr className="grey-text text-darken-1">
                                                {/* 投票编号 */}
                                                <td>{item._vote_id}</td>
                                                {/* 最多选项数 */}
                                                <td>{formatUtil.formatNumber(item.vote_info[0].max_num)}</td>
                                                {/* 投票标题 */}
                                                <td>{item.vote_info[0].title}</td>
                                                {/* 参与人数 */}
                                                <td>{formatUtil.formatNumber(item.vote_info[0].participants_num)}</td>
                                                {/* 发布人 */}
                                                <td>{item.admin_info[0].name}</td>
                                                {/* 状态 */}
                                                <td className="center">{commonUtil.getJsonValue(sysConst.VOTE_STATUS, item.vote_info[0].status)}</td>
                                            </tr>
                                        )
                                    },this)}
                                    {userManagerDetailReducer.userVoteList.length === 0 &&
                                    <tr className="grey-text text-darken-1">
                                        <td className="no-data-tr" colSpan="6">暂无数据</td>
                                    </tr>}
                                    </tbody>
                                </table>
                            </div>

                            {/* 上下页按钮 */}
                            <div className="col s12 margin-top10">
                                <div className="right">
                                    {userManagerDetailReducer.voteStart > 0 && userManagerDetailReducer.voteDataSize > 0 &&
                                    <a className="waves-light waves-effect custom-blue btn margin-right10" id="pre" onClick={this.votePreBtn}>
                                        上一页
                                    </a>}
                                    {userManagerDetailReducer.voteDataSize >= userManagerDetailReducer.size &&
                                    <a className="waves-light waves-effect custom-blue btn" id="next" onClick={this.voteNextBtn}>
                                        下一页
                                    </a>}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 社交圈 TAB */}
                    <div id="tab_social" className="col s12 tab_box">
                         {/*上部分：检索条件输入区域 */}
                        <div className="row grey-text text-darken-1 margin-top20 margin-bottom0">
                            <div className="col s11 search-condition-box">
                                <div className="input-field col s4">
                                    <Select
                                        options={sysConst.ATTENTION_TYPE}
                                        onChange={changeConditionAttentionType}
                                        value={userManagerDetailReducer.conditionAttentionType}
                                        isSearchable={false}
                                        placeholder={"请选择"}
                                        styles={sysConst.CUSTOM_REACT_SELECT_STYLE}
                                        isClearable={false}
                                    />
                                    <label className="active">关注类型</label>
                                </div>
                            </div>

                            {/* 查询按钮 */}
                            <div className="col s1">
                                <a className="btn-floating btn-large waves-light waves-effect btn query-btn" onClick={this.queryUserAttentionList}>
                                    <i className="mdi mdi-magnify"/>
                                </a>
                            </div>
                        </div>

                        {/* 下部分：检索结果显示区域 */}
                        <div className="row">
                            <div className="col s12">
                                <table className="bordered striped">
                                    <thead className="custom-dark-grey table-top-line">
                                    <tr className="grey-text text-darken-2">
                                        <th>关注人帐号</th>
                                        <th>关注人昵称</th>
                                        <th>被关注人帐号</th>
                                        <th>被关注人昵称</th>
                                        <th className="center">关注时间</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {userManagerDetailReducer.userAttentionList.map(function (item) {
                                        return (
                                            <tr className="grey-text text-darken-1">
                                                {/* 关注人帐号 */}
                                                <td>{item.follow_login_info[0]._id}</td>
                                                {/* 关注人昵称 */}
                                                <td>{item.follow_detail_info[0].nick_name}</td>
                                                {/* 被关注人帐号 */}
                                                <td>{item.attention_login_info[0]._id}</td>
                                                {/* 被关注人昵称 */}
                                                <td>{item.attention_detail_info[0].nick_name}</td>
                                                {/* 关注时间 */}
                                                <td className="center">{formatUtil.getDateTime(item.created_at)}</td>
                                            </tr>
                                        )
                                    },this)}
                                    {userManagerDetailReducer.userAttentionList.length === 0 &&
                                    <tr className="grey-text text-darken-1">
                                        <td className="no-data-tr" colSpan="5">暂无数据</td>
                                    </tr>}
                                    </tbody>
                                </table>
                            </div>

                            {/* 上下页按钮 */}
                            <div className="col s12 margin-top10">
                                <div className="right">
                                    {userManagerDetailReducer.attentionStart > 0 && userManagerDetailReducer.attentionDataSize > 0 &&
                                    <a className="waves-light waves-effect custom-blue btn margin-right10" id="pre" onClick={this.attentionPreBtn}>
                                        上一页
                                    </a>}
                                    {userManagerDetailReducer.attentionDataSize >= userManagerDetailReducer.size &&
                                    <a className="waves-light waves-effect custom-blue btn" id="next" onClick={this.attentionNextBtn}>
                                        下一页
                                    </a>}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 消息 TAB */}
                    <div id="tab_message" className="col s12 tab_box">
                        {/*/!* 上部分：检索条件输入区域 *!/*/}
                        {/*<div className="row grey-text text-darken-1 margin-top20 margin-bottom0">*/}
                        {/*    <div className="col s11 search-condition-box">*/}
                        {/*        <TextInput s={4} label="用户手机" value={userManagerDetailReducer.conditionPhone} onChange={this.changeConditionPhone}/>*/}

                        {/*        <div className="input-field col s4">*/}
                        {/*            <Select*/}
                        {/*                options={userManagerDetailReducer.voteItemList}*/}
                        {/*                onChange={changeConditionVoteItem}*/}
                        {/*                value={userManagerDetailReducer.conditionVoteItem}*/}
                        {/*                isSearchable={false}*/}
                        {/*                placeholder={"请选择"}*/}
                        {/*                styles={sysConst.CUSTOM_REACT_SELECT_STYLE}*/}
                        {/*                isClearable={true}*/}
                        {/*            />*/}
                        {/*            <label className="active">投票选项</label>*/}
                        {/*        </div>*/}

                        {/*    </div>*/}

                        {/*    /!* 查询按钮 *!/*/}
                        {/*    <div className="col s1">*/}
                        {/*        <a className="btn-floating btn-large waves-light waves-effect btn query-btn" onClick={this.queryUserVoteList}>*/}
                        {/*            <i className="mdi mdi-magnify"/>*/}
                        {/*        </a>*/}
                        {/*    </div>*/}
                        {/*</div>*/}

                        {/*/!* 下部分：检索结果显示区域  *!/*/}
                        {/*<div className="row">*/}
                        {/*    <div className="col s12">*/}
                        {/*        <table className="bordered striped">*/}
                        {/*            <thead className="custom-dark-grey table-top-line">*/}
                        {/*            <tr className="grey-text text-darken-2">*/}
                        {/*                <th>投票用户昵称</th>*/}
                        {/*                <th>投票数</th>*/}
                        {/*                <th>投票选项</th>*/}
                        {/*                <th className="center">投票时间</th>*/}
                        {/*            </tr>*/}
                        {/*            </thead>*/}
                        {/*            <tbody>*/}
                        {/*            {userManagerDetailReducer.userVoteList.map(function (item) {*/}
                        {/*                return (*/}
                        {/*                    <tr className="grey-text text-darken-1">*/}
                        {/*                        /!* 投票用户昵称 TODO *!/*/}
                        {/*                        <td>{item._id}</td>*/}
                        {/*                        /!* 投票数 *!/*/}
                        {/*                        <td>{formatUtil.formatNumber(item.option_item.length)}</td>*/}
                        {/*                        /!* 投票选项 *!/*/}
                        {/*                        <td>{item.option_item.map((n) => n.index).toString()}</td>*/}
                        {/*                        /!* 投票时间 *!/*/}
                        {/*                        <td className="center">{formatUtil.getDateTime(item.created_at)}</td>*/}
                        {/*                    </tr>*/}
                        {/*                )*/}
                        {/*            },this)}*/}
                        {/*            {userManagerDetailReducer.userVoteList.length === 0 &&*/}
                        {/*            <tr className="grey-text text-darken-1">*/}
                        {/*                <td className="no-data-tr" colSpan="4">暂无数据</td>*/}
                        {/*            </tr>}*/}
                        {/*            </tbody>*/}
                        {/*        </table>*/}
                        {/*    </div>*/}

                        {/*    /!* 上下页按钮 *!/*/}
                        {/*    <div className="col s12 margin-top10">*/}
                        {/*        <div className="right">*/}
                        {/*            {userManagerDetailReducer.start > 0 && userManagerDetailReducer.dataSize > 0 &&*/}
                        {/*            <a className="waves-light waves-effect custom-blue btn margin-right10" id="pre" onClick={this.preBtn}>*/}
                        {/*                上一页*/}
                        {/*            </a>}*/}
                        {/*            {userManagerDetailReducer.dataSize >= userManagerDetailReducer.size &&*/}
                        {/*            <a className="waves-light waves-effect custom-blue btn" id="next" onClick={this.nextBtn}>*/}
                        {/*                下一页*/}
                        {/*            </a>}*/}
                        {/*        </div>*/}
                        {/*    </div>*/}
                        {/*</div>*/}



                    </div>

                    {/* 收藏文章 */}
                    <div id="tab_collection_article" className="col s12 tab_box">收藏文章 内容</div>
                    
                    {/* 收藏地址 */}
                    <div id="tab_collection_address" className="col s12 tab_box">
                        <div className="row">
                            <div className="col s12">
                                <table className="fixed-table bordered striped">
                                    <thead className="custom-dark-grey table-top-line">
                                    <tr className="grey-text text-darken-2">
                                        <th>地址编号</th>
                                        <th>地址名称</th>
                                        <th className="text-ellipsis" style={{width: '360px'}}>地址位置</th>
                                        <th className="center" style={{width: '180px'}}>发布时间</th>
                                        <th className="center">详细</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {userManagerDetailReducer.userAddressList.map(function (item) {
                                        return (
                                            <tr className="grey-text text-darken-1">
                                                {/* 地址编号 */}
                                                <td>{item._id}</td>
                                                {/* 地址名称 */}
                                                <td>{item.address_name}</td>
                                                {/* 内容 */}
                                                <td className="text-ellipsis" style={{width: '360px'}}>{item.address_real}</td>
                                                {/* 发布时间 */}
                                                <td className="center" style={{width: '180px'}}>{formatUtil.getDateTime(item.created_at)}</td>
                                                {/* 详细 */}
                                                <td className="operation center">
                                                    <a className="modal-trigger" href="#addressMapModal" onClick={() => {this.showAddressMapModal(item)}}>
                                                        <i className="mdi mdi-table-search purple-font"/>
                                                    </a>
                                                </td>
                                            </tr>
                                        )
                                    },this)}
                                    {userManagerDetailReducer.userAddressList.length === 0 &&
                                    <tr className="grey-text text-darken-1">
                                        <td className="no-data-tr" colSpan="5">暂无数据</td>
                                    </tr>}
                                    </tbody>
                                </table>
                            </div>

                            {/* 上下页按钮 */}
                            <div className="col s12 margin-top10">
                                <div className="right">
                                    {userManagerDetailReducer.addressStart > 0 && userManagerDetailReducer.addressDataSize > 0 &&
                                    <a className="waves-light waves-effect custom-blue btn margin-right10" id="pre" onClick={this.addressPreBtn}>
                                        上一页
                                    </a>}
                                    {userManagerDetailReducer.addressDataSize >= userManagerDetailReducer.size &&
                                    <a className="waves-light waves-effect custom-blue btn" id="next" onClick={this.addressNextBtn}>
                                        下一页
                                    </a>}
                                </div>
                            </div>
                        </div>
                        <AddressMapModal/>
                    </div>
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
        dispatch(userManagerDetailAction.getUserNoticeInfo(ownProps.match.params.id));
    },

    // 初始化TAB
    initTabStatus: () => {
        $('.tabs .tab').removeClass("active");
        $(".tab_box").removeClass("active");
        $(".tab_box").hide();
    },

    // 显示 个人资料 TAB1 内容
    showUserBaseTab: () => {
        $('.tabs .tab_base').addClass("active");
        $("#tab_base").addClass("active");
        $("#tab_base").show();
    },
    // 修改用户状态
    changeUserStatus: (status) => {
        dispatch(userManagerDetailAction.changeUserStatus(ownProps.match.params.id, status))
    },

    // 显示 发布文章 TAB2 内容
    showUserArticleTab: () => {
        $('.tabs .tab_article').addClass("active");
        $("#tab_article").addClass("active");
        $("#tab_article").show();
    },
    getUserArticleList: () => {
        dispatch(userManagerDetailAction.getUserArticleList(ownProps.match.params.id));
    },
    setArticleStartNumber: (start) => {
        dispatch(UserManagerDetailActionType.setArticleStartNumber(start))
    },

    // 显示 评论回复 TAB3 内容
    showUserReplyTab: () => {
        $('.tabs .tab_reply').addClass("active");
        $("#tab_reply").addClass("active");
        $("#tab_reply").show();
    },
    getUserCommentList: () => {
        dispatch(userManagerDetailAction.getUserCommentList(ownProps.match.params.id));
    },
    setCommentStartNumber: (start) => {
        dispatch(UserManagerDetailActionType.setCommentStartNumber(start))
    },

    // 显示 投票 TAB4 内容
    showUserVoteTab: () => {
        $('.tabs .tab_vote').addClass("active");
        $("#tab_vote").addClass("active");
        $("#tab_vote").show();
        dispatch(userManagerDetailAction.getUserVoteList(ownProps.match.params.id));
    },
    getUserVoteList: () => {
        dispatch(userManagerDetailAction.getUserVoteList(ownProps.match.params.id));
    },
    setVoteStartNumber: (start) => {
        dispatch(UserManagerDetailActionType.setVoteStartNumber(start))
    },

    // 显示 社交圈 TAB5 内容
    showUserSocialTab: () => {
        $('.tabs .tab_social').addClass("active");
        $("#tab_social").addClass("active");
        $("#tab_social").show();
        dispatch(userManagerDetailAction.getUserAttentionList(ownProps.match.params.id));
        dispatch(UserManagerDetailActionType.setConditionAttentionType({value: 1, label: "已关注"}));
    },
    changeConditionAttentionType: (value) => {
        dispatch(UserManagerDetailActionType.setConditionAttentionType(value));
    },
    getUserAttentionList: () => {
        dispatch(userManagerDetailAction.getUserAttentionList(ownProps.match.params.id));
    },
    setAttentionStartNumber: (start) => {
        dispatch(UserManagerDetailActionType.setAttentionStartNumber(start))
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
        dispatch(userManagerDetailAction.getUserAddressList(ownProps.match.params.id));
    },
    getUserAddressList: () => {
        dispatch(userManagerDetailAction.getUserAddressList(ownProps.match.params.id));
    },
    setAddressStartNumber: (start) => {
        dispatch(UserManagerDetailActionType.setAddressStartNumber(start))
    },
    initAddressMapModalData: (addressDetail) => {
        dispatch(addressMapModalAction.initAddressMapModal(addressDetail));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(UserManagerDetail)