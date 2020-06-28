import {handleActions} from 'redux-actions';
import {FakeUserSettingDetailActionType} from '../../types';

const initialState = {
    // 编号
    fakeUserId: '',
    // 手机
    phone: '',
    // 昵称
    nickName: '',
    // 真实姓名
    realName: '',
    // 性别 默认为男：1
    gender: 1,
    // 备注
    remark: ''
};

export default handleActions({
    [FakeUserSettingDetailActionType.setFakeUserId]: (state, action) => {
        return {
            ...state,
            fakeUserId: action.payload
        }
    },
    [FakeUserSettingDetailActionType.setPhone]: (state, action) => {
        return {
            ...state,
            phone: action.payload
        }
    },
    [FakeUserSettingDetailActionType.setNickName]: (state, action) => {
        return {
            ...state,
            nickName: action.payload
        }
    },
    [FakeUserSettingDetailActionType.setRealName]: (state, action) => {
        return {
            ...state,
            realName: action.payload
        }
    },
    [FakeUserSettingDetailActionType.setGender]: (state, action) => {
        return {
            ...state,
            gender: action.payload
        }
    },
    [FakeUserSettingDetailActionType.setRemark]: (state, action) => {
        return {
            ...state,
            remark: action.payload
        }
    }
}, initialState)