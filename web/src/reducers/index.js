import {combineReducers} from 'redux'
import {reducer as reduxFormReducer} from 'redux-form';

import ContainerReducer from './layout/ContainerReducer';
import LoginReducer from './layout/LoginReducer';

export default combineReducers({
    form: reduxFormReducer,
    ContainerReducer,LoginReducer
});