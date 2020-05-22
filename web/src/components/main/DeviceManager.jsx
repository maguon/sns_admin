import React from 'react';
import {connect} from 'react-redux';
import {Link} from "react-router-dom";
import {TextInput} from 'react-materialize';
import {DeviceManagerActionType} from '../../types';
import Select from "react-select";

const deviceManagerAction = require('../../actions/main/DeviceManagerAction');
const commonAction = require('../../actions/layout/CommonAction');
const sysConst = require('../../utils/SysConst');
const formatUtil = require('../../utils/FormatUtil');
const commonUtil = require('../../utils/CommonUtil');

// 设备管理
class DeviceManager extends React.Component {

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
            // 清空检索条件
            this.props.setConditionPhone('');
            this.props.changeConditionDeviceType(null);
            this.props.changeConditionVersion(null);
            this.props.changeConditionStatus(null);
        }
        this.props.getDeviceList();
    }

    /**
     * 更新 检索条件：手机
     */
    changeConditionPhone = (event) => {
        this.props.setConditionPhone(event.target.value);
    };

    /**
     * 查询设备列表
     */
    queryDeviceList = () => {
        // 默认第一页
        this.props.setStartNumber(0);
        this.props.getDeviceList();
    };

    /**
     * 上一页
     */
    preBtn = () => {
        this.props.setStartNumber(this.props.deviceManagerReducer.start - (this.props.deviceManagerReducer.size - 1));
        this.props.getDeviceList();
    };

    /**
     * 下一页
     */
    nextBtn = () => {
        this.props.setStartNumber(this.props.deviceManagerReducer.start + (this.props.deviceManagerReducer.size - 1));
        this.props.getDeviceList();
    };

    render() {
        const {deviceManagerReducer, commonReducer, changeConditionDeviceType, changeConditionVersion, changeConditionStatus} = this.props;
        return (
            <div>
                {/* 标题部分 */}
                <div className="row">
                    <div className="input-field col s12 page-title">
                        <span className="margin-left10">设备管理</span>
                        <div className="divider custom-divider margin-top10"/>
                    </div>
                </div>

                {/* 上部分：检索条件输入区域 */}
                <div className="row grey-text text-darken-1">
                    <div className="col s11 search-condition-box">
                        <TextInput s={3} label="电话(11位)" value={deviceManagerReducer.conditionPhone} onChange={this.changeConditionPhone}/>

                        <div className="input-field col s3">
                            <Select
                                options={sysConst.SYSTEM_TYPE}
                                onChange={changeConditionDeviceType}
                                value={deviceManagerReducer.conditionDeviceType}
                                isSearchable={false}
                                placeholder={"请选择"}
                                styles={sysConst.CUSTOM_REACT_SELECT_STYLE}
                                isClearable={true}
                            />
                            <label className="active">设备类型</label>
                        </div>

                        <div className="input-field col s3">
                            <Select
                                options={commonReducer.appVersionList}
                                onChange={changeConditionVersion}
                                value={deviceManagerReducer.conditionVersion}
                                isSearchable={false}
                                placeholder={"请选择"}
                                noOptionsMessage={() => "无"}
                                styles={sysConst.CUSTOM_REACT_SELECT_STYLE}
                                isClearable={true}
                            />
                            <label className="active">设备版本</label>
                        </div>

                        <div className="input-field col s3">
                            <Select
                                options={sysConst.DEVICE_LOGIN_STATUS}
                                onChange={changeConditionStatus}
                                value={deviceManagerReducer.conditionStatus}
                                isSearchable={false}
                                placeholder={"请选择"}
                                styles={sysConst.CUSTOM_REACT_SELECT_STYLE}
                                isClearable={true}
                            />
                            <label className="active">登录状态</label>
                        </div>
                    </div>

                    {/* 查询按钮 */}
                    <div className="col s1">
                        <a className="btn-floating btn-large waves-light waves-effect btn query-btn" onClick={this.queryDeviceList}>
                            <i className="mdi mdi-magnify"/>
                        </a>
                    </div>
                </div>

                {/* 下部分：检索结果显示区域 */}
                <div className="row">
                    <div className="col s12">
                        <table className="fixed-table bordered striped">
                            <thead className="custom-dark-grey table-top-line">
                            <tr className="grey-text text-darken-2">
                                <th>用户昵称</th>
                                <th>电话</th>
                                <th>设备类型</th>
                                <th>设备版本</th>
                                <th>设备登录状态</th>
                                <th>设备名称</th>
                                <th>系统</th>
                                <th className="center">操作</th>
                            </tr>
                            </thead>
                            <tbody>
                            {deviceManagerReducer.deviceArray.map(function (item) {
                                return (
                                    <tr className="grey-text text-darken-1">
                                        {/* 用户昵称 */}
                                        <td>{item.user_detail_info[0].nick_name}</td>
                                        {/* 电话 */}
                                        <td>{item.user_login_info[0].phone}</td>
                                        {/* 设备类型 */}
                                        <td>{commonUtil.getJsonValue(sysConst.SYSTEM_TYPE, item.device_type)}</td>
                                        {/* 系统版本 */}
                                        <td>{item.version}</td>
                                        {/* 设备登录状态 */}
                                        <td>{commonUtil.getJsonValue(sysConst.DEVICE_LOGIN_STATUS, item.status)}</td>
                                        {/* 设备名称 */}
                                        <td>{item.device_info === undefined ? '' : item.device_info.device_name}</td>
                                        {/* 系统 */}
                                        <td>{item.device_info === undefined ? '' : item.device_info.os_version}</td>
                                        {/* 操作 */}
                                        <td className="operation center"  style={{width: '150px'}}>
                                            <Link to={{pathname: '/device/' + item._id}}>
                                                <i className="mdi mdi-table-search purple-font margin-left10"/>
                                            </Link>
                                        </td>
                                    </tr>
                                )
                            },this)}
                            {deviceManagerReducer.deviceArray.length === 0 &&
                            <tr className="grey-text text-darken-1">
                                <td className="no-data-tr" colSpan="8">暂无数据</td>
                            </tr>}
                            </tbody>
                        </table>
                    </div>

                    {/* 上下页按钮 */}
                    <div className="col s12 margin-top10">
                        <div className="right">
                            {deviceManagerReducer.start > 0 && deviceManagerReducer.dataSize > 0 &&
                            <a className="waves-light waves-effect custom-blue btn margin-right10" id="pre" onClick={this.preBtn}>
                                上一页
                            </a>}
                            {deviceManagerReducer.dataSize >= deviceManagerReducer.size &&
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
        deviceManagerReducer: state.DeviceManagerReducer,
        commonReducer: state.CommonReducer,
        fromDetail: fromDetail
    }
};

const mapDispatchToProps = (dispatch) => ({
    getDeviceList: () => {
        dispatch(deviceManagerAction.getDeviceList());
    },
    setStartNumber: (start) => {
        dispatch(DeviceManagerActionType.setStartNumber(start))
    },
    setConditionPhone: (value) => {
        dispatch(DeviceManagerActionType.setConditionPhone(value))
    },
    changeConditionDeviceType: (value) => {
        dispatch(DeviceManagerActionType.setConditionDeviceType(value));
        dispatch(commonAction.getAppVersionList(value === null ? -1 : value.value));
    },
    changeConditionVersion: (value) => {
        dispatch(DeviceManagerActionType.setConditionVersion(value))
    },
    changeConditionStatus: (value) => {
        dispatch(DeviceManagerActionType.setConditionStatus(value))
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(DeviceManager)