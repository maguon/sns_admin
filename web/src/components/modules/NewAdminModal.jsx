import React from 'react';
import {TextInput, Modal} from 'react-materialize';
import {connect} from 'react-redux';
import {NewAdminModalActionType} from "../../types";

const newAdminModalAction = require('../../actions/modules/NewAdminModalAction');

class NewAdminModal extends React.Component {

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
     * 更新 管理员名称
     */
    changeAdminName = (event) => {
        this.props.setAdminName(event.target.value);
    };

    /**
     * 更新 真实姓名
     */
    changeRealName = (event) => {
        this.props.setRealName(event.target.value);
    };

    /**
     * 更新 手机
     */
    changePhone = (event) => {
        this.props.setPhone(event.target.value);
    };

    /**
     * 更新 密码
     */
    changePassword = (event) => {
        this.props.setPassword(event.target.value);
    };

    /**
     * 渲染(挂载)画面。
     */
    render() {
        const {newAdminModalReducer, setAdminGender, saveAdmin} = this.props;
        return (
            <Modal
                actions={[
                    <button type="button" className="btn close-btn modal-close">取消</button>,
                    <button type="button" className={`btn confirm-btn margin-left20 ${newAdminModalReducer.errorRouteFlg ? "disabled" : ""}`}
                    onClick={saveAdmin}>确定</button>
                ]}
                bottomSheet={false}
                fixedFooter={true}
                className="custom-modal"
                header="新增员工"
                id="newAdminModal"
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
                    <TextInput s={6} label="管理员名称" maxLength="20" value={newAdminModalReducer.name} onChange={this.changeAdminName}/>
                    <TextInput s={6} label="真实姓名" maxLength="20" value={newAdminModalReducer.realName} onChange={this.changeRealName}/>

                    <div className="col s6 no-padding">
                        <TextInput s={9} label="手机" maxLength="20" value={newAdminModalReducer.phone} onChange={this.changePhone}/>
                        <div className="input-field col s3 fz30 right-align">
                            <i className={`pointer mdi mdi-human-male ${newAdminModalReducer.gender === 1 ? "blue-text" : ""}`} onClick={() => {setAdminGender(1)}}/>
                            <i className={`pointer mdi mdi-human-female margin-left10 ${newAdminModalReducer.gender === 0 ? "pink-font" : ""}`} onClick={() => {setAdminGender(0)}}/>
                        </div>
                    </div>
                    <TextInput s={6} label="密码" maxLength="20" value={newAdminModalReducer.password} onChange={this.changePassword}/>

                    {/*<div className="input-field col s6">*/}
                    {/*    <Select*/}
                    {/*        options={commonReducer.departmentList}*/}
                    {/*        onChange={changeDepartment}*/}
                    {/*        value={newAdminModalReducer.department}*/}
                    {/*        isSearchable={false}*/}
                    {/*        placeholder={"请选择"}*/}
                    {/*        styles={sysConst.CUSTOM_REACT_SELECT_STYLE_FOR_MODAL}*/}
                    {/*        backspaceRemovesValue={false}*/}
                    {/*        isClearable={false}*/}
                    {/*    />*/}
                    {/*    <label className="active">部门</label>*/}
                    {/*</div>*/}
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
        newAdminModalReducer: state.NewAdminModalReducer
    }
};

/**
 * 输出逻辑：用户发出的动作变为 Action 对象，从 UI 组件传出去。
 */
const mapDispatchToProps = (dispatch) => ({
    setAdminName: (value) => {
        dispatch(NewAdminModalActionType.setAdminName(value));
    },
    setRealName: (value) => {
        dispatch(NewAdminModalActionType.setAdminRealName(value));
    },
    setPhone: (value) => {
        dispatch(NewAdminModalActionType.setPhone(value));
    },
    setPassword: (value) => {
        dispatch(NewAdminModalActionType.setPassword(value));
    },
    setAdminGender: (value) => {
        dispatch(NewAdminModalActionType.setAdminGender(value));
    },
    saveAdmin: () => {
        dispatch(newAdminModalAction.saveAdmin());
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(NewAdminModal);