import {handleActions} from 'redux-actions';
import {AuthoritySettingActionType} from '../../types';

const initialState = {
    // 检索条件：用户类型
    conditionUserType: null,
    // 当前用户类型
    currentUserType: null,
    // 当前画面菜单
    currentMenu: []
};

export default handleActions({
    [AuthoritySettingActionType.getMenuList]: (state, action) => {
        return {
            ...state,
            currentMenu: action.payload
        }
    },
    [AuthoritySettingActionType.setCurrentUserType]: (state, action) => {
        return {
            ...state,
            currentUserType: action.payload
        }
    },
    [AuthoritySettingActionType.setConditionUserType]: (state, action) => {
        return {
            ...state,
            conditionUserType: action.payload
        }
    }
}, initialState)