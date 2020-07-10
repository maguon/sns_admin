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
import ReportManagerReducer from './main/ReportManagerReducer';
import ReportManagerDetailReducer from './main/ReportManagerDetailReducer';
import FakeUserSettingReducer from './main/FakeUserSettingReducer';
import FakeUserSettingDetailReducer from './main/FakeUserSettingDetailReducer';
import FakeArticleManagerReducer from './main/FakeArticleManagerReducer';
import FakeArticleManagerDetailReducer from './main/FakeArticleManagerDetailReducer';

import AdminUserSettingReducer from './main/AdminUserSettingReducer';
import AdminUserSettingDetailReducer from './main/AdminUserSettingDetailReducer';
import DeviceManagerReducer from './main/DeviceManagerReducer';
import DeviceManagerDetailReducer from './main/DeviceManagerDetailReducer';
import AppVersionReducer from './main/AppVersionReducer';
import AppVersionDetailReducer from './main/AppVersionDetailReducer';

import AddressMapModalReducer from './modules/AddressMapModalReducer';
import ArticleModalReducer from './modules/ArticleModalReducer';
import CommentModalReducer from './modules/CommentModalReducer';
import NewVoteModalReducer from './modules/NewVoteModalReducer';
import MessageModalReducer from './modules/MessageModalReducer';
import NewAdminModalReducer from './modules/NewAdminModalReducer';
import NewAppModalReducer from './modules/NewAppModalReducer';
import NewFakeUserModalReducer from './modules/NewFakeUserModalReducer';
import NewFakeArticleModalReducer from './modules/NewFakeArticleModalReducer';

import UserStatisticReducer from './main/UserStatisticReducer';
import ArticleStatisticReducer from './main/ArticleStatisticReducer';

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
    CommentManagerReducer,
    CommentManagerDetailReducer,
    MessageManagerReducer,
    ReportManagerReducer,
    ReportManagerDetailReducer,
    FakeUserSettingReducer,
    FakeUserSettingDetailReducer,
    FakeArticleManagerReducer,
    FakeArticleManagerDetailReducer,

    AdminUserSettingReducer,
    AdminUserSettingDetailReducer,
    DeviceManagerReducer,
    DeviceManagerDetailReducer,
    AppVersionReducer,
    AppVersionDetailReducer,

    AddressMapModalReducer,
    ArticleModalReducer,
    CommentModalReducer,
    MessageModalReducer,
    NewVoteModalReducer,
    NewAdminModalReducer,
    NewAppModalReducer,
    NewFakeUserModalReducer,
    NewFakeArticleModalReducer,

    UserStatisticReducer,
    ArticleStatisticReducer
})