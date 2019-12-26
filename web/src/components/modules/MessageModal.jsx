import React from 'react';
import {TextInput, Textarea, Autocomplete} from 'react-materialize';
// import AutoComplete from 'antd/es/auto-complete'; // 加载 JS
// import 'antd/es/auto-complete/style/css'; // 加载 CSS

import {connect} from 'react-redux';
import {MessageManagerActionType} from "../../types";
import {MessageModalActionType} from "../../types";
import Select from "react-select";

const messageModalAction = require('../../actions/modules/MessageModalAction');
const commonAction = require('../../actions/main/CommonAction');

const sysConst = require('../../utils/SysConst');
const commonUtil = require('../../utils/CommonUtil');
const formatUtil = require('../../utils/FormatUtil');

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
                onOpenStart : function () {
                },
                onCloseStart : function () {
                },
                onCloseEnd : function () {

                }
            }
        );
    }

    shouldComponentUpdate(nextProps,nextState){
        if (this.props.commonReducer.userList !== nextProps.commonReducer.userList) {
            this.aotu.instance.updateData(nextProps.commonReducer.userList);
            this.aotu.instance.open();
        }
        return true;
    }

    /**
     * 更新 手机
     */
    changeUserPhone = (event) => {
        if (event.target.value.length > 3) {

            this.props.getUserListByPhone(event.target.value);
        }
    };

    /**
     * 选定 手机用户信息
     */
    selectUserPhone = (value) => {
        // this.props.setPhone(value);
        console.log('value', value);
    };

    /**
     * 更新 消息内容
     */
    changeMsgContent = (event) => {
        this.props.setMsgContent(event.target.value);
    };

    onSelect = (value) => {
        console.log('onSelect', value);
    };

    onSearch = searchText => {
        this.setState({
            dataSource: !searchText ? [] : [searchText, searchText.repeat(2), searchText.repeat(3)],
        });
    };
    onChange = value => {
        this.setState({ value });
    };

    /**
     * 渲染(挂载)画面。
     */
    render() {
        const {messageModalReducer, commonReducer, changeMsgUserType, closeModal, saveMessage} = this.props;
        console.log('messageModalReducer',messageModalReducer);
        return (
            <div id="messageModal" className="modal modal-fixed-footer row">

                {/** Modal头部：Title */}
                <div className="modal-title center-align white-text">发布消息</div>

                {/** Modal主体 */}
                <div className="modal-content white grey-text text-darken-2">
                    <div className="row margin-top40">

                        <div className="input-field col s6">
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

                        {/*<div className="input-field col s6">*/}
                        {/*    <AutoComplete*/}
                        {/*        value={messageModalReducer.phone}*/}
                        {/*        dataSource={commonReducer.userList}*/}
                        {/*        style={{ width: 200 }}*/}
                        {/*        onSelect={this.onSelect}*/}
                        {/*        onSearch={this.onSearch}*/}
                        {/*        onChange={this.onChange}*/}
                        {/*        placeholder="control mode"*/}
                        {/*    />*/}
                        {/*</div>*/}


                        <Autocomplete s={12}
                                      ref={aotu => this.aotu = aotu}
                                      title='手机'
                                      value={messageModalReducer.phone}
                                      onChange={this.changeUserPhone}
                                      options={
                                          {
                                              data: {},
                                              onAutocomplete: (val,e) => {
                                                  // console.log('1111', this.props.commonReducer.userList);
                                                  this.selectUserPhone(val);
                                                  // this.aotu.setState({value:''});
                                              },
                                              limit: 10,
                                              minLength: 4
                                          }
                                      }
                        />

                        <Textarea s={12} label="内容" value={messageModalReducer.msgContent} onChange={this.changeMsgContent}/>
                    </div>

                </div>

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
    getUserListByPhone: (phoneReg) => {
        dispatch(commonAction.getUserListByPhone(phoneReg));
    },

    changeMsgManagerType: (value) => {
        dispatch(MessageManagerActionType.setConditionReceiverPhone(value));
    },


    changeMsgUserType: (value) => {
        dispatch(MessageModalActionType.setMsgUserType(value));
    },
    setPhone: (value) => {
        dispatch(MessageModalActionType.setPhone(value));
    },
    setMsgContent: (value) => {
        dispatch(MessageModalActionType.setMsgContent(value));
    },

    saveMessage: () => {
        dispatch(messageModalAction.saveMessage());
    },
    closeModal: () => {
        $('#messageModal').modal('close');
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(MessageModal);