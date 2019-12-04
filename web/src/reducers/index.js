import {combineReducers} from 'redux'
import {reducer as reduxFormReducer} from 'redux-form';

import LoginReducer from './layout/LoginReducer';
import HeaderReducer from './layout/HeaderReducer';

import CommonReducer from './main/CommonReducer';

import MainPanelReducer from './main/MainPanelReducer';














import UserManagerReducer from './main/UserManagerReducer'
import MessageManagerReducer from './main/MessageManagerReducer'
import AdminUserSettingReducer from './main/AdminUserSettingReducer';
import AdminUserSettingDetailReducer from './main/AdminUserSettingDetailReducer';

import NewAdminModalReducer from './modules/NewAdminModalReducer';



import OrderStatisticReducer from './main/OrderStatisticReducer';
import RecommendBusinessManagerReducer from './main/RecommendBusinessManagerReducer';
import RecommendBusinessManagerDetailReducer from './main/RecommendBusinessManagerDetailReducer';
import InquiryModalReducer from './modules/InquiryModalReducer';

export default combineReducers({
    form: reduxFormReducer,
    LoginReducer,
    HeaderReducer,

    CommonReducer,

    MainPanelReducer,
















    UserManagerReducer,
    MessageManagerReducer,
    AdminUserSettingReducer,
    AdminUserSettingDetailReducer,

    NewAdminModalReducer,


    InquiryModalReducer,

    OrderStatisticReducer,
    RecommendBusinessManagerReducer,
    RecommendBusinessManagerDetailReducer,
})