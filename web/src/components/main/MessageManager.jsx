import React from 'react';
import Select from 'react-select';
import {connect} from 'react-redux';
import {Link} from "react-router-dom";
import {TextInput} from 'react-materialize';
import {MessageManagerActionType} from '../../types';
import {NewMessageModal} from '../modules/index';

const messageManagerAction = require('../../actions/main/MessageManagerAction');
const newAdminModalAction = require('../../actions/modules/NewAdminModalAction');

const sysConst = require('../../utils/SysConst');
const commonUtil = require('../../utils/CommonUtil');

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
            this.props.setConditionUserId('');
            this.props.changeConditionType(null);
            this.props.changeConditionStatus(null);
        }
        this.props.getMessageList();
    }

    /**
     * 更新 检索条件：消息ID
     */
    changeConditionId = (event) => {
        this.props.setConditionId(event.target.value);
    };

    /**
     * 更新 检索条件：用户ID
     */
    changeConditionUserId = (event) => {
        this.props.setConditionUserId(event.target.value);
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
        const {messageManagerReducer, changeConditionType, changeConditionStatus} = this.props;
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
                        <TextInput s={3} label="消息ID" value={messageManagerReducer.conditionId} onChange={this.changeConditionId}/>

                        <TextInput s={3} label="用户ID" value={messageManagerReducer.conditionUserId} onChange={this.changeConditionUserId}/>

                        <div className="input-field col s3">
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

                        <div className="input-field col s3">
                            <Select
                                options={sysConst.USE_FLAG}
                                onChange={changeConditionStatus}
                                value={messageManagerReducer.conditionStatus}
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
    setConditionUserId: (value) => {
        dispatch(MessageManagerActionType.setConditionUserId(value))
    },
    changeConditionType: (value) => {
        dispatch(MessageManagerActionType.setConditionMsgType(value))
    },
    changeConditionStatus: (value) => {
        dispatch(MessageManagerActionType.setConditionStatus(value))
    },



    initModalData: () => {
        dispatch(newAdminModalAction.initNewAdminModal());
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(MessageManager)