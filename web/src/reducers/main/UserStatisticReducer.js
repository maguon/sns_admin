import {handleActions} from 'redux-actions';
import {UserStatisticActionType} from '../../types';

const initialState = {
    // 按月统计：开始月
    monthStart: '',
    // 按月统计：终了月
    monthEnd: '',
    // 按日统计：统计日数
    dataSize: ''
};

export default handleActions({
    [UserStatisticActionType.setMonthStart]: (state, action) => {
        return {
            ...state,
            monthStart: action.payload
        }
    },
    [UserStatisticActionType.setMonthEnd]: (state, action) => {
        return {
            ...state,
            monthEnd: action.payload
        }
    },
    [UserStatisticActionType.setDataSize]: (state, action) => {
        return {
            ...state,
            dataSize: action.payload
        }
    }
}, initialState)