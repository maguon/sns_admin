import {apiHost, fileHost} from '../../config/HostConfig';
import {NewFakeArticleModalActionType} from "../../types";

const httpUtil = require('../../utils/HttpUtil');
const localUtil = require('../../utils/LocalUtil');
const sysConst = require('../../utils/SysConst');
const fakeArticleManagerAction = require('../../actions/main/FakeArticleManagerAction');

// 新增Fake文章画面 初期
export const initNewFakeArticleModal = () => async (dispatch) => {
    // Fake用户
    dispatch({type: NewFakeArticleModalActionType.setFakeUser, payload: null});
    // 消息类型(1.文章 2.求助 )
    dispatch({type: NewFakeArticleModalActionType.setType, payload: null});
    // 载体类型(1.文本 2.图片 3.视频 4.位置分享 )
    dispatch({type: NewFakeArticleModalActionType.setCarrier, payload: null});
    // 内容
    dispatch({type: NewFakeArticleModalActionType.setInfo, payload: ''});
    // 图片
    dispatch({type: NewFakeArticleModalActionType.setImageArray, payload: []});
    // 视频
    dispatch({type: NewFakeArticleModalActionType.setVideoArray, payload: []});
};

export const saveFakeArticle = () => async (dispatch, getState) => {
    try {
        // Fake用户
        const fakeUser = getState().NewFakeArticleModalReducer.fakeUser;
        // 消息类型(1.文章 2.求助 )
        const type = getState().NewFakeArticleModalReducer.type;
        // 载体类型
        const carrier = getState().NewFakeArticleModalReducer.carrier;
        // 内容
        const info = getState().NewFakeArticleModalReducer.info.trim();
        // 图片
        const imageArray = getState().NewFakeArticleModalReducer.imageArray;
        // 视频
        const videoArray = getState().NewFakeArticleModalReducer.videoArray;
        // 资源
        let media = [];
        if (fakeUser == null || type == null || carrier == null || info === '') {
            swal('保存失败', '请输入完整的Fake文章信息！', 'warning');
        } else {
            // 载体类型 ： 图片时
            if (carrier.value === sysConst.FAKE_CARRIER_TYPE[1].value && imageArray.length <= 0) {
                swal('保存失败', '请选择文章图片！', 'warning');
                return;
            }
            // 载体类型 ： 视频时
            if (carrier.value === sysConst.FAKE_CARRIER_TYPE[2].value && videoArray.length <= 0) {
                swal('保存失败', '请选择文章视频！', 'warning');
                return;
            }

            // 将画面 图片列表格式整理
            if (carrier.value === sysConst.FAKE_CARRIER_TYPE[1].value) {
                imageArray.forEach((value) => {
                    media.push({url: value.url})
                });
            }
            if (carrier.value === sysConst.FAKE_CARRIER_TYPE[2].value) {
                videoArray.forEach((value) => {
                    media.push({url: value.url, preview : value.preview})
                });
            }
            const params = {
                // 消息类型(1.文章 2.求助 )
                type: type.value,
                // 载体类型(1.文本 2.图片 3.视频 4.位置分享 )
                carrier: carrier.value,
                // 内容
                info: info,
                // 图片/视频
                media: media,
                // 发布位置
                addressName : sysConst.DEFAULT_ADDRESS.addressName,
                // 地理位置，格式：[经度，维度]
                location: sysConst.DEFAULT_LOCATION
            };
            console.log('params',params);
            // 基本url
            let url = apiHost + '/api/admin/' + localUtil.getSessionItem(sysConst.LOGIN_USER_ID)
                + "/fakeUser/" + fakeUser.value + "/msg";
            let res = await httpUtil.httpPost(url, params);
            if (res.success === true) {
                $('#newFakeUserArticle').modal('close');
                swal("保存成功", "", "success");
                dispatch(fakeArticleManagerAction.getFakeArticleList());
            } else if (res.success === false) {
                swal('保存失败', res.msg, 'warning');
            }
        }
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};

export const uploadImage = (fileName, formData) => (dispatch, getState) => {
    try {
        // 现存 上传图片列表
        let imgArray = getState().NewFakeArticleModalReducer.imageArray;
        if (imgArray.length >= 9) {
            swal('添加图片失败', '最多可添加9张图片！', 'warning');
        } else {
            // 基本url
            let url = fileHost + '/api/user/' + localUtil.getSessionItem(sysConst.LOGIN_USER_ID) + '/image?imageType=1';
            httpUtil.httpAsyncFormPost(url, formData, function (result) {
                if (result.success === true) {
                    imgArray.push({name: fileName, url: result.imageId});
                    // 更新 上传图片列表
                    dispatch({type: NewFakeArticleModalActionType.setImageArray, payload: imgArray});
                } else {
                    swal('上传图片失败', result.msg, 'warning');
                }
            }, function (err) {
                swal('上传图片失败', err.msg, 'warning');
            });
        }
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};

export const uploadVideo = (video, image) => (dispatch) => {
    try {
        if (video.length > 0 && image.length > 0) {
            let formData = new FormData();
            formData.append('video', video[0]);
            formData.append('preview', image[0]);
            // 基本url
            let url = fileHost + '/api/user/' + localUtil.getSessionItem(sysConst.LOGIN_USER_ID) + '/media';
            httpUtil.httpAsyncFormPost(url, formData, function (result) {
                if (result.success === true) {
                    // 更新 上传视频结果
                    dispatch({type: NewFakeArticleModalActionType.setVideoArray, payload: [{url: result.result.url, preview: result.result.preview}]});
                } else {
                    swal('上传图片失败', result.msg, 'warning');
                }
            }, function (err) {
                swal('上传图片失败', err.msg, 'warning');
            });
        } else {
            swal('上传视频失败', '请选择上传的视频和预览图片！', 'warning');
        }
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};