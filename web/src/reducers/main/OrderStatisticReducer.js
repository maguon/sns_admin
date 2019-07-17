import {handleActions} from 'redux-actions';
import {OrderStatisticActionType} from '../../types';

const initialState = {
    // 按月统计：开始月
    monthStart: '',
    // 按月统计：终了月
    monthEnd: '',
    // 按日统计：统计日数
    daySize: ''
};

export default handleActions({
    [OrderStatisticActionType.setMonthStart]: (state, action) => {
        return {
            ...state,
            monthStart: action.payload
        }
    },
    [OrderStatisticActionType.setMonthEnd]: (state, action) => {
        return {
            ...state,
            monthEnd: action.payload
        }
    },
    [OrderStatisticActionType.setDaySize]: (state, action) => {
        return {
            ...state,
            daySize: action.payload
        }
    }
}, initialState)