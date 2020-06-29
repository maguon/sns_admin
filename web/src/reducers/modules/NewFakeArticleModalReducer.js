import {handleActions} from 'redux-actions';
import {NewFakeArticleModalActionType} from '../../types';

// 画面用初期数据
const initialState = {
    // Fake用户
    fakeUser: null,
    // 消息类型(1.文章 2.求助 )
    type: null,
    // 载体类型(1.文本 2.图片 3.视频 4.位置分享 )
    carrier: null,
    // 内容
    info: '',
    // 图片
    imageArray: [],
    // 视频
    videoArray: []
};

export default handleActions({
    [NewFakeArticleModalActionType.setFakeUser]: (state, action) => {
        return {
            ...state,
            fakeUser: action.payload
        }
    },
    [NewFakeArticleModalActionType.setType]: (state, action) => {
        return {
            ...state,
            type: action.payload
        }
    },
    [NewFakeArticleModalActionType.setCarrier]: (state, action) => {
        return {
            ...state,
            carrier: action.payload
        }
    },
    [NewFakeArticleModalActionType.setInfo]: (state, action) => {
        return {
            ...state,
            info: action.payload
        }
    },
    [NewFakeArticleModalActionType.setImageArray]: (state, action) => {
        return {
            ...state,
            imageArray: action.payload
        }
    },
    [NewFakeArticleModalActionType.setVideoArray]: (state, action) => {
        return {
            ...state,
            videoArray: action.payload
        }
    }
}, initialState)