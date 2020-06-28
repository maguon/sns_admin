import {handleActions} from 'redux-actions';
import {FakeUserSettingActionType} from '../../types';

const initialState = {
    // 开始位置
    start: 0,
    // 每页数量
    size: 11,
    // 检索结果数量
    dataSize: 0,

    // 检索条件：手机
    conditionPhone: '',
    // 检索条件：状态
    conditionStatus: null,

    // Fake员工列表
    fakeUserArray: []
};

export default handleActions({
    [FakeUserSettingActionType.getFakeUserList]: (state, action) => {
        return {
            ...state,
            fakeUserArray: action.payload
        }
    },
    [FakeUserSettingActionType.setStartNumber]: (state, action) => {
        return {
            ...state,
            start: action.payload
        }
    },
    [FakeUserSettingActionType.setDataSize]: (state, action) => {
        return {
            ...state,
            dataSize: action.payload
        }
    },
    [FakeUserSettingActionType.setConditionPhone]: (state, action) => {
        return {
            ...state,
            conditionPhone: action.payload
        }
    },
    [FakeUserSettingActionType.setConditionStatus]: (state, action) => {
        return {
            ...state,
            conditionStatus: action.payload
        }
    }
}, initialState)