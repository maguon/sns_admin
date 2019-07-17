import { handleActions } from 'redux-actions';
import {ContainerActionType} from '../../types/';
console.log(ContainerActionType);
const initialState = {
    data: {
        text: ''
    }
}

export default handleActions({
    [ContainerActionType.init_web]: (state, action) => {

        return {
            ...state,
            userInfo: action.payload
        }
    }} , initialState)