import React from 'react';
import {Modal, Textarea} from 'react-materialize';
import {connect} from 'react-redux';
import {NewFakeArticleModalActionType} from "../../types";
import Select from "react-select";

const newFakeArticleModalAction = require('../../actions/modules/NewFakeArticleModalAction');
const sysConst = require('../../utils/SysConst');

// 新增Fake文章
class NewFakeArticleModal extends React.Component {

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
     * 更新 内容
     */
    changeInfo = (event) => {
        this.props.setInfo(event.target.value);
    };

    /**
     * 删除指定 图片
     * @param index 删除数组索引
     */
    removeImg = (index) => {
        let options = this.props.newFakeArticleModalReducer.imageArray;
        options.splice(index, 1);
        this.props.setImageArray(options);
    };

    /**
     * 渲染(挂载)画面。
     */
    render() {
        const {newFakeArticleModalReducer, commonReducer, changeFakeUser, changeType, changeCarrier, uploadImage, uploadVideo, saveFakeArticle} = this.props;
        return (
            <Modal
                actions={[
                    <button type="button" className="btn close-btn modal-close">取消</button>,
                    <button type="button" className={`btn confirm-btn margin-left20`} onClick={saveFakeArticle}>确定</button>
                ]}
                bottomSheet={false}
                fixedFooter={true}
                className="custom-modal"
                header="新增Fake文章"
                id="newFakeUserArticle"
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
                    <div className="input-field col s6">
                        <Select
                            options={commonReducer.fakeUserList}
                            onChange={changeFakeUser}
                            value={newFakeArticleModalReducer.fakeUser}
                            isSearchable={false}
                            placeholder={"请选择"}
                            noOptionsMessage={() => "无"}
                            styles={sysConst.CUSTOM_REACT_SELECT_STYLE}
                            isClearable={false}
                        />
                        <label className="active">Fake用户</label>
                    </div>
                    <div className="input-field col s3">
                        <Select
                            options={sysConst.MESSAGE_TYPE}
                            onChange={changeType}
                            value={newFakeArticleModalReducer.type}
                            isSearchable={false}
                            placeholder={"请选择"}
                            styles={sysConst.CUSTOM_REACT_SELECT_STYLE}
                            isClearable={false}
                        />
                        <label className="active">文章类型</label>
                    </div>

                    <div className="input-field col s3">
                        <Select
                            options={sysConst.FAKE_CARRIER_TYPE}
                            onChange={changeCarrier}
                            value={newFakeArticleModalReducer.carrier}
                            isSearchable={false}
                            placeholder={"请选择"}
                            styles={sysConst.CUSTOM_REACT_SELECT_STYLE}
                            isClearable={false}
                        />
                        <label className="active">载体类型</label>
                    </div>

                    <Textarea s={12} label="内容" maxLength="400" value={newFakeArticleModalReducer.info} onChange={this.changeInfo}/>

                    {/* 载体类型 ：图片 */}
                    {newFakeArticleModalReducer.carrier != null && newFakeArticleModalReducer.carrier.value === sysConst.FAKE_CARRIER_TYPE[1].value &&
                    <div>
                        <div className="input-field col s12 margin-top10">
                            <form ref="addImg" id="addImg" encType="multipart/form-data" method="post">
                                <input id="img" name="img" type="file" onChange={uploadImage} accept="image/x-png,image/gif,image/jpeg,image/bmp"/>
                            </form>
                        </div>

                        <div className="input-field col s12 margin-top10">
                            上传图片列表：
                            {newFakeArticleModalReducer.imageArray.map(function (item, key) {
                                return (
                                    <div>
                                        <div className="grey-text text-darken-1 col s6">文件名：{item.name}</div>
                                        <div className="grey-text text-darken-1 col s5">图片地址：{item.url}</div>
                                        {/* 删除按钮 */}
                                        <div className="col s1 right-align"><i className="mdi mdi-close pointer" onClick={() => {this.removeImg(key)}}/></div>
                                    </div>
                                )
                            },this)}
                        </div>
                    </div>}

                    {/* 载体类型 ：视频 */}
                    {newFakeArticleModalReducer.carrier != null && newFakeArticleModalReducer.carrier.value === sysConst.FAKE_CARRIER_TYPE[2].value &&
                    <div className="input-field col s12 margin-top10">
                        <form ref="addVideo" id="addVideo" encType="multipart/form-data" method="post">
                            <div className="col s12">视频文件：<input id="video" name="video" type="file" accept="audio/mp4,video/mp4,MPEG-4 Audio/Video"/></div>
                            <div className="col s12 margin-top10">视频地址：{newFakeArticleModalReducer.videoArray.length > 0 ? newFakeArticleModalReducer.videoArray[0].url : ''}</div>
                            <div className="col s12 margin-top10">图片文件：<input id="video_preview" name="video_preview" type="file" accept="image/x-png,image/gif,image/jpeg,image/bmp"/></div>
                            <div className="col s12 margin-top10">图片地址：{newFakeArticleModalReducer.videoArray.length > 0 ? newFakeArticleModalReducer.videoArray[0].preview : ''}</div>
                            <div><button type="button" className="btn confirm-btn margin-top10" onClick={uploadVideo}>上传视频</button></div>
                        </form>
                    </div>}
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
        newFakeArticleModalReducer: state.NewFakeArticleModalReducer,
        commonReducer: state.CommonReducer
    }
};

/**
 * 输出逻辑：用户发出的动作变为 Action 对象，从 UI 组件传出去。
 */
const mapDispatchToProps = (dispatch) => ({
    changeFakeUser: (value) => {
        dispatch(NewFakeArticleModalActionType.setFakeUser(value));
    },
    changeType: (value) => {
        dispatch(NewFakeArticleModalActionType.setType(value));
    },
    changeCarrier: (value) => {
        dispatch(NewFakeArticleModalActionType.setCarrier(value));
    },
    setInfo: (value) => {
        dispatch(NewFakeArticleModalActionType.setInfo(value));
    },
    setImageArray: (value) => {
        dispatch(NewFakeArticleModalActionType.setImageArray(value));
    },
    setVideoArray: (value) => {
        dispatch(NewFakeArticleModalActionType.setVideoArray(value));
    },
    // 上传图片
    uploadImage: () => {
        let files = document.getElementById('img').files;
        if (files.length > 0) {
            let formData = new FormData();
            formData.append('image', files[0]);
            dispatch(newFakeArticleModalAction.uploadImage(files[0].name,formData));
        }
    },
    // 上传视频
    uploadVideo: () => {
        let video_file = document.getElementById('video').files;
        let image_file = document.getElementById('video_preview').files;
        dispatch(newFakeArticleModalAction.uploadVideo(video_file, image_file));
    },
    saveFakeArticle: () => {
        dispatch(newFakeArticleModalAction.saveFakeArticle());
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(NewFakeArticleModal);