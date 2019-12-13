import React from 'react';
import {connect} from 'react-redux';
// import {Tab, Tabs} from "react-materialize";

const formatUtil = require('../../utils/FormatUtil');
const mainPanelAction = require('../../actions/main/MainPanelAction');

// 综合页面
class MainPanel extends React.Component {

    /**
     * 组件准备要挂载的最一开始，调用执行
     */
    constructor(props) {
        super(props);
    }

    /**
     * 组件完全挂载到页面上，调用执行
     */
    componentDidMount() {
        this.props.initData();
        $('.tabs').tabs();
    }

    render() {
        const {mainPanelReducer} = this.props;
        return (
            <div>
                {/* 标题部分 */}
                <div className="row">
                    <div className="input-field col s12 page-title">
                        <span className="margin-left10">综合页面</span>
                        <div className="divider custom-divider margin-top10"/>
                    </div>
                </div>

                {/*<Tabs className='tab-demo z-depth-1' onChange={showFirst}>*/}
                {/*    <Tab title="Test 1" idx="1000" className="first">Test 1222222222222222222</Tab>*/}
                {/*    <Tab title="Test 2" idx="1001" className="second" active>Test 233333333333333333333</Tab>*/}
                {/*    <Tab title="Test 3" idx="1002" className="third">Test 44444444444443</Tab>*/}
                {/*    <Tab title="Test 4" idx="1003" className="fouth">Test 555555555555555554</Tab>*/}
                {/*</Tabs>*/}

                {/* 上： 本月收入 本月利润 本月支付供应商 */}
                <div className="row margin-top20 white-text">
                    {/* 本月收入 */}
                    <div className="col s4 padding-left20 padding-right20">
                        <div className="col s12 custom-pink z-depth-2 padding-top20 padding-bottom15">
                            <div className="col s3 margin-top5">
                                <div className="main-panel-icon white vc-center"><i className="mdi mdi-currency-cny pink-font"/></div>
                            </div>
                            <div className="col s9 no-padding">
                                <div className="col s12 fz16">本月收入</div>
                                <div className="col s12 right-align">¥ <span className="margin-left5 fz24">{formatUtil.formatNumber(mainPanelReducer.income,2)}</span></div>
                            </div>
                        </div>
                    </div>

                    {/* 本月利润 */}
                    <div className="col s4 padding-left20 padding-right20">
                        <div className="col s12 custom-pink z-depth-2 padding-top20 padding-bottom15">
                            <div className="col s3 margin-top5">
                                <div className="main-panel-icon white vc-center"><i className="mdi mdi-currency-cny pink-font"/></div>
                            </div>
                            <div className="col s9 no-padding">
                                <div className="col s12 fz16">本月利润</div>
                                <div className="col s12 right-align">¥ <span className="margin-left5 fz24">{formatUtil.formatNumber(mainPanelReducer.profit,2)}</span></div>
                            </div>
                        </div>
                    </div>

                    {/* 本月支付供应商 */}
                    <div className="col s4 padding-left20 padding-right20">
                        <div className="col s12 custom-pink z-depth-2 padding-top20 padding-bottom15">
                            <div className="col s3 margin-top5">
                                <div className="main-panel-icon white vc-center"><i className="mdi mdi-currency-cny pink-font"/></div>
                            </div>
                            <div className="col s9 no-padding">
                                <div className="col s12 fz16">本月支付供应商</div>
                                <div className="col s12 right-align">¥ <span className="margin-left5 fz24">{formatUtil.formatNumber(mainPanelReducer.pay,2)}</span></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 中： 支付待审核 待退款 待开票 */}
                <div className="row margin-top40 pink-font">

                    {/* 支付待审核 */}
                    <div className="col s4 padding-left20 padding-right20">
                        <div className="col s12 detail-box z-depth-2 padding-top20 padding-bottom15">

                            <div className="col s12 vc-center">
                                <div className="main-panel-icon custom-pink vc-center">
                                    <i className="mdi mdi-square-edit-outline white-text"/>
                                </div>
                            </div>
                            <div className="col s12 margin-top5 center fz16">支付待审核</div>
                            <div className="col s12"><div className="col s12 divider custom-divider margin-top10"/></div>

                            <div className="col s12 margin-top15">
                                <div className="col s6 center border-right-pink-line">
                                    <div className="margin-top5 grey-text text-darken-2">笔数</div>
                                    <div className="margin-top10">{formatUtil.formatNumber(mainPanelReducer.waitForPayCnt)}</div>
                                </div>
                                <div className="col s6 center">
                                    <div className="margin-top5 grey-text text-darken-2">金额</div>
                                    <div className="margin-top10">{formatUtil.formatNumber(mainPanelReducer.waitForPayMoney,2)}</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 待退款 */}
                    <div className="col s4 padding-left20 padding-right20">
                        <div className="col s12 detail-box z-depth-2 padding-top20 padding-bottom15">

