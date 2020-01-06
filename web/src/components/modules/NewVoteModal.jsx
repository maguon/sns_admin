import React from 'react';
import {TextInput} from 'react-materialize';
import {connect} from 'react-redux';
import {NewVoteModalActionType} from "../../types";

const newVoteModalAction = require('../../actions/modules/NewVoteModalAction');

class NewVoteModal extends React.Component {

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
        $('.modal').modal();
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
        const {newVoteModalReducer, setAdminGender, closeModal, saveAdmin} = this.props;
        return (
            <div id="newVoteModal" className="modal modal-fixed-footer row">

                {/** Modal头部：Title */}
                <div className="modal-title center-align white-text">发布投票</div>

                {/** Modal主体 */}
                <div className="modal-content white grey-text text-darken-2">
                    <div className="row margin-top40">
                        <TextInput s={6} label="管理员名称" maxLength="20" value={newVoteModalReducer.name} onChange={this.changeAdminName}/>
                        <TextInput s={6} label="真实姓名" maxLength="20" value={newVoteModalReducer.realName} onChange={this.changeRealName}/>

                        <div className="col s6 no-padding">
                            <TextInput s={9} label="手机" maxLength="20" value={newVoteModalReducer.phone} onChange={this.changePhone}/>
                            <div className="input-field col s3 fz30 right-align">
                                <i className={`pointer mdi mdi-human-male ${newVoteModalReducer.gender === 1 ? "blue-text" : ""}`} onClick={() => {setAdminGender(1)}}/>
                                <i className={`pointer mdi mdi-human-female margin-left10 ${newVoteModalReducer.gender === 0 ? "pink-font" : ""}`} onClick={() => {setAdminGender(0)}}/>
                            </div>
                        </div>
                        <TextInput s={6} label="密码" maxLength="20" value={newVoteModalReducer.password} onChange={this.changePassword}/>

                        {/*<div className="input-field col s6">*/}
                        {/*    <Select*/}
                        {/*        options={commonReducer.departmentList}*/}
                        {/*        onChange={changeDepartment}*/}
                        {/*        value={newVoteModalReducer.department}*/}
                        {/*        isSearchable={false}*/}
                        {/*        placeholder={"请选择"}*/}
                        {/*        styles={sysConst.CUSTOM_REACT_SELECT_STYLE_FOR_MODAL}*/}
                        {/*        backspaceRemovesValue={false}*/}
                        {/*        isClearable={false}*/}
                        {/*    />*/}
                        {/*    <label className="active">部门</label>*/}
                        {/*</div>*/}
                    </div>

                </div>

                {/** Modal固定底部：取消/确定按钮 */}
                <div className="modal-footer">
                    <button type="button" className="btn close-btn" onClick={closeModal}>取消</button>
                    <button type="button" className={`btn confirm-btn margin-left20 ${newVoteModalReducer.errorRouteFlg ? "disabled" : ""}`}
                            onClick={saveAdmin}>确定</button>
                </div>
            </div>
        );
    }
}

/**
 * 输入逻辑：外部的数据（即state对象）转换为 UI 组件的参数。
 */
const mapStateToProps = (state) => {
    return {
        newVoteModalReducer: state.NewVoteModalReducer
    }
};

/**
 * 输出逻辑：用户发出的动作变为 Action 对象，从 UI 组件传出去。
 */
const mapDispatchToProps = (dispatch) => ({
    setAdminName: (value) => {
        dispatch(NewVoteModalActionType.setAdminName(value));
    },
    setRealName: (value) => {
        dispatch(NewVoteModalActionType.setAdminRealName(value));
    },
    setPhone: (value) => {
        dispatch(NewVoteModalActionType.setPhone(value));
    },
    setPassword: (value) => {
        dispatch(NewVoteModalActionType.setPassword(value));
    },
    setAdminGender: (value) => {
        dispatch(NewVoteModalActionType.setAdminGender(value));
    },
    saveAdmin: () => {
        dispatch(newVoteModalAction.saveAdmin());
    },
    closeModal: () => {
        $('#newVoteModal').modal('close');
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(NewVoteModal);