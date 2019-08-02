import {combineReducers} from 'redux'
import {reducer as reduxFormReducer} from 'redux-form';

import LoginReducer from './layout/LoginReducer';
import HeaderReducer from './layout/HeaderReducer';
import UserManagerReducer from './main/UserManagerReducer'



import InquiryModalReducer from './modules/InquiryModalReducer';

import CommonReducer from './main/CommonReducer';
import FinancePanelReducer from './main/FinancePanelReducer';

import OrderStatisticReducer from './main/OrderStatisticReducer';

import AdminUserSettingReducer from './main/AdminUserSettingReducer';
import AdminUserSettingDetailReducer from './main/AdminUserSettingDetailReducer';
import RecommendBusinessManagerReducer from './main/RecommendBusinessManagerReducer';
import RecommendBusinessManagerDetailReducer from './main/RecommendBusinessManagerDetailReducer';


import NewAdminModalReducer from './modules/NewAdminModalReducer';


export default combineReducers({
    form: reduxFormReducer,
    LoginReducer,
    HeaderReducer,


    UserManagerReducer,
    AdminUserSettingReducer,
    AdminUserSettingDetailReducer,

    NewAdminModalReducer,
    InquiryModalReducer,



    CommonReducer,
    FinancePanelReducer,
    OrderStatisticReducer,

    RecommendBusinessManagerReducer,
    RecommendBusinessManagerDetailReducer,
})