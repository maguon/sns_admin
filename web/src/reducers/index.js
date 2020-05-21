import {combineReducers} from 'redux'
import {reducer as reduxFormReducer} from 'redux-form';

import LoginReducer from './layout/LoginReducer';
import CommonReducer from './layout/CommonReducer';

import MainPanelReducer from './main/MainPanelReducer';

import UserManagerReducer from './main/UserManagerReducer'
import UserManagerDetailReducer from './main/UserManagerDetailReducer'
import ArticleManagerReducer from './main/ArticleManagerReducer';
import ArticleManagerDetailReducer from './main/ArticleManagerDetailReducer';
import VoteManagerReducer from './main/VoteManagerReducer';
import VoteManagerDetailReducer from './main/VoteManagerDetailReducer';
import CommentManagerReducer from './main/CommentManagerReducer';
import CommentManagerDetailReducer from './main/CommentManagerDetailReducer';
import MessageManagerReducer from './main/MessageManagerReducer'

import AdminUserSettingReducer from './main/AdminUserSettingReducer';
import AdminUserSettingDetailReducer from './main/AdminUserSettingDetailReducer';

import AddressMapModalReducer from './modules/AddressMapModalReducer';
import NewVoteModalReducer from './modules/NewVoteModalReducer';
import MessageModalReducer from './modules/MessageModalReducer';
import NewAdminModalReducer from './modules/NewAdminModalReducer';

import OrderStatisticReducer from './main/OrderStatisticReducer';

export default combineReducers({
    form: reduxFormReducer,
    LoginReducer,
    CommonReducer,

    MainPanelReducer,

    UserManagerReducer,
    UserManagerDetailReducer,

    ArticleManagerReducer,
    ArticleManagerDetailReducer,
    VoteManagerReducer,
    VoteManagerDetailReducer,
    NewVoteModalReducer,

    CommentManagerReducer,
    CommentManagerDetailReducer,

    MessageManagerReducer,
    MessageModalReducer,

    AdminUserSettingReducer,
    AdminUserSettingDetailReducer,
    NewAdminModalReducer,

    AddressMapModalReducer,
    OrderStatisticReducer,
})