                            <div className="col s12 vc-center">
                                <div className="main-panel-icon custom-pink vc-center">
                                    <i className="mdi mdi-backspace white-text"/>
                                </div>
                            </div>
                            <div className="col s12 margin-top5 center fz16">待退款</div>
                            <div className="col s12"><div className="col s12 divider custom-divider margin-top10"/></div>

                            <div className="col s12 margin-top15">
                                <div className="col s6 center border-right-pink-line">
                                    <div className="margin-top5 grey-text text-darken-2">笔数</div>
                                    <div className="margin-top10">{formatUtil.formatNumber(mainPanelReducer.waitForRefundCnt)}</div>
                                </div>
                                <div className="col s6 center">
                                    <div className="margin-top5 grey-text text-darken-2">金额</div>
                                    <div className="margin-top10">{formatUtil.formatNumber(mainPanelReducer.waitForRefundMoney,2)}</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 待开票 */}
                    <div className="col s4 padding-left20 padding-right20">
                        <div className="col s12 detail-box z-depth-2 padding-top20 padding-bottom15">

                            <div className="col s12 vc-center">
                                <div className="main-panel-icon custom-pink vc-center">
                                    <i className="mdi mdi-printer white-text"/>
                                </div>
                            </div>
                            <div className="col s12 margin-top5 center fz16">待开票</div>
                            <div className="col s12"><div className="col s12 divider custom-divider margin-top10"/></div>

                            <div className="col s12 margin-top15">
                                <div className="col s6 center border-right-pink-line">
                                    <div className="margin-top5 grey-text text-darken-2">笔数</div>
                                    <div className="margin-top10">{formatUtil.formatNumber(mainPanelReducer.waitForInvoiceCnt)}</div>
                                </div>
                                <div className="col s6 center">
                                    <div className="margin-top5 grey-text text-darken-2">金额</div>
                                    <div className="margin-top10">{formatUtil.formatNumber(mainPanelReducer.waitForInvoiceMoney,2)}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 下： 待支付线路 待支付供应商金额 */}
                <div className="row margin-top40 pink-font">

                    {/* 待支付线路 */}
                    <div className="col s6 padding-left20 padding-right20">
                        <div className="col s12 detail-box z-depth-2 padding-top20 padding-bottom15">
                            <div className="col s2 margin-top5">
                                <div className="main-panel-icon custom-pink vc-center">
                                    <i className="mdi mdi-routes white-text"/>
                                </div>
                            </div>
                            <div className="col s10 no-padding">
                                <div className="col s12 fz16 grey-text text-darken-2">待支付线路</div>
                                <div className="col s12 right-align fz24">{formatUtil.formatNumber(mainPanelReducer.waitForPayLoadTask)}</div>
                            </div>
                        </div>
                    </div>

                    {/* 待支付供应商金额 */}
                    <div className="col s6 padding-left20 padding-right20">
                        <div className="col s12 detail-box z-depth-2 padding-top20 padding-bottom15">
                            <div className="col s2 margin-top5">
                                <div className="main-panel-icon custom-pink vc-center">
                                    <i className="mdi mdi-truck-fast white-text"/>
                                </div>
                            </div>
                            <div className="col s10 no-padding">
                                <div className="col s12 fz16 grey-text text-darken-2">待支付供应商金额</div>
                                <div className="col s12 right-align fz24">{formatUtil.formatNumber(mainPanelReducer.waitForPaySupplier,2)}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        mainPanelReducer: state.MainPanelReducer
    }
};

const mapDispatchToProps = (dispatch) => ({
    initData: () => {
        // dispatch(mainPanelAction.getPaymentInMonth());
        // dispatch(mainPanelAction.getRefundInMonth());
        // dispatch(mainPanelAction.getPrice());
        // dispatch(mainPanelAction.getUnInvoice());
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(MainPanel)