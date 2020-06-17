import {handleActions} from 'redux-actions';
import {ReportManagerActionType} from '../../types';

const initialState = {
    // 开始位置
    start: 0,
    // 每页数量
    size: 11,
    // 检索结果数量
    dataSize: 0,

    // 检索条件：处理状态（1-未处理（默认），2-已处理）
    conditionStatus: null,
    // 检索条件：处理结果（1-有效，2-无效）
    conditionValidResults: null,
    // 检索条件：举报时间(始)
    conditionCreatedOnStart: '',
    // 检索条件：举报时间(终)
    conditionCreatedOnEnd: '',

    // 举报管理 结果列表
    reportArray: []
};

export default handleActions({
    [ReportManagerActionType.getReportList]: (state, action) => {
        return {
            ...state,
            reportArray: action.payload
        }
    },
    [ReportManagerActionType.setStartNumber]: (state, action) => {
        return {
            ...state,
            start: action.payload
        }
    },
    [ReportManagerActionType.setDataSize]: (state, action) => {
        return {
            ...state,
            dataSize: action.payload
        }
    },
    [ReportManagerActionType.setConditionStatus]: (state, action) => {
        return {
            ...state,
            conditionStatus: action.payload
        }
    },
    [ReportManagerActionType.setConditionValidResults]: (state, action) => {
        return {
            ...state,
            conditionValidResults: action.payload
        }
    },
    [ReportManagerActionType.setConditionCreatedOnStart]: (state, action) => {
        return {
            ...state,
            conditionCreatedOnStart: action.payload
        }
    },
    [ReportManagerActionType.setConditionCreatedOnEnd]: (state, action) => {
        return {
            ...state,
            conditionCreatedOnEnd: action.payload
        }
    }
}, initialState)