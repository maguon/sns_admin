import React from 'react';
import {DatePicker, Textarea, TextInput, Modal} from 'react-materialize';
import {connect} from 'react-redux';
import {NewVoteModalActionType} from "../../types";

const newVoteModalAction = require('../../actions/modules/NewVoteModalAction');
const sysConst = require('../../utils/SysConst');
const formatUtil = require('../../utils/FormatUtil');

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
    }

    /**
     * 更新 标题
     */
    changeVoteTitle = (event) => {
        this.props.setVoteTitle(event.target.value);
    };

    /**
     * 更新 投票内容
     */
    changeVoteInfo = (event) => {
        this.props.setVoteInfo(event.target.value);
    };

    /**
     * 更新 最多选项数
     */
    changeVoteMaxNum = (event) => {
        this.props.setVoteMaxNum(event.target.value);
    };

    /**
     * 更新 检索条件：开始时间
     */
    changeVoteStartTime = (value) => {
        this.props.setVoteStartTime(formatUtil.getDate(value));
    };
    clearVoteStartTime = () => {
        this.props.setVoteStartTime('');
    };

    /**
     * 更新 检索条件：结束时间
     */
    changeVoteEndTime = (value) => {
        this.props.setVoteEndTime(formatUtil.getDate(value));
    };
    clearVoteEndTime = () => {
        this.props.setVoteEndTime('');
    };

    /**
     * 更新 输入投票选项
     */
    changeVoteInputOption = (event) => {
        this.props.setVoteInputOption(event.target.value);
    };

    /**
     * 添加 输入投票选项
     */
    addVoteOption = () => {
        // 输入投票选项列表
        let options = this.props.newVoteModalReducer.options;
        // 输入投票选项内容
        let inputOption = this.props.newVoteModalReducer.inputOption.trim();
        if (inputOption === '') {
            swal('', '投票选项内容不能为空！', 'warning');
        } else {
            // 将当前 输入投票选项 添加到数组
            options.push({txt: inputOption});
            // 清空 输入投票选项
            this.props.setVoteInputOption('');
            // 更新 输入投票选项列表
            this.props.setVoteOptions(options);
        }
    };

    /**
     * 删除指定 输入投票选项
     * @param index 删除数组索引
     */
    deleteVote = (index) => {
        let options = this.props.newVoteModalReducer.options;
        options.splice(index, 1);
        this.props.setVoteOptions(options);
    };

    /**
     * 渲染(挂载)画面。
     */
    render() {
        const {newVoteModalReducer, saveVote} = this.props;
        return (
            <Modal
                actions={[
                    <button type="button" className="btn close-btn modal-close">取消</button>,
                    <button type="button" className="btn confirm-btn margin-left20" onClick={saveVote}>确定</button>
                ]}
                bottomSheet={false}
                fixedFooter={true}
                className="custom-modal"
                header="发布投票"
                id="newVoteModal"
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
                <div className="row margin-top20 padding-left20 padding-right20">
                    <TextInput s={12} label="标题" maxLength="20" value={newVoteModalReducer.title} onChange={this.changeVoteTitle}/>
                    <Textarea s={12} label="内容" maxLength="200" value={newVoteModalReducer.info} onChange={this.changeVoteInfo}/>

                    <TextInput s={4} label="最多选项数" type="number" value={newVoteModalReducer.maxNum} onChange={this.changeVoteMaxNum}/>

                    <div className="custom-input-field col s4 input-field">
                        <DatePicker s={12} label="开始时间" options={sysConst.DATE_PICKER_OPTION} value={newVoteModalReducer.startTime} onChange={this.changeVoteStartTime} />
                        {newVoteModalReducer.startTime !== '' && <span className="mdi data-clear-icon mdi-window-close" onClick={this.clearVoteStartTime}/>}
                        <span className="mdi data-icon mdi-table-large"/>
                    </div>

                    <div className="custom-input-field col s4 input-field">
                        <DatePicker s={12} label="结束时间" options={sysConst.DATE_PICKER_OPTION} value={newVoteModalReducer.endTime} onChange={this.changeVoteEndTime} />
                        {newVoteModalReducer.endTime !== '' && <span className="mdi data-clear-icon mdi-window-close" onClick={this.clearVoteEndTime}/>}
                        <span className="mdi data-icon mdi-table-large"/>
                    </div>

                    <TextInput s={11} label="投票选项" maxLength="30" value={newVoteModalReducer.inputOption} onChange={this.changeVoteInputOption}/>
                    {/* 追加按钮 */}
                    <div className="input-field col s1 right-align">
                        <a className="btn-floating btn-small waves-light waves-effect btn add-btn" onClick={() => {this.addVoteOption()}}>
                            <i className="mdi mdi-plus"/>
                        </a>
                    </div>

                    {newVoteModalReducer.options.map(function (item, key) {
                        return (
                            <div className="col s12 grey-text text-darken-1 margin-top10">
                                {/* 投票选项内容 */}
                                <div className="col s11">{item.txt}</div>
                                {/* 删除按钮 */}
                                <div className="col s1 no-padding right-align">
                                    <i className="mdi mdi-close purple-font pointer margin-right10" onClick={() => {this.deleteVote(key)}}/>
                                </div>
                                {/* 分割线 */}
                                <div className="col s12 no-padding"><div className="col s12 margin-top5 divider"/></div>
                            </div>
                        )
                    },this)}
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
        newVoteModalReducer: state.NewVoteModalReducer
    }
};

/**
 * 输出逻辑：用户发出的动作变为 Action 对象，从 UI 组件传出去。
 */
const mapDispatchToProps = (dispatch) => ({
    setVoteTitle: (value) => {
        dispatch(NewVoteModalActionType.setVoteTitle(value));
    },
    setVoteInfo: (value) => {
        dispatch(NewVoteModalActionType.setVoteInfo(value));
    },
    setVoteMaxNum: (value) => {
        dispatch(NewVoteModalActionType.setVoteMaxNum(value));
    },
    setVoteStartTime: (value) => {
        dispatch(NewVoteModalActionType.setVoteStartTime(value));
    },
    setVoteEndTime: (value) => {
        dispatch(NewVoteModalActionType.setVoteEndTime(value));
    },
    setVoteInputOption: (value) => {
        dispatch(NewVoteModalActionType.setVoteInputOption(value));
    },
    setVoteOptions: (value) => {
        dispatch(NewVoteModalActionType.setVoteOptions(value));
    },

    saveVote: () => {
        dispatch(newVoteModalAction.saveVote());
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(NewVoteModal);