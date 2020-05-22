import {handleActions} from 'redux-actions';
import {DeviceManagerDetailActionType} from '../../types';

const initialState = {
    // 设备信息
    deviceInfo: []
};

export default handleActions({
    [DeviceManagerDetailActionType.getDeviceInfo]: (state, action) => {
        return {
            ...state,
            deviceInfo: action.payload
        }
    }
}, initialState)