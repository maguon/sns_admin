import {handleActions} from 'redux-actions';
import {MessageModalActionType} from '../../types';

// 画面用初期数据
const initialState = {
    // 画面区分
    pageType: '',

    // 消息用户类型
    msgUserType: null,
    // 手机
    phone: '',
    // 消息内容
    msgContent: '',

    // only 编辑画面用
    // 接收人昵称
    userNickName: '',
    // 接收人ID
    msgUserId: '',
    // 发布时间
    createDate: ''
};

export default handleActions({
    [MessageModalActionType.setPageType]: (state, action) => {
        return {
            ...state,
            pageType: action.payload
        }
    },
    [MessageModalActionType.setMsgUserType]: (state, action) => {
        return {
            ...state,
            msgUserType: action.payload
        }
    },
    [MessageModalActionType.setPhone]: (state, action) => {
        return {
            ...state,
            phone: action.payload
        }
    },
    [MessageModalActionType.setMsgContent]: (state, action) => {
        return {
            ...state,
            msgContent: action.payload
        }
    },
    [MessageModalActionType.setMsgUserNickName]: (state, action) => {
        return {
            ...state,
            userNickName: action.payload
        }
    },
    [MessageModalActionType.setMsgUserId]: (state, action) => {
        return {
            ...state,
            msgUserId: action.payload
        }
    },
    [MessageModalActionType.setMsgCreateDate]: (state, action) => {
        return {
            ...state,
            createDate: action.payload
        }
    }
}, initialState)