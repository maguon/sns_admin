import React from 'react';
import {connect} from 'react-redux';
import {Link} from "react-router-dom";

const deviceManagerDetailAction = require('../../actions/main/DeviceManagerDetailAction');
const sysConst = require('../../utils/SysConst');
const commonUtil = require('../../utils/CommonUtil');

// 设备管理 - 设备详情
class DeviceManagerDetail extends React.Component {

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
        // 取得基本信息
        this.props.getDeviceInfo();
    }

    render() {
        const {deviceManagerDetailReducer} = this.props;
        return (
            <div>
                {/* 标题部分 */}
                <div className="row margin-bottom0">
                    <div className="input-field col s12">
                        <Link to={{pathname: '/device', state: {fromDetail: true}}}>
                            <a className="btn-floating btn waves-effect custom-blue waves-light fz15">
                                <i className="mdi mdi-arrow-left-bold"/>
                            </a>
                        </Link>
                        <span className="page-title margin-left30">设备管理 - 设备详情</span>
                        <div className="divider custom-divider margin-top10"/>
                    </div>
                </div>

                {/* 文章 */}
                {deviceManagerDetailReducer.deviceInfo.length > 0 &&
                <div className="row margin-top20 margin-left20 margin-right20">
                    <div className="col s4 margin-top15">用户ID：{deviceManagerDetailReducer.deviceInfo[0]._user_id}</div>
                    <div className="col s4 margin-top15">用户昵称：{deviceManagerDetailReducer.deviceInfo[0].user_detail_info[0].nick_name}</div>
                    <div className="col s4 margin-top15">电话：{deviceManagerDetailReducer.deviceInfo[0].user_login_info[0].phone}</div>

                    <div className="col s4 margin-top15">App类型：{commonUtil.getJsonValue(sysConst.APP_TYPE, deviceManagerDetailReducer.deviceInfo[0].app_type)}</div>
                    <div className="col s4 margin-top15">设备类型：{commonUtil.getJsonValue(sysConst.SYSTEM_TYPE, deviceManagerDetailReducer.deviceInfo[0].device_type)}</div>
                    <div className="col s4 margin-top15">系统版本：{deviceManagerDetailReducer.deviceInfo[0].version}</div>

                    <div className="col s4 margin-top15">设备Token：{deviceManagerDetailReducer.deviceInfo[0].device_token}</div>
                    <div className="col s4 margin-top15">设备名称：{deviceManagerDetailReducer.deviceInfo[0].device_info === undefined ? '无' : deviceManagerDetailReducer.deviceInfo[0].device_info.device_name}</div>
                    <div className="col s4 margin-top15">系统：{deviceManagerDetailReducer.deviceInfo[0].device_info === undefined ? '无' : deviceManagerDetailReducer.deviceInfo[0].device_info.os_version}</div>

                    <div className="col s4 margin-top15">设备登录状态：{commonUtil.getJsonValue(sysConst.DEVICE_LOGIN_STATUS, deviceManagerDetailReducer.deviceInfo[0].status)}</div>
                </div>}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        deviceManagerDetailReducer: state.DeviceManagerDetailReducer
    }
};

const mapDispatchToProps = (dispatch, ownProps) => ({
    // 基本信息
    getDeviceInfo: () => {
        dispatch(deviceManagerDetailAction.getDeviceInfo(ownProps.match.params.id))
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(DeviceManagerDetail)