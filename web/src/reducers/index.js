import {combineReducers} from 'redux'
import {reducer as reduxFormReducer} from 'redux-form';

import LoginReducer from './layout/LoginReducer';
import HeaderReducer from './layout/HeaderReducer';
import CommonReducer from './main/CommonReducer';

import MainPanelReducer from './main/MainPanelReducer';

import UserManagerReducer from './main/UserManagerReducer'
import UserManagerDetailReducer from './main/UserManagerDetailReducer'

import ArticleManagerReducer from './main/ArticleManagerReducer';
import ArticleManagerDetailReducer from './main/ArticleManagerDetailReducer';
import VoteManagerReducer from './main/VoteManagerReducer';
import VoteManagerDetailReducer from './main/VoteManagerDetailReducer';
import NewVoteModalReducer from './modules/NewVoteModalReducer';

import CommentManagerReducer from './main/CommentManagerReducer';
import CommentManagerDetailReducer from './main/CommentManagerDetailReducer';

import MessageManagerReducer from './main/MessageManagerReducer'
import MessageModalReducer from './modules/MessageModalReducer';

import AdminUserSettingReducer from './main/AdminUserSettingReducer';
import AdminUserSettingDetailReducer from './main/AdminUserSettingDetailReducer';
import NewAdminModalReducer from './modules/NewAdminModalReducer';




import OrderStatisticReducer from './main/OrderStatisticReducer';

export default combineReducers({
    form: reduxFormReducer,
    LoginReducer,
    HeaderReducer,
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






    OrderStatisticReducer,
})