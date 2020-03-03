import {handleActions} from 'redux-actions';
import {AddressMapModalActionType} from '../../types';

// 画面用初期数据
const initialState = {
    // 收藏地址详细
    addressMapDetail: {}
};

export default handleActions({
    [AddressMapModalActionType.setAddressMapDetail]: (state, action) => {
        return {
            ...state,
            addressMapDetail: action.payload
        }
    }
}, initialState)