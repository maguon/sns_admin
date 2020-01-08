import React from 'react';
import {connect} from 'react-redux';
import {Link} from "react-router-dom";
import {DatePicker, TextInput} from 'react-materialize';
import {UserManagerActionType} from '../../types';
import Select from "react-select";

const UserManagerAction = require('../../actions/main/UserManagerAction');
const sysConst = require('../../utils/SysConst');
const formatUtil = require('../../utils/FormatUtil');
const commonUtil = require('../../utils/CommonUtil');

// 用户管理
class UserManager extends React.Component {

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
        if (!this.props.fromDetail) {
            this.props.setStartNumber(0);
            this.props.setConditionUserId('');
            this.props.setConditionPhone('');
            this.props.changeConditionGender(null);
            this.props.setConditionNickname('');
            this.props.setConditionCity('');
            this.props.changeConditionDrivingType(null);
            this.props.setConditionCreatedOnStart('');
            this.props.setConditionCreatedOnEnd('');
        }
        this.props.getUserList();
    }

    /**
     * 更新 检索条件：用户编号
     */
    changeConditionUserId = (event) => {
        this.props.setConditionUserId(event.target.value);
    };

    /**
     * 更新 检索条件：注册手机
     */
    changeConditionPhone = (event) => {
        this.props.setConditionPhone(event.target.value);
    };

    /**
     * 更新 检索条件：昵称
     */
    changeConditionNickname = (event) => {
        this.props.setConditionNickname(event.target.value);
    };

    /**
     * 更新 检索条件：城市
     */
    changeConditionCity = (event) => {
        this.props.setConditionCity(event.target.value);
    };

    /**
     * 更新 检索条件：注册时间(始)
     */
    changeConditionCreatedOnStart = (value) => {
        this.props.setConditionCreatedOnStart(formatUtil.getDate(value));
    };
    clearConditionCreatedOnStart = () => {
        this.props.setConditionCreatedOnStart('');
    };

    /**
     * 更新 检索条件：注册时间(始)
     */
    changeConditionCreatedOnEnd = (value) => {
        this.props.setConditionCreatedOnEnd(formatUtil.getDate(value));
    };
    clearConditionCreatedOnEnd = () => {
        this.props.setConditionCreatedOnEnd('');
    };

    /**
     * 查询用户列表
     */
    queryUser = () => {
        // 默认第一页
        this.props.setStartNumber(0);
        this.props.getUserList();
    };

    /**
     * 上一页
     */
    preBtn = () => {
        this.props.setStartNumber(this.props.userManagerReducer.start - (this.props.userManagerReducer.size - 1));
        this.props.getUserList();
    };

    /**
     * 下一页
     */
    nextBtn = () => {
        this.props.setStartNumber(this.props.userManagerReducer.start + (this.props.userManagerReducer.size - 1));
        this.props.getUserList();
    };

    render() {
        const {userManagerReducer, changeConditionGender, changeConditionDrivingType} = this.props;
        return (
            <div>
                {/* 标题部分 */}
                <div className="row">
                    <div className="input-field col s12 page-title">
                        <span className="margin-left10">用户管理</span>
                        <div className="divider custom-divider margin-top10"/>
                    </div>
                </div>

                {/* 上部分：检索条件输入区域 */}
                <div className="row grey-text text-darken-1">
                    <div className="col s11 search-condition-box">
                        <TextInput s={3} label="编号" value={userManagerReducer.conditionUserId} onChange={this.changeConditionUserId}/>
                        <TextInput s={3} label="注册手机" value={userManagerReducer.conditionPhone} onChange={this.changeConditionPhone}/>
                        <div className="input-field col s3">
                            <Select
                                options={sysConst.GENDER}
                                onChange={changeConditionGender}
                                value={userManagerReducer.conditionGender}
                                isSearchable={false}
                                placeholder={"请选择"}
                                styles={sysConst.CUSTOM_REACT_SELECT_STYLE}
                                isClearable={true}
                            />
                            <label className="active">性别</label>
                        </div>
                        <TextInput s={3} label="昵称" value={userManagerReducer.conditionNickname} onChange={this.changeConditionNickname}/>

                        <TextInput s={3} label="城市" value={userManagerReducer.conditionCity} onChange={this.changeConditionCity}/>
                        {/*<div className="input-field col s3">*/}
                        {/*    <Select*/}
                        {/*        options={sysConst.DRIVING_TYPE}*/}
                        {/*        onChange={changeConditionDrivingType}*/}
                        {/*        value={userManagerReducer.conditionDrivingType}*/}
                        {/*        isSearchable={false}*/}
                        {/*        placeholder={"请选择"}*/}
                        {/*        styles={sysConst.CUSTOM_REACT_SELECT_STYLE}*/}
                        {/*        isClearable={true}*/}
                        {/*    />*/}
                        {/*    <label className="active">驾照类型</label>*/}
                        {/*</div>*/}
                        {/* 查询条件：注册时间(始) */}
                        <div className="input-field col s3 custom-input-field">
                            <DatePicker s={12} label="注册时间(始)" options={sysConst.DATE_PICKER_OPTION}
                                        value={userManagerReducer.conditionCreatedOnStart} onChange={this.changeConditionCreatedOnStart} />
                            {userManagerReducer.conditionCreatedOnStart !== '' && <span className="mdi data-clear-icon mdi-window-close" onClick={this.clearConditionCreatedOnStart}/>}
                            <span className="mdi data-icon mdi-table-large"/>
                        </div>

                        {/* 查询条件：注册时间(终) */}
                        <div className="input-field col s3 custom-input-field">
                            <DatePicker s={12} label="注册时间(终)" options={sysConst.DATE_PICKER_OPTION}
                                        value={userManagerReducer.conditionCreatedOnEnd} onChange={this.changeConditionCreatedOnEnd} />
                            {userManagerReducer.conditionCreatedOnEnd !== '' && <span className="mdi data-clear-icon mdi-window-close" onClick={this.clearConditionCreatedOnEnd}/>}
                            <span className="mdi data-icon mdi-table-large"/>
                        </div>
                    </div>

                    {/* 查询按钮 */}
                    <div className="col s1">
                        <a className="btn-floating btn-large waves-light waves-effect btn query-btn margin-top40" onClick={this.queryUser}>
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
                                <th>编号</th>
                                <th>昵称</th>
                                <th>手机</th>
                                <th>城市</th>

                                {/*<th>驾照类型</th>*/}
                                <th>发布文章</th>
                                <th>关注</th>
                                <th>被关注</th>

                                <th>评论数</th>
                                <th>参与投票</th>
                                <th>收藏文章</th>
                                <th>收藏位置</th>

                                <th className="center">注册时间</th>
                                <th className="center">状态</th>
                                <th className="center">操作</th>
                            </tr>
                            </thead>
                            <tbody>
                            {userManagerReducer.userArray.map(function (item) {
                                return (
                                    <tr className="grey-text text-darken-1">
                                        {/* 编号 */}
                                        <td>{item._user_id}</td>
                                        {/* 昵称 */}
                                        <td>{item.nick_name}</td>
                                        {/* 手机 */}
                                        <td>{item.user_login_info[0].phone}</td>
                                        {/* 城市 */}
                                        <td>{item.city_name}</td>

                                        {/*/!* 驾照类型 *!/*/}
                                        {/*<td>{commonUtil.getJsonValue(sysConst.DRIVING_TYPE, item._userDriveId.driving_type)}</td>*/}
                                        {/* 发布文章 */}
                                        <td>{item.msg_num}</td>
                                        {/* 关注 */}
                                        <td>{item.follow_num}</td>
                                        {/* 被关注 */}
                                        <td>{item.attention_num}</td>

                                        {/* 评论数 */}
                                        <td>{item.comments_num}</td>
                                        {/* 参与投票 */}
                                        <td>{item.vote_num}</td>
                                        {/* 收藏文章 */}
                                        <td>{item.msg_coll_num}</td>
                                        {/* 收藏位置 */}
                                        <td>{item.loca_coll_num}</td>

                                        {/* 注册时间 */}
                                        <td className="center">{formatUtil.getDateTime(item.created_at)}</td>
                                        {/* 状态 */}
                                        <td>{commonUtil.getJsonValue(sysConst.USER_STATUS, item.user_login_info[0].status)}</td>
                                        <td className="operation center">
                                            <Link to={{pathname: '/user/' + item._user_id}}>
                                                <i className="mdi mdi-table-search purple-font"/>
                                            </Link>
                                        </td>
                                    </tr>
                                )
                            })}
                            {userManagerReducer.userArray.length === 0 &&
                            <tr className="grey-text text-darken-1">
                                <td className="no-data-tr" colSpan="14">暂无数据</td>
                            </tr>}
                            </tbody>
                        </table>
                    </div>

                    {/* 上下页按钮 */}
                    <div className="col s12 margin-top10">
                        <div className="right">
                            {userManagerReducer.start > 0 && userManagerReducer.dataSize > 0 &&
                            <a className="waves-light waves-effect custom-blue btn margin-right10" id="pre" onClick={this.preBtn}>
                                上一页
                            </a>}
                            {userManagerReducer.dataSize >= userManagerReducer.size &&
                            <a className="waves-light waves-effect custom-blue btn" id="next" onClick={this.nextBtn}>
                                下一页
                            </a>}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    let fromDetail = false;
    if (typeof ownProps.location.state !== 'undefined' && ownProps.location.state.fromDetail === true) {
        fromDetail = true;
    }
    return {
        userManagerReducer: state.UserManagerReducer,
        fromDetail: fromDetail
    }
};

const mapDispatchToProps = (dispatch) => ({
    getUserList: () => {
        dispatch(UserManagerAction.getUserList());
    },
    setStartNumber: (start) => {
        dispatch(UserManagerActionType.setStartNumber(start))
    },
    setConditionUserId: (value) => {
        dispatch(UserManagerActionType.setConditionUserId(value))
    },
    setConditionPhone: (value) => {
        dispatch(UserManagerActionType.setConditionPhone(value))
    },
    changeConditionGender: (value) => {
        dispatch(UserManagerActionType.setConditionGender(value))
    },
    setConditionNickname: (value) => {
        dispatch(UserManagerActionType.setConditionNickname(value))
    },
    setConditionCity: (value) => {
        dispatch(UserManagerActionType.setConditionCity(value))
    },
    changeConditionDrivingType: (value) => {
        dispatch(UserManagerActionType.setConditionDrivingType(value))
    },
    setConditionCreatedOnStart: (value) => {
        dispatch(UserManagerActionType.setConditionCreatedOnStart(value))
    },
    setConditionCreatedOnEnd: (value) => {
        dispatch(UserManagerActionType.setConditionCreatedOnEnd(value))
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(UserManager)