import {handleActions} from 'redux-actions';
import {CommonActionType} from '../../types';

const initialState = {
    // 登录用户的详细信息
    loginUserInfo :{},
    // 用户列表 (根据电话模糊查询)
    userList: []
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
    }

    // [CommonActionType.getCityList]: (state, action) => {
    //     let cityList = [];
    //     action.payload.forEach((value) => {
    //         cityList.push({value: value.id, label: value.city_name})
    //     });
    //     return {
    //         ...state,
    //         cityList: cityList
    //     }
    // }
}, initialState)