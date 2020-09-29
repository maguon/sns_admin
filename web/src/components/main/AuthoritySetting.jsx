import React from 'react';
import Select from 'react-select';
import {connect} from 'react-redux';
import {AuthoritySettingActionType} from '../../types';

const authoritySettingAction = require('../../actions/main/AuthoritySettingAction');
const sysConst = require('../../utils/SysConst');

// 权限设置
class AuthoritySetting extends React.Component {

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
        this.props.changeConditionUserType(sysConst.USER_TYPE_LIST[0]);
        this.props.changeCurrentUserType(sysConst.USER_TYPE_LIST[0]);
        this.props.getMenuList();
    }

    /**
     * 查询菜单设定情况
     */
    queryMenuList = () => {
        this.props.getMenuList();
    };

    render() {
        const {authoritySettingReducer, changeConditionUserType, changeMenu, saveMenu} = this.props;
        return (
            <div>
                {/* 标题部分 */}
                <div className="row">
                    <div className="input-field col s12 page-title">
                        <span className="margin-left10">权限设置</span>
                        <div className="divider custom-divider margin-top10"/>
                    </div>
                </div>

                {/* 上部分：检索条件输入区域 */}
                <div className="row grey-text text-darken-1">
                    <div className="col s11 search-condition-box">
                        <div className="input-field col s3">
                            <Select
                                options={sysConst.USER_TYPE_LIST}
                                onChange={changeConditionUserType}
                                value={authoritySettingReducer.conditionUserType}
                                isSearchable={false}
                                placeholder={"请选择"}
                                styles={sysConst.CUSTOM_REACT_SELECT_STYLE}
                                isClearable={false}
                            />
                            <label className="active">用户类型</label>
                        </div>
                    </div>

                    {/* 查询按钮 */}
                    <div className="col s1">
                        <a className="btn-floating btn-large waves-light waves-effect btn query-btn" onClick={this.queryMenuList}>
                            <i className="mdi mdi-magnify"/>
                        </a>
                    </div>
                </div>

                {/* 下部分：检索结果显示区域 */}
                <div className="row margin-left20 margin-right20">

                    {authoritySettingReducer.currentMenu.length > 0 &&
                    <div className="row">
                        当前权限：{authoritySettingReducer.currentUserType.label}
                    </div>}

                    {authoritySettingReducer.currentMenu.map(function (item, index) {
                        return (
                            <div className="row">

                                {/* 不含子菜单的样式 */}
                                {item.children.length === 0 &&
                                <div className="col s4">
                                    <label>
                                        <input type="checkbox" className="filled-in" checked={item.usable} onClick={() => {changeMenu(index,-1)}}/>
                                        <span>{item.label}</span>
                                    </label>
                                </div>}

                                {/* 含子菜单的样式 */}
                                {item.children.length > 0 &&
                                <div>
                                    <div className="col s12 grey-text margin-bottom8">{item.label}</div>
                                    {item.children.map(function (menu, key) {
                                        return (
                                            <div className="col s2">
                                                <label>
                                                    <input type="checkbox" className="filled-in" checked={menu.usable}
                                                           onClick={() => {changeMenu(index,key)}}/>
                                                    <span>{menu.name}</span>
                                                </label>
                                            </div>
                                        )
                                    })}
                                </div>}
                            </div>
                        )
                    })}

                    {authoritySettingReducer.currentMenu.length > 0 &&
                    <div className="row col s12 right-align">
                        <button type="button" className="btn confirm-btn margin-right10" onClick={saveMenu}>修改</button>
                    </div>}
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        authoritySettingReducer: state.AuthoritySettingReducer,
    }
};

const mapDispatchToProps = (dispatch) => ({
    getMenuList: () => {
        dispatch(authoritySettingAction.getMenuList())
    },
    changeConditionUserType: (value) => {
        dispatch(AuthoritySettingActionType.setConditionUserType(value))
    },
    changeCurrentUserType: (value) => {
        dispatch(AuthoritySettingActionType.setCurrentUserType(value))
    },
    changeMenu: (index , key) => {
        dispatch(authoritySettingAction.changeMenuList(index , key))
    },
    saveMenu: () => {
        dispatch(authoritySettingAction.saveMenu())
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(AuthoritySetting)