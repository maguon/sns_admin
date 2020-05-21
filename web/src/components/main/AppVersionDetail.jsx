import React from 'react';
import {TextInput} from 'react-materialize';
import {connect} from 'react-redux';
import {Link} from "react-router-dom";
import {AppVersionDetailActionType} from "../../types";
import Select from "react-select";

const appVersionDetailAction = require('../../actions/main/AppVersionDetailAction');
const sysConst = require('../../utils/SysConst');

// App系统 - 详情
class AppVersionDetail extends React.Component {

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
        // 取得App信息
        this.props.getAppInfo();
    }

    /**
     * 更新 版本号
     */
    changeVersion = (event) => {
        this.props.setVersion(event.target.value);
    };

    /**
     * 更新 版本序号
     */
    changeVersionNum = (event) => {
        this.props.setVersionNum(event.target.value);
    };

    /**
     * 更新 最低版本号
     */
    changeMinVersionNum = (event) => {
        this.props.setMinVersionNum(event.target.value);
    };

    /**
     * 更新 下载地址
     */
    changeUrl = (event) => {
        this.props.setUrl(event.target.value);
    };

    /**
     * 更新 备注
     */
    changeRemark = (event) => {
        this.props.setRemark(event.target.value);
    };

    render() {
        const {appVersionDetailReducer, changeStatus, changeAppType, changeDeviceType, changeForceUpdate, saveApp} = this.props;
        return (
            <div>
                {/* 标题部分 */}
                <div className="row margin-bottom0">
                    <div className="input-field col s12">
                        <Link to={{pathname: '/app_version', state: {fromDetail: true}}}>
                            <a className="btn-floating btn waves-effect custom-blue waves-light fz15">
                                <i className="mdi mdi-arrow-left-bold"/>
                            </a>
                        </Link>
                        <span className="page-title margin-left30">App系统 - 详情</span>
                        <div className="divider custom-divider margin-top10"/>
                    </div>
                </div>

                {/* 主体 */}
                <div className="row margin-top40 margin-left150 margin-right150 detail-box z-depth-1 grey-text">
                    <div className="col s12 padding-top15 padding-bottom15 custom-grey purple-font border-bottom-line">
                        <div className="col s6">App编号：{appVersionDetailReducer.appId}</div>
                        <div className="col s6 padding-right0 right-align">
                            {/* 状态：开关 */}
                            <span className="switch">
                                <label>
                                <input type="checkbox" checked={appVersionDetailReducer.appStatus === 1}
                                       onClick={() => {changeStatus(appVersionDetailReducer.appId, appVersionDetailReducer.appStatus)}}/>
                                <span className="lever"/>
                                </label>
                            </span>
                        </div>
                    </div>

                    <div className="col s12 padding-top20 padding-bottom20">
                        <div className="input-field col s4">
                            <Select
                                options={sysConst.APP_TYPE}
                                onChange={changeAppType}
                                value={appVersionDetailReducer.appType}
                                isSearchable={false}
                                placeholder={"请选择"}
                                styles={sysConst.CUSTOM_REACT_SELECT_STYLE}
                                isClearable={false}
                            />
                            <label className="active">App类型</label>
                        </div>

                        <div className="input-field col s4">
                            <Select
                                options={sysConst.SYSTEM_TYPE}
                                onChange={changeDeviceType}
                                value={appVersionDetailReducer.deviceType}
                                isSearchable={false}
                                placeholder={"请选择"}
                                styles={sysConst.CUSTOM_REACT_SELECT_STYLE}
                                isClearable={false}
                            />
                            <label className="active">系统类型</label>
                        </div>

                        <div className="input-field col s4">
                            <Select
                                options={sysConst.FORCE_UPDATE}
                                onChange={changeForceUpdate}
                                value={appVersionDetailReducer.forceUpdate}
                                isSearchable={false}
                                placeholder={"请选择"}
                                styles={sysConst.CUSTOM_REACT_SELECT_STYLE}
                                isClearable={false}
                            />
                            <label className="active">强制更新</label>
                        </div>

                        <TextInput s={4} label="版本号" maxLength="20" value={appVersionDetailReducer.version} onChange={this.changeVersion}/>
                        <TextInput s={4} label="版本序号" type="number" value={appVersionDetailReducer.versionNum} onChange={this.changeVersionNum}/>
                        <TextInput s={4} label="最低版本号" type="number" value={appVersionDetailReducer.minVersionNum} onChange={this.changeMinVersionNum}/>

                        <TextInput s={12} label="下载地址" maxLength="50" value={appVersionDetailReducer.url} onChange={this.changeUrl}/>
                        <TextInput s={12} label="备注" maxLength="100" value={appVersionDetailReducer.remark} onChange={this.changeRemark}/>
                    </div>
                    <div className="col s12 padding-top20 padding-bottom20 right-align">
                        {appVersionDetailReducer.appStatus === 1 &&
                        <button type="button" className="btn confirm-btn margin-right10" onClick={saveApp}>修改</button>}
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        appVersionDetailReducer: state.AppVersionDetailReducer
    }
};

const mapDispatchToProps = (dispatch, ownProps) => ({
    getAppInfo: () => {
        dispatch(appVersionDetailAction.getAppInfo(ownProps.match.params.id));
    },
    changeStatus: (id, status) => {
        dispatch(appVersionDetailAction.changeAppStatus(id, status))
    },

    changeAppType: (value) => {
        dispatch(AppVersionDetailActionType.setAppType(value));
    },
    changeDeviceType: (value) => {
        dispatch(AppVersionDetailActionType.setDeviceType(value));
    },
    setVersion: (value) => {
        dispatch(AppVersionDetailActionType.setVersion(value));
    },
    setVersionNum: (value) => {
        dispatch(AppVersionDetailActionType.setVersionNum(value));
    },

    setMinVersionNum: (value) => {
        dispatch(AppVersionDetailActionType.setMinVersionNum(value));
    },
    changeForceUpdate: (value) => {
        dispatch(AppVersionDetailActionType.setForceUpdate(value));
    },
    setUrl: (value) => {
        dispatch(AppVersionDetailActionType.setUrl(value));
    },
    setRemark: (value) => {
        dispatch(AppVersionDetailActionType.setRemark(value));
    },

    saveApp: () => {
        dispatch(appVersionDetailAction.saveApp());
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(AppVersionDetail)