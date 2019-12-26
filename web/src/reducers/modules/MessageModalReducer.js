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
    msgContent: ''
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
    }
}, initialState)