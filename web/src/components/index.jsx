import React from 'react';
import ReactDOM from 'react-dom';

import {Container} from './layout/';

import {Provider} from 'react-redux';
import ReduxThunk from 'redux-thunk'
import reducers from '../reducers'
import {applyMiddleware, createStore, compose} from 'redux';


const store = compose(
    applyMiddleware(ReduxThunk)
)(createStore)(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());


const body = (
    <Provider store={store}>
        <div>
            <Container/>
        </div>
    </Provider>
);

ReactDOM.render(
    body,
    document.getElementById('root')
);