import {handleActions} from 'redux-actions';
import {MainPanelActionType} from '../../types';

const initialState = {
    // 本月收入
    income: 0,
    // 本月利润
    profit: 0,
    // 本月支付供应商
    pay: 0,

    // 支付待审核:笔数
    waitForPayCnt: 0,
    // 支付待审核:金额
    waitForPayMoney: 0,
    // 待退款:笔数
    waitForRefundCnt: 0,
    // 待退款:金额
    waitForRefundMoney: 0,
    // 待开票:笔数
    waitForInvoiceCnt: 0,
    // 待开票:金额
    waitForInvoiceMoney: 0,

    // 待支付线路
    waitForPayLoadTask: 0,
    // 待支付供应商金额
    waitForPaySupplier: 0
};

export default handleActions({
    [MainPanelActionType.setIncome]: (state, action) => {
        return {
            ...state,
            income: action.payload
        }
    },
    [MainPanelActionType.setProfit]: (state, action) => {
        return {
            ...state,
            profit: action.payload
        }
    },
    [MainPanelActionType.setPayment]: (state, action) => {
        return {
            ...state,
            pay: action.payload
        }
    },
    [MainPanelActionType.setWaitForPayCnt]: (state, action) => {
        return {
            ...state,
            waitForPayCnt: action.payload
        }
    },
    [MainPanelActionType.setWaitForPayMoney]: (state, action) => {
        return {
            ...state,
            waitForPayMoney: action.payload
        }
    },
    [MainPanelActionType.setWaitForRefundCnt]: (state, action) => {
        return {
            ...state,
            waitForRefundCnt: action.payload
        }
    },
    [MainPanelActionType.setWaitForRefundMoney]: (state, action) => {
        return {
            ...state,
            waitForRefundMoney: action.payload
        }
    },
    [MainPanelActionType.setWaitForInvoiceCnt]: (state, action) => {
        return {
            ...state,
            waitForInvoiceCnt: action.payload
        }
    },
    [MainPanelActionType.setWaitForInvoiceMoney]: (state, action) => {
        return {
            ...state,
            waitForInvoiceMoney: action.payload
        }
    },
    [MainPanelActionType.setWaitForPayLoadTask]: (state, action) => {
        return {
            ...state,
            waitForPayLoadTask: action.payload
        }
    },
    [MainPanelActionType.setWaitForPaySupplier]: (state, action) => {
        return {
            ...state,
            waitForPaySupplier: action.payload
        }
    },
}, initialState)