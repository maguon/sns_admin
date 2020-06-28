import React from 'react';
import {TextInput, Modal} from 'react-materialize';
import {connect} from 'react-redux';
import {NewFakeUserModalActionType} from "../../types";

const newFakeUserModalAction = require('../../actions/modules/NewFakeUserModalAction');

// 新增Fake用户
class NewFakeUserModal extends React.Component {

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
     * 更新 昵称
     */
    changeNickName = (event) => {
        this.props.setNickName(event.target.value);
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
     * 更新 备注
     */
    changeRemark = (event) => {
        this.props.setRemark(event.target.value);
    };

    /**
     * 渲染(挂载)画面。
     */
    render() {
        const {newFakeUserModalReducer, setGender, saveFakeUser} = this.props;
        return (
            <Modal
                actions={[
                    <button type="button" className="btn close-btn modal-close">取消</button>,
                    <button type="button" className={`btn confirm-btn margin-left20`} onClick={saveFakeUser}>确定</button>
                ]}
                bottomSheet={false}
                fixedFooter={true}
                className="custom-modal"
                header="新增Fake用户"
                id="newFakeUserModal"
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
                    <TextInput s={6} label="昵称" maxLength="20" value={newFakeUserModalReducer.name} onChange={this.changeNickName}/>
                    <TextInput s={6} label="真实姓名" maxLength="20" value={newFakeUserModalReducer.realName} onChange={this.changeRealName}/>

                    <div className="col s6 no-padding">
                        <TextInput s={9} label="手机" maxLength="20" value={newFakeUserModalReducer.phone} onChange={this.changePhone}/>
                        <div className="input-field col s3 fz30 right-align">
                            <i className={`pointer mdi mdi-human-male ${newFakeUserModalReducer.gender === 1 ? "blue-text" : ""}`} onClick={() => {setGender(1)}}/>
                            <i className={`pointer mdi mdi-human-female margin-left10 ${newFakeUserModalReducer.gender === 0 ? "pink-font" : ""}`} onClick={() => {setGender(0)}}/>
                        </div>
                    </div>
                    <TextInput s={6} label="密码" maxLength="20" value={newFakeUserModalReducer.password} onChange={this.changePassword}/>
                    <TextInput s={12} label="备注" maxLength="50" value={newFakeUserModalReducer.remark} onChange={this.changeRemark}/>
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
        newFakeUserModalReducer: state.NewFakeUserModalReducer
    }
};

/**
 * 输出逻辑：用户发出的动作变为 Action 对象，从 UI 组件传出去。
 */
const mapDispatchToProps = (dispatch) => ({
    setNickName: (value) => {
        dispatch(NewFakeUserModalActionType.setNickName(value));
    },
    setRealName: (value) => {
        dispatch(NewFakeUserModalActionType.setRealName(value));
    },
    setPhone: (value) => {
        dispatch(NewFakeUserModalActionType.setPhone(value));
    },
    setPassword: (value) => {
        dispatch(NewFakeUserModalActionType.setPassword(value));
    },
    setGender: (value) => {
        dispatch(NewFakeUserModalActionType.setGender(value));
    },
    setRemark: (value) => {
        dispatch(NewFakeUserModalActionType.setRemark(value));
    },
    saveFakeUser: () => {
        dispatch(newFakeUserModalAction.saveFakeUser());
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(NewFakeUserModal);