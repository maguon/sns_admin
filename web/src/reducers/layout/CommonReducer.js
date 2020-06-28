import {handleActions} from 'redux-actions';
import {CommonActionType} from '../../types';

const initialState = {
    // 登录用户的详细信息
    loginUserInfo :{},
    // 用户列表 (根据电话模糊查询)
    userList: [],
    // 设备版本
    appVersionList: [],
    // Fake用户列表
    fakeUserList: []
};

export default handleActions({
    [CommonActionType.getLoginUserInfo]: (state, action) => {
        return {
            ...state,
            loginUserInfo: action.payload
        }
    },
    [CommonActionType.getUserByPhoneList]: (state, action) => {
        let userList = [];
        action.payload.forEach((value) => {
            // userList.push(value.user_login_info[0].phone + "  " + value.real_name + " " + value.user_login_info[0]._id);
            userList[value._id + "  " + value.user_detail_info[0].nick_name + "  " + value.phone] =null;
        });
        // userList = ['Burns Bay Road', 'Downing Street', 'Wall Street'];
        return {
            ...state,
            userList: userList
        }
    },
    [CommonActionType.getAppVersionList]: (state, action) => {
        let appVersionList = [];
        action.payload.forEach((value) => {
            appVersionList.push({value: value._id, label: value.version})
        });
        return {
            ...state,
            appVersionList: appVersionList
        }
    },
    [CommonActionType.getFakeUserList]: (state, action) => {
        let fakeUserList = [];
        action.payload.forEach((value) => {
            fakeUserList.push({value: value._id, label: value.user_detail_info[0].nick_name})
        });
        return {
            ...state,
            fakeUserList: fakeUserList
        }
    }
}, initialState)