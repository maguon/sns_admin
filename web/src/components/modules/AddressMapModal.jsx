import React from 'react';
import {Modal} from 'react-materialize';
import {connect} from 'react-redux';

const formatUtil = require('../../utils/FormatUtil');

// 收藏地址 模态
class AddressMapModal extends React.Component {

    /**
     * 组件准备要挂载的最一开始，调用执行
     */
    constructor() {
        super();
    }

    /**
     * 组件完全挂载到页面上，调用执行
     */
    componentDidMount() {
    }

    /**
     * 渲染(挂载)画面。
     */
    render() {
        const {addressMapModalReducer} = this.props;
        return (
            <Modal
                actions={[
                    <button type="button" className="btn close-btn modal-close">取消</button>,
                ]}
                bottomSheet={false}
                fixedFooter={true}
                className="custom-modal"
                header="收藏地址"
                id="addressMapModal"
                options={{
                    dismissible: true,
                    endingTop: '10%',
                    inDuration: 250,
                    onCloseEnd: null,
                    onCloseStart: null,
                    onOpenEnd: null,
                    onOpenStart: null,
                    opacity: 0.5,
                    outDuration: 250,
                    preventScrolling: true,
                    startingTop: '4%'
                }}
            >
                <div className="row margin-top20 padding-left20 padding-right20">
                    <div className="col s12 fz14">地址编号：{addressMapModalReducer.addressMapDetail._id}</div>
                    <div className="col s12 margin-top10">{addressMapModalReducer.addressMapDetail.address_name}</div>
                    <div className="col s9 fz12 grey-text margin-top10"><i className="mdi mdi-map-marker margin-right10"/>{addressMapModalReducer.addressMapDetail.address_real}</div>
                    <div className="col s3 fz12 grey-text margin-top10">标记时间：{formatUtil.getDateTime(addressMapModalReducer.addressMapDetail.created_at)}</div>
                    {/* 高德地图 */}
                    <div className="col s12 margin-top15 detail-box height-400" id="map-container"/>
                </div>
            </Modal>
        );
    }
}

/**
 * 输入逻辑：外部的数据（即state对象）转换为 UI 组件的参数。
 */
const mapStateToProps = (state) => {
    return {
        addressMapModalReducer: state.AddressMapModalReducer
    }
};

/**
 * 输出逻辑：用户发出的动作变为 Action 对象，从 UI 组件传出去。
 */
const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(AddressMapModal);