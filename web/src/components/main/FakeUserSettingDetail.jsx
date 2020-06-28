import React from 'react';
import {TextInput} from 'react-materialize';
import {connect} from 'react-redux';
import {Link} from "react-router-dom";
import {FakeUserSettingDetailActionType} from "../../types";

const fakeUserSettingDetailAction = require('../../actions/main/FakeUserSettingDetailAction');

class FakeUserSettingDetail extends React.Component {

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
        // 取得基本信息
        this.props.getFakeUserInfo();
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
     * 更新 备注
     */
    changeRemark = (event) => {
        this.props.setRemark(event.target.value);
    };

    render() {
        const {fakeUserSettingDetailReducer, setGender, saveFakeUser} = this.props;
        return (
            <div>
                {/* 标题部分 */}
                <div className="row margin-bottom0">
                    <div className="input-field col s12">
                        <Link to={{pathname: '/fake_user_setting', state: {fromDetail: true}}}>
                            <a className="btn-floating btn waves-effect custom-blue waves-light fz15">
                                <i className="mdi mdi-arrow-left-bold"/>
                            </a>
                        </Link>
                        <span className="page-title margin-left30">Fake用户管理 - 详情</span>
                        <div className="divider custom-divider margin-top10"/>
                    </div>
                </div>

                {/* 主体 */}
                <div className="row margin-top40 margin-left150 margin-right150 detail-box z-depth-1 grey-text">
                    <div className="col s12 padding-top15 padding-bottom15 custom-grey purple-font border-bottom-line">
                        <div className="col s12">Fake用户编号：{fakeUserSettingDetailReducer.fakeUserId}</div>
                    </div>

                    <div className="col s12 padding-top20 padding-bottom20">
                        <TextInput s={6} label="手机" maxLength="20" value={fakeUserSettingDetailReducer.phone} disabled/>
                        <TextInput s={6} label="昵称" maxLength="20" value={fakeUserSettingDetailReducer.nickName} onChange={this.changeNickName}/>

                        <TextInput s={6} label="真实姓名" maxLength="20" value={fakeUserSettingDetailReducer.realName} onChange={this.changeRealName}/>
                        <div className="col s6 no-padding">
                            <div className="input-field col s12 fz30">
                                <i className={`pointer mdi mdi-human-male ${fakeUserSettingDetailReducer.gender === 1 ? "blue-text" : ""}`} onClick={() => {setGender(1)}}/>
                                <i className={`pointer mdi mdi-human-female margin-left10 ${fakeUserSettingDetailReducer.gender === 0 ? "pink-font" : ""}`} onClick={() => {setGender(0)}}/>
                            </div>
                        </div>
                        <TextInput s={12} label="备注" maxLength="50" value={fakeUserSettingDetailReducer.remark} onChange={this.changeRemark}/>
                    </div>
                    <div className="col s12 padding-top20 padding-bottom20 right-align">
                        <button type="button" className="btn confirm-btn margin-right10" onClick={saveFakeUser}>修改</button>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        fakeUserSettingDetailReducer: state.FakeUserSettingDetailReducer
    }
};

const mapDispatchToProps = (dispatch, ownProps) => ({
    getFakeUserInfo: () => {
        dispatch(fakeUserSettingDetailAction.getFakeUserInfo(ownProps.match.params.id));
    },
    setNickName: (value) => {
        dispatch(FakeUserSettingDetailActionType.setNickName(value));
    },
    setRealName: (value) => {
        dispatch(FakeUserSettingDetailActionType.setRealName(value));
    },
    setGender: (value) => {
        dispatch(FakeUserSettingDetailActionType.setGender(value));
    },
    setRemark: (value) => {
        dispatch(FakeUserSettingDetailActionType.setRemark(value));
    },
    saveFakeUser: () => {
        dispatch(fakeUserSettingDetailAction.saveFakeUser());
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(FakeUserSettingDetail)