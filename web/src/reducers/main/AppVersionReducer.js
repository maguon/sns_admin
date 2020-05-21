import {handleActions} from 'redux-actions';
import {AppVersionActionType} from '../../types';

const initialState = {
    // 开始位置
    start: 0,
    // 每页数量
    size: 11,
    // 检索结果数量
    dataSize: 0,

    // 检索条件：系统
    conditionDeviceType: null,
    // 检索条件：状态
    conditionStatus: null,

    // App列表
    appArray: []
};

export default handleActions({
    [AppVersionActionType.getAppList]: (state, action) => {
        return {
            ...state,
            appArray: action.payload
        }
    },
    [AppVersionActionType.setStartNumber]: (state, action) => {
        return {
            ...state,
            start: action.payload
        }
    },
    [AppVersionActionType.setDataSize]: (state, action) => {
        return {
            ...state,
            dataSize: action.payload
        }
    },
    [AppVersionActionType.setConditionDeviceType]: (state, action) => {
        return {
            ...state,
            conditionDeviceType: action.payload
        }
    },
    [AppVersionActionType.setConditionStatus]: (state, action) => {
        return {
            ...state,
            conditionStatus: action.payload
        }
    }
}, initialState)