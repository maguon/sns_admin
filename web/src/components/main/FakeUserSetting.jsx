import React from 'react';
import Select from 'react-select';
import {connect} from 'react-redux';
import {Link} from "react-router-dom";
import {TextInput} from 'react-materialize';
import {FakeUserSettingActionType} from '../../types';
import {NewFakeUserModal} from '../modules/index';

const fakeUserSettingAction = require('../../actions/main/FakeUserSettingAction');
const newFakeUserModalAction = require('../../actions/modules/NewFakeUserModalAction');

const sysConst = require('../../utils/SysConst');
const commonUtil = require('../../utils/CommonUtil');

class FakeUserSetting extends React.Component {

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
            this.props.setConditionPhone('');
            this.props.changeConditionStatus(null);
        }
        this.props.getFakeUserList();
    }

    /**
     * 更新 检索条件：手机
     */
    changeConditionPhone = (event) => {
        this.props.setConditionPhone(event.target.value);
    };

    /**
     * 查询员工列表
     */
    queryFakeUserList = () => {
        // 默认第一页
        this.props.setStartNumber(0);
        this.props.getFakeUserList();
    };

    /**
     * 上一页
     */
    preBtn = () => {
        this.props.setStartNumber(this.props.fakeUserSettingReducer.start - (this.props.fakeUserSettingReducer.size - 1));
        this.props.getFakeUserList();
    };

    /**
     * 下一页
     */
    nextBtn = () => {
        this.props.setStartNumber(this.props.fakeUserSettingReducer.start + (this.props.fakeUserSettingReducer.size - 1));
        this.props.getFakeUserList();
    };

    render() {
        const {fakeUserSettingReducer, changeConditionStatus, initModalData} = this.props;
        return (
            <div>
                {/* 标题部分 */}
                <div className="row">
                    <div className="input-field col s12 page-title">
                        <span className="margin-left10">Fake用户管理</span>
                        <div className="divider custom-divider margin-top10"/>
                    </div>
                </div>

                {/* 上部分：检索条件输入区域 */}
                <div className="row grey-text text-darken-1">
                    <div className="col s10 search-condition-box">
                        {/*<TextInput s={3} label="手机" value={fakeUserSettingReducer.conditionPhone} onChange={this.changeConditionPhone}/>*/}
                        <div className="input-field col s3">
                            <Select
                                options={sysConst.USER_STATUS}
                                onChange={changeConditionStatus}
                                value={fakeUserSettingReducer.conditionStatus}
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
                        <a className="btn-floating btn-large waves-light waves-effect btn query-btn" onClick={this.queryFakeUserList}>
                            <i className="mdi mdi-magnify"/>
                        </a>
                    </div>

                    {/* 追加按钮 */}
                    <div className="col s1">
                        <a className="btn-floating btn-large waves-light waves-effect btn add-btn modal-trigger" href="#newFakeUserModal" onClick={initModalData}>
                            <i className="mdi mdi-plus"/>
                        </a>
                    </div>
                    <NewFakeUserModal/>
                </div>

                {/* 下部分：检索结果显示区域 */}
                <div className="row">
                    <div className="col s12">
                        <table className="bordered striped">
                            <thead className="custom-dark-grey table-top-line">
                            <tr className="grey-text text-darken-2">
                                <th>手机</th>
                                <th>昵称</th>
                                <th>真实姓名</th>
                                <th>性别</th>
                                <th>状态</th>
                                <th className="center">操作</th>
                            </tr>
                            </thead>
                            <tbody>
                            {fakeUserSettingReducer.fakeUserArray.map(function (item) {
                                return (
                                    <tr className="grey-text text-darken-1">
                                        <td>{item.phone}</td>
                                        <td>{item.user_detail_info[0].nick_name}</td>
                                        <td>{item.user_detail_info[0].real_name}</td>
                                        <td>{commonUtil.getJsonValue(sysConst.GENDER, item.user_detail_info[0].sex)}</td>
                                        <td>{commonUtil.getJsonValue(sysConst.USER_STATUS, item.status)}</td>
                                        <td className="operation center">
                                            <Link to={{pathname: '/fake_user_setting/' + item._id}}>
                                                <i className="mdi mdi-table-search purple-font"/>
                                            </Link>
                                        </td>
                                    </tr>
                                )
                            })}
                            { fakeUserSettingReducer.fakeUserArray.length === 0 &&
                                <tr className="grey-text text-darken-1">
                                    <td className="no-data-tr" colSpan="6">暂无数据</td>
                                </tr>
                            }
                            </tbody>
                        </table>
                    </div>

                    {/* 上下页按钮 */}
                    <div className="col s12 margin-top10">
                        <div className="right">
                            {fakeUserSettingReducer.start > 0 && fakeUserSettingReducer.dataSize > 0 &&
                            <a className="waves-light waves-effect custom-blue btn margin-right10" id="pre" onClick={this.preBtn}>
                                上一页
                            </a>}
                            {fakeUserSettingReducer.dataSize >= fakeUserSettingReducer.size &&
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
        fakeUserSettingReducer: state.FakeUserSettingReducer,
        fromDetail: fromDetail
    }
};

const mapDispatchToProps = (dispatch) => ({
    getFakeUserList: () => {
        dispatch(fakeUserSettingAction.getFakeUserList())
    },
    setStartNumber: (start) => {
        dispatch(FakeUserSettingActionType.setStartNumber(start))
    },
    setConditionPhone: (value) => {
        dispatch(FakeUserSettingActionType.setConditionPhone(value))
    },
    changeConditionStatus: (value) => {
        dispatch(FakeUserSettingActionType.setConditionStatus(value))
    },
    initModalData: () => {
        dispatch(newFakeUserModalAction.initNewFakeUserModal());
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(FakeUserSetting)