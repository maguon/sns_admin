import React from 'react';
import {connect} from 'react-redux';
import {Link} from "react-router-dom";
import {DatePicker, Textarea, TextInput} from 'react-materialize';
import {VoteManagerDetailActionType} from "../../types";

const voteManagerDetailAction = require('../../actions/main/VoteManagerDetailAction');
const sysConst = require('../../utils/SysConst');
const formatUtil = require('../../utils/FormatUtil');

class VoteManagerDetail extends React.Component {

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
        // 取得投票基本信息
        this.props.getVoteInfo();
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

    render() {
        const {commentManagerDetailReducer} = this.props;
        return (
            <div>
                {/* 标题部分 */}
                <div className="row margin-bottom0">
                    <div className="input-field col s12">
                        <Link to={{pathname: '/vote', state: {fromDetail: true}}}>
                            <a className="btn-floating btn waves-effect custom-blue waves-light fz15">
                                <i className="mdi mdi-arrow-left-bold"/>
                            </a>
                        </Link>
                        <span className="page-title margin-left30">投票管理 - 投票详情</span>
                        <div className="divider custom-divider margin-top10"/>
                    </div>
                </div>

                {commentManagerDetailReducer.commentInfo.length > 0 &&
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
                </div>}



            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        voteManagerDetailReducer: state.VoteManagerDetailReducer
    }
};

const mapDispatchToProps = (dispatch, ownProps) => ({
    // 基本信息
    getVoteInfo: () => {
        dispatch(voteManagerDetailAction.getVoteInfo(ownProps.match.params.id))
    },

    setVoteTitle: (value) => {
        dispatch(VoteManagerDetailActionType.setVoteTitle(value));
    },
    setVoteInfo: (value) => {
        dispatch(VoteManagerDetailActionType.setVoteInfo(value));
    },
    setVoteMaxNum: (value) => {
        dispatch(VoteManagerDetailActionType.setVoteMaxNum(value));
    },
    setVoteStartTime: (value) => {
        dispatch(VoteManagerDetailActionType.setVoteStartTime(value));
    },
    setVoteEndTime: (value) => {
        dispatch(VoteManagerDetailActionType.setVoteEndTime(value));
    },
    setVoteInputOption: (value) => {
        dispatch(VoteManagerDetailActionType.setVoteInputOption(value));
    },
    setVoteOptions: (value) => {
        dispatch(VoteManagerDetailActionType.setVoteOptions(value));
    },

    saveVote: () => {
        dispatch(voteManagerDetailAction.saveVote());
    }


});

export default connect(mapStateToProps, mapDispatchToProps)(VoteManagerDetail)