import {handleActions} from 'redux-actions';
import {NewFakeUserModalActionType} from '../../types';

// 画面用初期数据
const initialState = {
    // 昵称
    name: '',
    // 真实姓名
    realName: '',
    // 手机
    phone: '',
    // 密码
    password: '',
    // 性别 默认为男：1
    gender: 1,
    // 备注
    remark: ''
};

export default handleActions({
    [NewFakeUserModalActionType.setNickName]: (state, action) => {
        return {
            ...state,
            name: action.payload
        }
    },
    [NewFakeUserModalActionType.setRealName]: (state, action) => {
        return {
            ...state,
            realName: action.payload
        }
    },
    [NewFakeUserModalActionType.setPhone]: (state, action) => {
        return {
            ...state,
            phone: action.payload
        }
    },
    [NewFakeUserModalActionType.setPassword]: (state, action) => {
        return {
            ...state,
            password: action.payload
        }
    },
    [NewFakeUserModalActionType.setGender]: (state, action) => {
        return {
            ...state,
            gender: action.payload
        }
    },
    [NewFakeUserModalActionType.setRemark]: (state, action) => {
        return {
            ...state,
            remark: action.payload
        }
    }
}, initialState)