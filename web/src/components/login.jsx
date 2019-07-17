import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import ReduxThunk from 'redux-thunk';
import {HashRouter as Router, Route} from "react-router-dom";
import {applyMiddleware, createStore, compose} from 'redux';

import {Login, Register, ResetPassword} from './layout/index';


import reducers from '../reducers'

const store = compose(
    applyMiddleware(ReduxThunk)
)(createStore)(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

const routes = [
    // 登录画面
    {
        path: "/",
        exact: true,
        component: Login
    },
    // 注册用户
    {
        path: "/register",
        exact: true,
        component: Register
    },
    // 重置密码
    {
        path: "/reset",
        exact: true,
        component: ResetPassword
    }
];
const body = (
    <Provider store={store}>
        <Router hashType={"hashbang"}>
            <div>
                {routes.map((route, index) => (
                    <Route
                        key={index}
                        path={route.path}
                        exact={route.exact}
                        component={route.component}
                    />
                ))}
            </div>
        </Router>
    </Provider>
);

ReactDOM.render(
    body,
    document.getElementById('root')
);