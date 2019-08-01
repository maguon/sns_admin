import React from 'react';
import {TextInput} from 'react-materialize';
import {connect} from 'react-redux';
import {Link} from "react-router-dom";
import {AdminUserSettingDetailActionType} from "../../types";

const adminUserSettingDetailAction = require('../../actions/main/AdminUserSettingDetailAction');

class AdminUserSettingDetail extends React.Component {

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
        // 取得员工信息
        this.props.getAdminInfo();
    }

    /**
     * 更新 姓名
     */
    changeAdminName = (event) => {
        this.props.setAdminName(event.target.value);
    };

    /**
     * 更新 姓名
     */
    changeRealName = (event) => {
        this.props.setRealName(event.target.value);
    };

    render() {
        const {adminUserSettingDetailReducer, changeStatus, setAdminGender, saveAdmin} = this.props;
        return (
            <div>
                {/* 标题部分 */}
                <div className="row margin-bottom0">
                    <div className="input-field col s12">
                        <Link to={{pathname: '/admin_user_setting', state: {fromDetail: true}}}>
                            <a className="btn-floating btn waves-effect custom-blue waves-light fz15">
                                <i className="mdi mdi-arrow-left-bold"/>
                            </a>
                        </Link>
                        <span className="page-title margin-left30">员工管理 - 详情</span>
                        <div className="divider custom-divider margin-top10"/>
                    </div>
                </div>

                {/* 主体 */}
                <div className="row margin-top40 margin-left150 margin-right150 detail-box z-depth-1 grey-text">
                    <div className="col s12 padding-top15 padding-bottom15 custom-grey purple-font border-bottom-line">
                        <div className="col s6">员工编号：{adminUserSettingDetailReducer.adminId}</div>
                        <div className="col s6 padding-right0 right-align">
                            {/* 状态：开关 */}
                            <span className="switch">
                                <label>
                                <input type="checkbox" checked={adminUserSettingDetailReducer.adminStatus === 1}
                                       onClick={() => {changeStatus(adminUserSettingDetailReducer.adminId, adminUserSettingDetailReducer.adminStatus)}}/>
                                <span className="lever"/>
                                </label>
                            </span>
                        </div>
                    </div>

                    <div className="col s12 padding-top20 padding-bottom20">
                        <TextInput s={6} label="手机" maxLength="20" value={adminUserSettingDetailReducer.phone} disabled/>
                        <TextInput s={6} label="管理员名称" maxLength="20" value={adminUserSettingDetailReducer.adminName} onChange={this.changeAdminName}/>

                        {/*<div className="input-field col s6">*/}
                        {/*    <Select*/}
                        {/*        options={commonReducer.departmentList}*/}
                        {/*        onChange={changeDepartment}*/}
                        {/*        value={adminUserSettingDetailReducer.department}*/}
                        {/*        isSearchable={false}*/}
                        {/*        placeholder={"请选择"}*/}
                        {/*        styles={sysConst.CUSTOM_REACT_SELECT_STYLE}*/}
                        {/*        backspaceRemovesValue={false}*/}
                        {/*        isClearable={false}*/}
                        {/*    />*/}
                        {/*    <label className="active">部门</label>*/}
                        {/*</div>*/}

                        <TextInput s={6} label="真实姓名" maxLength="20" value={adminUserSettingDetailReducer.realName} onChange={this.changeRealName}/>
                        <div className="col s6 no-padding">
                            <div className="input-field col s12 fz30">
                                <i className={`pointer mdi mdi-human-male ${adminUserSettingDetailReducer.gender === 1 ? "blue-text" : ""}`} onClick={() => {setAdminGender(1)}}/>
                                <i className={`pointer mdi mdi-human-female margin-left10 ${adminUserSettingDetailReducer.gender === 0 ? "pink-font" : ""}`} onClick={() => {setAdminGender(0)}}/>
                            </div>
                        </div>
                    </div>
                    <div className="col s12 padding-top20 padding-bottom20 right-align">
                        {adminUserSettingDetailReducer.adminStatus === 1 &&
                        <button type="button" className="btn confirm-btn margin-right10" onClick={saveAdmin}>修改</button>}
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        adminUserSettingDetailReducer: state.AdminUserSettingDetailReducer
    }
};

const mapDispatchToProps = (dispatch, ownProps) => ({
    getAdminInfo: () => {
        dispatch(adminUserSettingDetailAction.getAdminInfo(ownProps.match.params.id));
    },
    changeStatus: (id, status) => {
        dispatch(adminUserSettingDetailAction.changeAdminStatus(id, status))
    },
    setAdminName: (value) => {
        dispatch(AdminUserSettingDetailActionType.setAdminName(value));
    },
    setRealName: (value) => {
        dispatch(AdminUserSettingDetailActionType.setAdminRealName(value));
    },
    setAdminGender: (value) => {
        dispatch(AdminUserSettingDetailActionType.setAdminGender(value));
    },
    saveAdmin: () => {
        dispatch(adminUserSettingDetailAction.saveAdmin());
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(AdminUserSettingDetail)