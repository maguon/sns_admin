import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import ReduxThunk from 'redux-thunk'
import reducers from '../reducers'
import {applyMiddleware, createStore, compose} from 'redux';
import {Header, Container, Footer} from './layout/';

const store = compose(
    applyMiddleware(ReduxThunk)
)(createStore)(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

const body = (
    <Provider store={store}>
        <div style={{height: '100%'}}>
            <Header/>
            <Container/>
            <Footer/>
        </div>
    </Provider>
);

ReactDOM.render(
    body,
    document.getElementById('root')
);