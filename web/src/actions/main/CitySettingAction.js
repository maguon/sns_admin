import {apiHost} from '../../config/HostConfig';
import {CitySettingActionType} from '../../types';

const httpUtil = require('../../utils/HttpUtil');
const localUtil = require('../../utils/LocalUtil');
const sysConst = require('../../utils/SysConst');

export const getCityList = () => async (dispatch) => {
    try {
        const url = apiHost + '/api/admin/' + localUtil.getSessionItem(sysConst.USER_ID) + '/city';
        const res = await httpUtil.httpGet(url);
        if (res.success === true) {
            dispatch({type: CitySettingActionType.getCityInfo, payload: res.result})
        } else if (res.success === false) {
            swal('获取城市信息失败', res.msg, 'warning');
        }
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};

export const addCity = () => async (dispatch, getState) => {
    try {
        const cityName = getState().CitySettingReducer.cityName.trim();
        if (cityName === '') {
            swal('添加失败', '请输入城市名称！', 'warning');
        } else {
            const params = {
                cityName: cityName
            };
            const url = apiHost + '/api/admin/' + localUtil.getSessionItem(sysConst.USER_ID) + '/city';
            const res = await httpUtil.httpPost(url, params);

            if (res.success === true) {
                swal("添加成功", "", "success");
                // 恢复添加前画面样子
                dispatch({type: CitySettingActionType.setCityFormFlag, payload: false});
                dispatch({type: CitySettingActionType.setCityName, payload: ''});
                // 添加成功后，重新检索画面数据
                dispatch(getCityList());
            } else if (res.success === false) {
                swal('添加失败', res.msg, 'warning');
            }
        }
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};