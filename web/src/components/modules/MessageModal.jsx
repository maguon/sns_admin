import React from 'react';
import {Textarea, Autocomplete} from 'react-materialize';
import {connect} from 'react-redux';
import {MessageModalActionType} from "../../types";
import Select from "react-select";

const messageModalAction = require('../../actions/modules/MessageModalAction');
const commonAction = require('../../actions/main/CommonAction');
const sysConst = require('../../utils/SysConst');

class MessageModal extends React.Component {

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
        $('.modal').modal(
            {
                onOpenStart: () => {
                },
                // 每次模态打开时，手动设定 手机 autocomplete组件 显示内容为 Reducer中的值
                onOpenEnd: () => {
                    $('input.autocomplete').val(this.props.messageModalReducer.phone);
                    $('input.autocomplete').focus();
                },
                onCloseStart: () => {
                },
                onCloseEnd: () => {
                }
            }
        );
    }

    shouldComponentUpdate(nextProps, nextState) {
        // 当手机 autocomplete组件 的数据源，变更时，更新数据源数据，并重新打开
        if (this.props.commonReducer.userList !== nextProps.commonReducer.userList) {
            this.aotu.instance.updateData(nextProps.commonReducer.userList);
            this.aotu.instance.open();
        }
        return true;
    }

    // 因autocomplete组件的value不能绑定Reducer，所以需要每次Reducer更新后，重新给autocomplete设定Reducer中的值
    componentDidUpdate(prevProps, prevState) {
        $('input.autocomplete').val(prevProps.messageModalReducer.phone);
    }

    /**
     * 更新 手机 输入内容时，超过4位，根据输入内容检索数据
     */
    changeUserPhone = (event) => {
        this.props.setPhone(event.target.value);
        if (event.target.value.length > 3) {
            this.props.getUserListByPhone(event.target.value);
        }
    };

    /**
     * 选定 手机用户信息后，保存
     */
    selectUserPhone = (value) => {
        this.props.setPhone(value);
        $('input.autocomplete').val(value);
    };

    /**
     * 更新 消息内容
     */
    changeMsgContent = (event) => {
        this.props.setMsgContent(event.target.value);
        console.log('this.props.messageModalReducer.phone',this.props.messageModalReducer.phone);

    };

    /**
     * 渲染(挂载)画面。
     */
    render() {
        const {messageModalReducer, changeMsgUserType, closeModal, saveMessage} = this.props;
        console.log('messageModalReducer', messageModalReducer);
        return (
            <div id="messageModal" className="modal modal-fixed-footer row">

                {/** Modal头部：Title */}
                <div className="modal-title center-align white-text">{messageModalReducer.pageType === 'new' ? '发布消息' : '消息详情'}</div>

                {/** Modal主体 发布消息 */}
                {messageModalReducer.pageType === 'new' &&
                <div className="modal-content white grey-text text-darken-2">
                    <div className="row margin-top20">
                        <div className="input-field col s12">
                            <Select
                                options={sysConst.MSG_USER_TYPE}
                                onChange={changeMsgUserType}
                                value={messageModalReducer.msgUserType}
                                isSearchable={false}
                                placeholder={"请选择"}
                                styles={sysConst.CUSTOM_REACT_SELECT_STYLE}
                                isDisabled={true}
                            />
                            <label className="active">发送给用户</label>
                        </div>

                        <Autocomplete s={12}
                                      ref={aotu => this.aotu = aotu}
                                      title='手机'
                                      onChange={this.changeUserPhone}
                                      options={
                                          {
                                              data: {},
                                              onAutocomplete: (val, e) => {
                                                  this.selectUserPhone(val);
                                              },
                                              limit: 10,
                                              minLength: 4
                                          }
                                      }
                        />
                        <Textarea s={12} label="内容" maxLength="200" value={messageModalReducer.msgContent} onChange={this.changeMsgContent}/>
                    </div>
                </div>}

                {/** Modal主体 消息详情 */}
                {messageModalReducer.pageType === 'edit' &&
                <div className="modal-content white grey-text text-darken-2">
                    <div className="row margin-top20">
                        <div className="col s6">{messageModalReducer.userNickName} ( ID：{messageModalReducer.msgUserId} )</div>
                        <div className="col s6 right-align">手机：{messageModalReducer.phone}</div>

                        <div className="col s12 margin-top20">
                            <div className="col s12 detail-box grey-text padding-top10 padding-bottom10">{messageModalReducer.msgContent}</div>
                        </div>

                        <div className="col s12 margin-top20 right-align grey-text">发布时间：{messageModalReducer.createDate}</div>
                    </div>
                </div>}

                {/** Modal固定底部：取消/确定按钮 */}
                <div className="modal-footer">
                    <button type="button" className="btn close-btn" onClick={closeModal}>取消</button>
                    {messageModalReducer.pageType === 'new' &&
                    <button type="button" className="btn confirm-btn margin-left20" onClick={saveMessage}>确定</button>}
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
        messageModalReducer: state.MessageModalReducer,
        commonReducer: state.CommonReducer
    }
};

/**
 * 输出逻辑：用户发出的动作变为 Action 对象，从 UI 组件传出去。
 */
const mapDispatchToProps = (dispatch) => ({
    // 手机输入内容后，检索用户列表
    getUserListByPhone: (phoneReg) => {
        dispatch(commonAction.getUserListByPhone(phoneReg));
    },
    // 更改 消息用户类型 (暂未使用)
    changeMsgUserType: (value) => {
        dispatch(MessageModalActionType.setMsgUserType(value));
    },
    // 更改 用户手机数据
    setPhone: (value) => {
        dispatch(MessageModalActionType.setPhone(value));
    },
    // 更改 消息内容
    setMsgContent: (value) => {
        dispatch(MessageModalActionType.setMsgContent(value));
    },
    // 保存消息
    saveMessage: () => {
        dispatch(messageModalAction.saveMessage());
    },
    closeModal: () => {
        $('#messageModal').modal('close');
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(MessageModal);