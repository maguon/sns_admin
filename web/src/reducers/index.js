import {combineReducers} from 'redux'
import {reducer as reduxFormReducer} from 'redux-form';

import LoginReducer from './layout/LoginReducer';
import HeaderReducer from './layout/HeaderReducer';
import UserManagerReducer from './main/UserManagerReducer'



import InquiryModalReducer from './modules/InquiryModalReducer';

import CommonReducer from './main/CommonReducer';
import FinancePanelReducer from './main/FinancePanelReducer';

import OrderStatisticReducer from './main/OrderStatisticReducer';

import CitySettingReducer from './main/CitySettingReducer';
import RouteSettingReducer from './main/RouteSettingReducer';
import AdminUserSettingReducer from './main/AdminUserSettingReducer';
import AdminUserSettingDetailReducer from './main/AdminUserSettingDetailReducer';
import RecommendBusinessManagerReducer from './main/RecommendBusinessManagerReducer';
import RecommendBusinessManagerDetailReducer from './main/RecommendBusinessManagerDetailReducer';


export default combineReducers({
    form: reduxFormReducer,
    LoginReducer,
    HeaderReducer,


    UserManagerReducer,



    InquiryModalReducer,

    CommonReducer,
    FinancePanelReducer,
    OrderStatisticReducer,

    CitySettingReducer,
    RouteSettingReducer,
    AdminUserSettingReducer,
    AdminUserSettingDetailReducer,
    RecommendBusinessManagerReducer,
    RecommendBusinessManagerDetailReducer,
})