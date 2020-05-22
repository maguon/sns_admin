import {handleActions} from 'redux-actions';
import {DeviceManagerActionType} from '../../types';

const initialState = {
    // 开始位置
    start: 0,
    // 每页数量
    size: 11,
    // 检索结果数量
    dataSize: 0,

    // 检索条件：手机（11位）
    conditionPhone: '',
    // 检索条件：设备类型
    conditionDeviceType: null,
    // 检索条件：设备版本
    conditionVersion: null,
    // 检索条件：设备登录状态(-1-退出登录，1-登录中)
    conditionStatus: null,

    // 评论管理 结果列表
    deviceArray: []
};

export default handleActions({
    [DeviceManagerActionType.getDeviceList]: (state, action) => {
        return {
            ...state,
            deviceArray: action.payload
        }
    },
    [DeviceManagerActionType.setStartNumber]: (state, action) => {
        return {
            ...state,
            start: action.payload
        }
    },
    [DeviceManagerActionType.setDataSize]: (state, action) => {
        return {
            ...state,
            dataSize: action.payload
        }
    },
    [DeviceManagerActionType.setConditionPhone]: (state, action) => {
        return {
            ...state,
            conditionPhone: action.payload
        }
    },
    [DeviceManagerActionType.setConditionDeviceType]: (state, action) => {
        return {
            ...state,
            conditionDeviceType: action.payload
        }
    },
    [DeviceManagerActionType.setConditionVersion]: (state, action) => {
        return {
            ...state,
            conditionVersion: action.payload
        }
    },
    [DeviceManagerActionType.setConditionStatus]: (state, action) => {
        return {
            ...state,
            conditionStatus: action.payload
        }
    }
}, initialState)