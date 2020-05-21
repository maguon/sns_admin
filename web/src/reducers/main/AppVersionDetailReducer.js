import {handleActions} from 'redux-actions';
import {AppVersionDetailActionType} from '../../types';

const initialState = {
    // App编号
    appId: '',
    // App状态
    appStatus: '',

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
    [AppVersionDetailActionType.setAppId]: (state, action) => {
        return {
            ...state,
            appId: action.payload
        }
    },
    [AppVersionDetailActionType.setAppStatus]: (state, action) => {
        return {
            ...state,
            appStatus: action.payload
        }
    },
    [AppVersionDetailActionType.setAppType]: (state, action) => {
        return {
            ...state,
            appType: action.payload
        }
    },
    [AppVersionDetailActionType.setDeviceType]: (state, action) => {
        return {
            ...state,
            deviceType: action.payload
        }
    },
    [AppVersionDetailActionType.setVersion]: (state, action) => {
        return {
            ...state,
            version: action.payload
        }
    },
    [AppVersionDetailActionType.setVersionNum]: (state, action) => {
        return {
            ...state,
            versionNum: action.payload
        }
    },
    [AppVersionDetailActionType.setMinVersionNum]: (state, action) => {
        return {
            ...state,
            minVersionNum: action.payload
        }
    },
    [AppVersionDetailActionType.setForceUpdate]: (state, action) => {
        return {
            ...state,
            forceUpdate: action.payload
        }
    },
    [AppVersionDetailActionType.setUrl]: (state, action) => {
        return {
            ...state,
            url: action.payload
        }
    },
    [AppVersionDetailActionType.setRemark]: (state, action) => {
        return {
            ...state,
            remark: action.payload
        }
    }
}, initialState)