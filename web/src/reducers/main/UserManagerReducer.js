import {handleActions} from 'redux-actions';
import {UserManagerActionType} from '../../types';

const initialState = {
    // 开始位置
    start: 0,
    // 每页数量
    size: 11,
    // 检索结果数量
    dataSize: 0,

    // 检索条件：用户编号
    conditionUserId: '',
    // 检索条件：注册手机
    conditionPhone: '',
    // 检索条件：性别
    conditionGender: null,
    // 检索条件：昵称
    conditionNickname: '',
    // 检索条件：城市
    conditionCity: '',
    // 检索条件：驾照类型
    conditionDrivingType: null,
    // 检索条件：注册时间(始)
    conditionCreatedOnStart: '',
    // 检索条件：注册时间(终)
    conditionCreatedOnEnd: '',

    // 结果列表
    userArray: []
};

export default handleActions({
    [UserManagerActionType.getUserList]: (state, action) => {
        return {
            ...state,
            userArray: action.payload
        }
    },
    [UserManagerActionType.setStartNumber]: (state, action) => {
        return {
            ...state,
            start: action.payload
        }
    },
    [UserManagerActionType.setDataSize]: (state, action) => {
        return {
            ...state,
            dataSize: action.payload
        }
    },
    [UserManagerActionType.setConditionUserId]: (state, action) => {
        return {
            ...state,
            conditionUserId: action.payload
        }
    },
    [UserManagerActionType.setConditionPhone]: (state, action) => {
        return {
            ...state,
            conditionPhone: action.payload
        }
    },
    [UserManagerActionType.setConditionGender]: (state, action) => {
        return {
            ...state,
            conditionGender: action.payload
        }
    },
    [UserManagerActionType.setConditionNickname]: (state, action) => {
        return {
            ...state,
            conditionNickname: action.payload
        }
    },
    [UserManagerActionType.setConditionCity]: (state, action) => {
        return {
            ...state,
            conditionCity: action.payload
        }
    },
    [UserManagerActionType.setConditionDrivingType]: (state, action) => {
        return {
            ...state,
            conditionDrivingType: action.payload
        }
    },
    [UserManagerActionType.setConditionCreatedOnStart]: (state, action) => {
        return {
            ...state,
            conditionCreatedOnStart: action.payload
        }
    },
    [UserManagerActionType.setConditionCreatedOnEnd]: (state, action) => {
        return {
            ...state,
            conditionCreatedOnEnd: action.payload
        }
    }
}, initialState)