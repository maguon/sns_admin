import React from 'react';
import {connect} from 'react-redux';
import {Link} from "react-router-dom";
import {TextInput} from 'react-materialize';
import {AdminUserSettingActionType, UserManagerActionType} from '../../types';
import Select from "react-select";

const UserManagerAction = require('../../actions/main/UserManagerAction');
const sysConst = require('../../utils/SysConst');
const formatUtil = require('../../utils/FormatUtil');
const commonUtil = require('../../utils/CommonUtil');

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
            this.props.setConditionNickname('');
            this.props.changeConditionStatus(null);
        }
        this.props.getUserList();
    }

    /**
     * 更新 检索条件：用户ID
     */
    changeConditionUserId = (event) => {
        this.props.setConditionUserId(event.target.value);
    };

    /**
     * 更新 检索条件：用户电话
     */
    changeConditionPhone = (event) => {
        this.props.setConditionPhone(event.target.value);
    };

    /**
     * 更新 检索条件：用户昵称
     */
    changeConditionNickname = (event) => {
        this.props.setConditionNickname(event.target.value);
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
        const {userManagerReducer, changeConditionStatus} = this.props;
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
                        <TextInput s={3} label="用户编号" value={userManagerReducer.conditionUserId} onChange={this.changeConditionUserId}/>

                        <TextInput s={3} label="用户电话" value={userManagerReducer.conditionPhone} onChange={this.changeConditionPhone}/>

                        <TextInput s={3} label="用户昵称" value={userManagerReducer.conditionNickname} onChange={this.changeConditionNickname}/>

                        <div className="input-field col s3">
                            <Select
                                options={sysConst.USE_FLAG}
                                onChange={changeConditionStatus}
                                value={userManagerReducer.conditionStatus}
                                isSearchable={false}
                                placeholder={"请选择"}
                                styles={sysConst.CUSTOM_REACT_SELECT_STYLE}
                                isClearable={true}
                            />
                            <label className="active">状态</label>
                        </div>
                    </div>

                    {/* 查询按钮 */}
                    <div className="col s1">
                        <a className="btn-floating btn-large waves-light waves-effect btn query-btn" onClick={this.queryUser}>
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
                                <th>用户编号</th>
                                <th>用户电话</th>
                                <th>昵称</th>
                                <th>状态</th>
                                <th className="center">操作</th>
                            </tr>
                            </thead>
                            <tbody>
                            {userManagerReducer.userArray.map(function (item) {
                                return (
                                    <tr className="grey-text text-darken-1">
                                        <td>{item._id}</td>
                                        <td>{item.phone}</td>
                                        <td>{item.nikename}</td>
                                        <td>{commonUtil.getJsonValue(sysConst.USE_FLAG, item.status)}</td>
                                        <td className="operation center">
                                            <Link to={{pathname: '/user/' + item.id}}>
                                                <i className="mdi mdi-table-search purple-font"/>
                                            </Link>
                                        </td>
                                    </tr>
                                )
                            })}
                            {userManagerReducer.userArray.length === 0 &&
                            <tr className="grey-text text-darken-1">
                                <td className="no-data-tr" colSpan="5">暂无数据</td>
                            </tr>
                            }
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
    setConditionNickname: (value) => {
        dispatch(UserManagerActionType.setConditionNickname(value))
    },
    changeConditionStatus: (value) => {
        dispatch(AdminUserSettingActionType.setConditionStatus(value))
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(UserManager)