import {AddressMapModalActionType} from "../../types";

const sysConst = require('../../utils/SysConst');

// 收藏地址 模态（用户管理 -> 用户详情 -> 收藏地址 -> 模态）
export const initAddressMapModal = (item) => async (dispatch) => {
    // 收藏地址详细
    dispatch({type: AddressMapModalActionType.setAddressMapDetail, payload: item});

    if (item.address == null || item.address.length !== 2) {
        // 如果没有经纬度，则默认显示大连
        new AMap.Map("map-container", {
            resizeEnable: true,
            center: sysConst.DEFAULT_LOCATION,
            zoom: 11
        });
    } else {
        // 设置地图显示
        let map = new AMap.Map('map-container', {
            resizeEnable: true,
            zoom: 13,
            center: item.address
        });
        let marker = new AMap.Marker({position: item.address});
        map.add(marker);
    }
};