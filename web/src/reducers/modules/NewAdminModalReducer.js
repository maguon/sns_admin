import {handleActions} from 'redux-actions';
import {NewAdminModalActionType} from '../../types';

// 画面用初期数据
const initialState = {
    // 管理员名称
    name: '',
    // 真实姓名
    realName: '',
    // 手机
    phone: '',
    // 密码
    password: '',
    // 性别 默认为男：1
    gender: 1
};

export default handleActions({
    [NewAdminModalActionType.setAdminName]: (state, action) => {
        return {
            ...state,
            name: action.payload
        }
    },
    [NewAdminModalActionType.setAdminRealName]: (state, action) => {
        return {
            ...state,
            realName: action.payload
        }
    },
    [NewAdminModalActionType.setPhone]: (state, action) => {
        return {
            ...state,
            phone: action.payload
        }
    },
    [NewAdminModalActionType.setPassword]: (state, action) => {
        return {
            ...state,
            password: action.payload
        }
    },
    [NewAdminModalActionType.setAdminGender]: (state, action) => {
        return {
            ...state,
            gender: action.payload
        }
    }
}, initialState)