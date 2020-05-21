import {handleActions} from 'redux-actions';
import {NewAppModalActionType} from '../../types';

const initialState = {
    // app类型(1-司机之家)
    appType: null,
    // 系统类型(1-安卓 2-苹果)
    deviceType: null,
    // 版本号
    version: '',
    // 版本序号
    versionNum: '',

    // 最低版本号
    minVersionNum: '',
    // 强制更新
    forceUpdate: null,
    // 下载地址
    url: '',
    // 备注
    remark: ''
};

export default handleActions({
    [NewAppModalActionType.setAppType]: (state, action) => {
        return {
            ...state,
            appType: action.payload
        }
    },
    [NewAppModalActionType.setDeviceType]: (state, action) => {
        return {
            ...state,
            deviceType: action.payload
        }
    },
    [NewAppModalActionType.setVersion]: (state, action) => {
        return {
            ...state,
            version: action.payload
        }
    },
    [NewAppModalActionType.setVersionNum]: (state, action) => {
        return {
            ...state,
            versionNum: action.payload
        }
    },
    [NewAppModalActionType.setMinVersionNum]: (state, action) => {
        return {
            ...state,
            minVersionNum: action.payload
        }
    },
    [NewAppModalActionType.setForceUpdate]: (state, action) => {
        return {
            ...state,
            forceUpdate: action.payload
        }
    },
    [NewAppModalActionType.setUrl]: (state, action) => {
        return {
            ...state,
            url: action.payload
        }
    },
    [NewAppModalActionType.setRemark]: (state, action) => {
        return {
            ...state,
            remark: action.payload
        }
    }
}, initialState)