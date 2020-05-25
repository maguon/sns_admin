import React from 'react';
import {TextInput, Modal} from 'react-materialize';
import {connect} from 'react-redux';
import {NewAppModalActionType} from "../../types";
import Select from "react-select";

const newAppModalAction = require('../../actions/modules/NewAppModalAction');
const sysConst = require('../../utils/SysConst');

// 新增App
class NewAppModal extends React.Component {

    /**
     * 组件准备要挂载的最一开始，调用执行
     */
    constructor() {
        super();
    }

    /**
     * 组件完全挂载到页面上，调用执行
     */
    componentDidMount() {
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

    /**
     * 渲染(挂载)画面。
     */
    render() {
        const {newAppModalReducer, changeAppType, changeDeviceType, changeForceUpdate, saveApp} = this.props;
        return (
            <Modal
                actions={[
                    <button type="button" className="btn close-btn modal-close">取消</button>,
                    <button type="button" className={`btn confirm-btn margin-left20`} onClick={saveApp}>确定</button>
                ]}
                bottomSheet={false}
                fixedFooter={true}
                className="custom-modal"
                header="新增App"
                id="newAppModal"
                options={{
                    dismissible: true,
                    endingTop: '10%',
                    inDuration: 250,
                    onCloseEnd: null,
                    onCloseStart: null,
                    onOpenEnd: null,
                    onOpenStart: null,
                    opacity: 0.5,
                    outDuration: 250,
                    preventScrolling: true,
                    startingTop: '4%'
                }}
            >
                <div className="row margin-top40 padding-left20 padding-right20">

                    <div className="input-field col s4">
                        <Select
                            options={sysConst.APP_TYPE}
                            onChange={changeAppType}
                            value={newAppModalReducer.appType}
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
                            value={newAppModalReducer.deviceType}
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
                            value={newAppModalReducer.forceUpdate}
                            isSearchable={false}
                            placeholder={"请选择"}
                            styles={sysConst.CUSTOM_REACT_SELECT_STYLE}
                            isClearable={false}
                        />
                        <label className="active">强制更新</label>
                    </div>

                    <TextInput s={4} label="版本号" maxLength="20" value={newAppModalReducer.version} onChange={this.changeVersion}/>
                    <TextInput s={4} label="版本序号" type="number" value={newAppModalReducer.versionNum} onChange={this.changeVersionNum}/>
                    <TextInput s={4} label="最低版本号" type="number" value={newAppModalReducer.minVersionNum} onChange={this.changeMinVersionNum}/>

                    <TextInput s={12} label="下载地址" maxLength="50" value={newAppModalReducer.url} onChange={this.changeUrl}/>
                    <TextInput s={12} label="备注" maxLength="100" value={newAppModalReducer.remark} onChange={this.changeRemark}/>
                </div>
            </Modal>
        );
    }
}

/**
 * 输入逻辑：外部的数据（即state对象）转换为 UI 组件的参数。
 */
const mapStateToProps = (state) => {
    return {
        newAppModalReducer: state.NewAppModalReducer
    }
};

/**
 * 输出逻辑：用户发出的动作变为 Action 对象，从 UI 组件传出去。
 */
const mapDispatchToProps = (dispatch) => ({
    changeAppType: (value) => {
        dispatch(NewAppModalActionType.setAppType(value));
    },
    changeDeviceType: (value) => {
        dispatch(NewAppModalActionType.setDeviceType(value));
    },
    setVersion: (value) => {
        dispatch(NewAppModalActionType.setVersion(value));
    },
    setVersionNum: (value) => {
        dispatch(NewAppModalActionType.setVersionNum(value));
    },
    setMinVersionNum: (value) => {
        dispatch(NewAppModalActionType.setMinVersionNum(value));
    },
    changeForceUpdate: (value) => {
        dispatch(NewAppModalActionType.setForceUpdate(value));
    },
    setUrl: (value) => {
        dispatch(NewAppModalActionType.setUrl(value));
    },
    setRemark: (value) => {
        dispatch(NewAppModalActionType.setRemark(value));
    },

    saveApp: () => {
        dispatch(newAppModalAction.saveApp());
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(NewAppModal);