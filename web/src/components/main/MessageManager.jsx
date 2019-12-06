import React from 'react';
import Select from 'react-select';
import {connect} from 'react-redux';
import {Link} from "react-router-dom";
import {DatePicker, TextInput} from 'react-materialize';
import {MessageManagerActionType} from '../../types';
import {NewMessageModal} from '../modules/index';

const messageManagerAction = require('../../actions/main/MessageManagerAction');
const newAdminModalAction = require('../../actions/modules/NewAdminModalAction');

const sysConst = require('../../utils/SysConst');
const commonUtil = require('../../utils/CommonUtil');
const formatUtil = require('../../utils/FormatUtil');

class MessageManager extends React.Component {

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
            this.props.setConditionId('');
            this.props.changeConditionType(null);
            this.props.setConditionReceiverId('');
            this.props.setConditionReceiverName('');
            this.props.setConditionReceiverPhone('');
            this.props.setConditionArticleId('');
            this.props.setConditionCommentId('');
            this.props.setConditionConnectId('');
            this.props.setConditionCreatedOnStart('');
            this.props.setConditionCreatedOnEnd('');
        }
        this.props.getMessageList();
    }

    /**
     * 更新 检索条件：消息编号
     */
    changeConditionId = (event) => {
        this.props.setConditionId(event.target.value);
    };

    /**
     * 更新 检索条件：接收人ID
     */
    changeConditionReceiverId = (event) => {
        this.props.setConditionReceiverId(event.target.value);
    };

    /**
     * 更新 检索条件：接收人昵称
     */
    changeConditionReceiverName = (event) => {
        this.props.setConditionReceiverName(event.target.value);
    };

    /**
     * 更新 检索条件：接收人手机
     */
    changeConditionReceiverPhone = (event) => {
        this.props.setConditionReceiverPhone(event.target.value);
    };

    /**
     * 更新 检索条件：文章编号
     */
    changeConditionArticleId = (event) => {
        this.props.setConditionArticleId(event.target.value);
    };

    /**
     * 更新 检索条件：评论编号
     */
    changeConditionCommentId = (event) => {
        this.props.setConditionCommentId(event.target.value);
    };

    /**
     * 更新 检索条件：相关人员ID
     */
    changeConditionConnectId = (event) => {
        this.props.setConditionConnectId(event.target.value);
    };

    /**
     * 更新 检索条件：发送时间(始)
     */
    changeConditionCreatedOnStart = (value) => {
        this.props.setConditionCreatedOnStart(formatUtil.getDate(value));
    };
    clearConditionCreatedOnStart = () => {
        this.props.setConditionCreatedOnStart('');
    };

    /**
     * 更新 检索条件：发送时间(始)
     */
    changeConditionCreatedOnEnd = (value) => {
        this.props.setConditionCreatedOnEnd(formatUtil.getDate(value));
    };
    clearConditionCreatedOnEnd = () => {
        this.props.setConditionCreatedOnEnd('');
    };

    /**
     * 查询消息列表
     */
    queryMessageList = () => {
        // 默认第一页
        this.props.setStartNumber(0);
        this.props.getMessageList();
    };

    /**
     * 上一页
     */
    preBtn = () => {
        this.props.setStartNumber(this.props.messageManagerReducer.start - (this.props.messageManagerReducer.size - 1));
        this.props.getMessageList();
    };

    /**
     * 下一页
     */
    nextBtn = () => {
        this.props.setStartNumber(this.props.messageManagerReducer.start + (this.props.messageManagerReducer.size - 1));
        this.props.getMessageList();
    };

    /**
     * 显示 新建 消息模态
     */
    showNewMessageModal = () => {
        this.props.initModalData();
        $('#newAdminModal').modal('open');
    };

    render() {
        const {messageManagerReducer, changeConditionType} = this.props;
        return (
            <div>
                {/* 标题部分 */}
                <div className="row">
                    <div className="input-field col s12 page-title">
                        <span className="margin-left10">消息管理</span>
                        <div className="divider custom-divider margin-top10"/>
                    </div>
                </div>

                {/* 上部分：检索条件输入区域 */}
                <div className="row grey-text text-darken-1">
                    <div className="col s10 search-condition-box">
                        <div className="custom-input-field col s-percent-20">
                            <TextInput s={12} label="消息ID" value={messageManagerReducer.conditionId} onChange={this.changeConditionId}/>
                        </div>

                        <div className="input-field col s-percent-20">
                            <Select
                                options={sysConst.MSG_TYPE}
                                onChange={changeConditionType}
                                value={messageManagerReducer.conditionType}
                                isSearchable={false}
                                placeholder={"请选择"}
                                styles={sysConst.CUSTOM_REACT_SELECT_STYLE}
                                isClearable={true}
                            />
                            <label className="active">消息类型</label>
                        </div>

                        <div className="custom-input-field col s-percent-20">
                            <TextInput s={12} label="接收人ID" value={messageManagerReducer.conditionReceiverId} onChange={this.changeConditionReceiverId}/>
                        </div>

                        <div className="custom-input-field col s-percent-20">
                            <TextInput s={12} label="接收人昵称" value={messageManagerReducer.conditionReceiverName} onChange={this.changeConditionReceiverName}/>
                        </div>

                        <div className="custom-input-field col s-percent-20">
                            <TextInput s={12} label="接收人手机" value={messageManagerReducer.conditionReceiverPhone} onChange={this.changeConditionReceiverPhone}/>
                        </div>

                        <div className="custom-input-field col s-percent-20">
                            <TextInput s={12} label="文章编号" value={messageManagerReducer.conditionArticleId} onChange={this.changeConditionArticleId}/>
                        </div>

                        <div className="custom-input-field col s-percent-20">
                            <TextInput s={12} label="评论编号" value={messageManagerReducer.conditionCommentId} onChange={this.changeConditionCommentId}/>
                        </div>

                        <div className="custom-input-field col s-percent-20">
                            <TextInput s={12} label="相关人ID" value={messageManagerReducer.conditionConnectId} onChange={this.changeConditionConnectId}/>
                        </div>

                        {/* 查询条件：发送时间(始) */}
                        <div className="custom-input-field col s-percent-20 input-field">
                            <DatePicker s={12} label="发送时间(始)" options={sysConst.DATE_PICKER_OPTION}
                                        value={messageManagerReducer.conditionCreatedOnStart} onChange={this.changeConditionCreatedOnStart} />
                            {messageManagerReducer.conditionCreatedOnStart !== '' && <span className="mdi data-clear-icon mdi-window-close" onClick={this.clearConditionCreatedOnStart}/>}
                            <span className="mdi data-icon mdi-table-large"/>
                        </div>

                        {/* 查询条件：发送时间(终) */}
                        <div className="custom-input-field col s-percent-20 input-field">
                            <DatePicker s={12} label="发送时间(终)" options={sysConst.DATE_PICKER_OPTION}
                                        value={messageManagerReducer.conditionCreatedOnEnd} onChange={this.changeConditionCreatedOnEnd} />
                            {messageManagerReducer.conditionCreatedOnEnd !== '' && <span className="mdi data-clear-icon mdi-window-close" onClick={this.clearConditionCreatedOnEnd}/>}
                            <span className="mdi data-icon mdi-table-large"/>
                        </div>
                    </div>

                    {/* 查询按钮 */}
                    <div className="col s1">
                        <a className="btn-floating btn-large waves-light waves-effect btn query-btn" onClick={this.queryMessageList}>
                            <i className="mdi mdi-magnify"/>
                        </a>
                    </div>

                    {/* 追加按钮 */}
                    <div className="col s1">
                        <a className="btn-floating btn-large waves-light waves-effect btn add-btn" onClick={this.showNewMessageModal}>
                            <i className="mdi mdi-plus"/>
                        </a>
                    </div>
                    <NewMessageModal/>
                </div>

                {/* 下部分：检索结果显示区域 */}
                <div className="row">
                    <div className="col s12">
                        <table className="bordered striped">
                            <thead className="custom-dark-grey table-top-line">
                            <tr className="grey-text text-darken-2">
                                <th>消息ID</th>
                                <th>消息类型</th>
                                <th>消息内容</th>

                                <th>收藏次数</th>
                                <th>评论次数</th>
                                <th>阅读次数</th>
                                <th>消息标签</th>
                                <th>状态</th>
                                <th className="center">操作</th>
                            </tr>
                            </thead>
                            <tbody>
                            {messageManagerReducer.messageArray.map(function (item) {
                                return (
                                    <tr className="grey-text text-darken-1">
                                        <td>{item._id}</td>
                                        <td>{commonUtil.getJsonValue(sysConst.MSG_TYPE, item.type)}</td>
                                        <td>{item.info}</td>

                                        <td>{item.collectnum}</td>
                                        <td>{item.commentnum}</td>
                                        <td>{item.readnum}</td>
                                        <td>{item.label}</td>
                                        <td>{commonUtil.getJsonValue(sysConst.USE_FLAG, item.status)}</td>
                                        <td className="operation center">
                                            <Link to={{pathname: '/message/' + item._id}}>
                                                <i className="mdi mdi-table-search purple-font"/>
                                            </Link>
                                        </td>
                                    </tr>
                                )
                            })}
                            { messageManagerReducer.messageArray.length === 0 &&
                                <tr className="grey-text text-darken-1">
                                    <td className="no-data-tr" colSpan="9">暂无数据</td>
                                </tr>
                            }
                            </tbody>
                        </table>
                    </div>

                    {/* 上下页按钮 */}
                    <div className="col s12 margin-top10">
                        <div className="right">
                            {messageManagerReducer.start > 0 && messageManagerReducer.dataSize > 0 &&
                            <a className="waves-light waves-effect custom-blue btn margin-right10" id="pre" onClick={this.preBtn}>
                                上一页
                            </a>}
                            {messageManagerReducer.dataSize >= messageManagerReducer.size &&
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
        messageManagerReducer: state.MessageManagerReducer,
        fromDetail: fromDetail
    }
};

const mapDispatchToProps = (dispatch) => ({
    getMessageList: () => {
        dispatch(messageManagerAction.getMessageList())
    },
    setStartNumber: (start) => {
        dispatch(MessageManagerActionType.setStartNumber(start))
    },


    setConditionId: (value) => {
        dispatch(MessageManagerActionType.setConditionId(value))
    },
    changeConditionType: (value) => {
        dispatch(MessageManagerActionType.setConditionMsgType(value))
    },
    setConditionReceiverId: (value) => {
        dispatch(MessageManagerActionType.setConditionReceiverId(value))
    },
    setConditionReceiverName: (value) => {
        dispatch(MessageManagerActionType.setConditionReceiverName(value))
    },
    setConditionReceiverPhone: (value) => {
        dispatch(MessageManagerActionType.setConditionReceiverPhone(value))
    },


    setConditionArticleId: (value) => {
        dispatch(MessageManagerActionType.setConditionArticleId(value))
    },
    setConditionCommentId: (value) => {
        dispatch(MessageManagerActionType.setConditionCommentId(value))
    },
    setConditionConnectId: (value) => {
        dispatch(MessageManagerActionType.setConditionConnectId(value))
    },
    setConditionCreatedOnStart: (value) => {
        dispatch(MessageManagerActionType.setConditionCreatedOnStart(value))
    },
    setConditionCreatedOnEnd: (value) => {
        dispatch(MessageManagerActionType.setConditionCreatedOnEnd(value))
    },


    initModalData: () => {
        dispatch(newAdminModalAction.initNewAdminModal());
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(MessageManager)