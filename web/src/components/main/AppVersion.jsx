import React from 'react';
import Select from 'react-select';
import {connect} from 'react-redux';
import {Link} from "react-router-dom";
import {AppVersionActionType} from '../../types';
import {NewAppModal} from '../modules/index';

const appVersionAction = require('../../actions/main/AppVersionAction');
const newAppModalAction = require('../../actions/modules/NewAppModalAction');
const sysConst = require('../../utils/SysConst');
const commonUtil = require('../../utils/CommonUtil');

// App系统
class AppVersion extends React.Component {

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
            this.props.changeConditionDeviceType(null);
            this.props.changeConditionStatus(null);
        }
        this.props.getAppList();
    }

    /**
     * 查询App列表
     */
    queryAppList = () => {
        // 默认第一页
        this.props.setStartNumber(0);
        this.props.getAppList();
    };

    /**
     * 上一页
     */
    preBtn = () => {
        this.props.setStartNumber(this.props.appVersionReducer.start - (this.props.appVersionReducer.size - 1));
        this.props.getAppList();
    };

    /**
     * 下一页
     */
    nextBtn = () => {
        this.props.setStartNumber(this.props.appVersionReducer.start + (this.props.appVersionReducer.size - 1));
        this.props.getAppList();
    };

    /**
     * 删除App
     */
    deleteApp = (id) => {
        this.props.deleteApp(id);
    };

    render() {
        const {appVersionReducer, changeConditionDeviceType, changeConditionStatus, initModalData} = this.props;
        return (
            <div>
                {/* 标题部分 */}
                <div className="row">
                    <div className="input-field col s12 page-title">
                        <span className="margin-left10">App系统</span>
                        <div className="divider custom-divider margin-top10"/>
                    </div>
                </div>

                {/* 上部分：检索条件输入区域 */}
                <div className="row grey-text text-darken-1">
                    <div className="col s10 search-condition-box">
                        <div className="input-field col s3">
                            <Select
                                options={sysConst.SYSTEM_TYPE}
                                onChange={changeConditionDeviceType}
                                value={appVersionReducer.conditionDeviceType}
                                isSearchable={false}
                                placeholder={"请选择"}
                                styles={sysConst.CUSTOM_REACT_SELECT_STYLE}
                                isClearable={true}
                            />
                            <label className="active">系统</label>
                        </div>

                        <div className="input-field col s3">
                            <Select
                                options={sysConst.USE_FLAG}
                                onChange={changeConditionStatus}
                                value={appVersionReducer.conditionStatus}
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
                        <a className="btn-floating btn-large waves-light waves-effect btn query-btn" onClick={this.queryAppList}>
                            <i className="mdi mdi-magnify"/>
                        </a>
                    </div>

                    {/* 追加按钮 */}
                    <div className="col s1">
                        <a className="btn-floating btn-large waves-light waves-effect btn add-btn modal-trigger" href="#newAppModal" onClick={initModalData}>
                            <i className="mdi mdi-plus"/>
                        </a>
                    </div>
                    <NewAppModal/>
                </div>

                {/* 下部分：检索结果显示区域 */}
                <div className="row">
                    <div className="col s12">
                        <table className="bordered striped">
                            <thead className="custom-dark-grey table-top-line">
                            <tr className="grey-text text-darken-2">
                                <th>App类型</th>
                                <th>系统类型</th>
                                <th>版本号</th>
                                <th>版本序号</th>
                                <th>最低版本号</th>
                                <th>强制更新</th>
                                <th>状态</th>
                                <th className="center">操作</th>
                            </tr>
                            </thead>
                            <tbody>
                            {appVersionReducer.appArray.map(function (item) {
                                return (
                                    <tr className="grey-text text-darken-1">
                                        <td>{commonUtil.getJsonValue(sysConst.APP_TYPE, item.app_type)}</td>
                                        <td>{commonUtil.getJsonValue(sysConst.SYSTEM_TYPE, item.device_type)}</td>
                                        <td>{item.version}</td>
                                        <td>{item.version_num}</td>
                                        <td>{item.min_version_num}</td>
                                        <td>{commonUtil.getJsonValue(sysConst.FORCE_UPDATE, item.force_update)}</td>
                                        <td>{commonUtil.getJsonValue(sysConst.USE_FLAG, item.status)}</td>
                                        <td className="operation center">
                                            <i className="mdi mdi-close purple-font pointer margin-right10" onClick={() => {this.deleteApp(item._id)}}/>
                                            <Link to={{pathname: '/app_version/' + item._id}}>
                                                <i className="mdi mdi-table-search purple-font margin-left10"/>
                                            </Link>
                                        </td>
                                    </tr>
                                )
                            },this)}
                            { appVersionReducer.appArray.length === 0 &&
                                <tr className="grey-text text-darken-1">
                                    <td className="no-data-tr" colSpan="8">暂无数据</td>
                                </tr>
                            }
                            </tbody>
                        </table>
                    </div>

                    {/* 上下页按钮 */}
                    <div className="col s12 margin-top10">
                        <div className="right">
                            {appVersionReducer.start > 0 && appVersionReducer.dataSize > 0 &&
                            <a className="waves-light waves-effect custom-blue btn margin-right10" id="pre" onClick={this.preBtn}>
                                上一页
                            </a>}
                            {appVersionReducer.dataSize >= appVersionReducer.size &&
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
        appVersionReducer: state.AppVersionReducer,
        fromDetail: fromDetail
    }
};

const mapDispatchToProps = (dispatch) => ({
    getAppList: () => {
        dispatch(appVersionAction.getAppList())
    },
    setStartNumber: (start) => {
        dispatch(AppVersionActionType.setStartNumber(start))
    },
    changeConditionDeviceType: (value) => {
        dispatch(AppVersionActionType.setConditionDeviceType(value))
    },
    changeConditionStatus: (value) => {
        dispatch(AppVersionActionType.setConditionStatus(value))
    },
    deleteApp: (id) => {
        dispatch(appVersionAction.deleteApp(id));
    },
    initModalData: () => {
        dispatch(newAppModalAction.initNewAppModal());
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(AppVersion)