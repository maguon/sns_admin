import React from 'react';
import Select from 'react-select';
import {connect} from 'react-redux';
import {OrderStatisticActionType} from "../../types";

const orderStatisticAction = require('../../actions/main/OrderStatisticAction');
const formatUtil = require('../../utils/FormatUtil');
const sysConst = require('../../utils/SysConst');

class BasicTable extends React.Component {

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
        console.log('componentDidMount');
    }

    render() {
        const {orderStatisticReducer, getOrderStatByMonth, changeDaySize} = this.props;
        return (
            <div id="main" className="main-full">
                <div className="row">
                    <div className="breadcrumbs-inline pt-3 pb-1" id="breadcrumbs-wrapper">
                        {/* Search for small screen*/}
                        <div className="container">
                            <div className="row">
                                <div className="col s10 m6 l6 breadcrumbs-left">
                                    <h5 className="mt-0 mb-0 display-inline hide-on-small-and-down">Table Basic</h5>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col s12">
                        <div className="container">
                            <div className="section">
                                <div className="card">
                                    <div className="card-content">
                                        <p className="caption mb-0">Tables are a nice way to organize a lot of data. We
                                            provide a few
                                            utility classes to help
                                            you style your table as easily as possible. In addition, to improve mobile
                                            experience,
                                            all tables on
                                            mobile-screen widths are centered automatically.</p>
                                    </div>
                                </div>
                                {/* Borderless Table */}
                                <div className="row">
                                    <div className="col s12">
                                        <div id="borderless-table" className="card card-tabs">
                                            <div className="card-content">
                                                <div className="card-title">
                                                    <div className="row">
                                                        <div className="col s12 m6 l10">
                                                            <h4 className="card-title">Borderless Table （18px）</h4>
                                                            <p>Tables are borderless by default.</p>
                                                        </div>
                                                        <div className="col s12 m6 l2">
                                                        </div>
                                                    </div>
                                                </div>
                                                <div id="view-borderless-table" className="active">
                                                    <div className="row">
                                                        <div className="col s12">
                                                            <table>
                                                                <thead>
                                                                <tr>
                                                                    <th data-field="id">Name（15px）</th>
                                                                    <th data-field="name">Item Name</th>
                                                                    <th data-field="price">Item Price</th>
                                                                </tr>
                                                                </thead>
                                                                <tbody>
                                                                <tr>
                                                                    <td>Alvin</td>
                                                                    <td>Eclair</td>
                                                                    <td>$0.87</td>
                                                                </tr>
                                                                <tr>
                                                                    <td>Alan</td>
                                                                    <td>Jellybean</td>
                                                                    <td>$3.76</td>
                                                                </tr>
                                                                <tr>
                                                                    <td>Jonathan</td>
                                                                    <td>Lollipop</td>
                                                                    <td>$7.00</td>
                                                                </tr>
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Bordered Table */}
                                <div className="row">
                                    <div className="col s12 m12 l12">
                                        <div id="bordered-table" className="card card card-default scrollspy">
                                            <div className="card-content">
                                                <h4 className="card-title">Bordered Table</h4>
                                                <p className="mb-2">Add <code
                                                    className="  language-markup">class="bordered"</code> to the
                                                    table tag for a
                                                    bordered table</p>
                                                <div className="row">
                                                    <div className="col s12">
                                                    </div>
                                                    <div className="col s12">
                                                        <table className="bordered">
                                                            <thead>
                                                            <tr>
                                                                <th data-field="id">Name</th>
                                                                <th data-field="name">Item Name</th>
                                                                <th data-field="price">Item Price</th>
                                                            </tr>
                                                            </thead>
                                                            <tbody>
                                                            <tr>
                                                                <td>Alvin</td>
                                                                <td>Eclair</td>
                                                                <td>$0.87</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Alan</td>
                                                                <td>Jellybean</td>
                                                                <td>$3.76</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Jonathan</td>
                                                                <td>Lollipop</td>
                                                                <td>$7.00</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Shannon</td>
                                                                <td>KitKat</td>
                                                                <td>$9.99</td>
                                                            </tr>
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Striped Table */}
                                <div className="row">
                                    <div className="col s12 m12 l12">
                                        <div id="striped-table" className="card card card-default scrollspy">
                                            <div className="card-content">
                                                <h4 className="card-title">Striped Table</h4>
                                                <p className="mb-2">Add <code
                                                    className="  language-markup">class="striped"</code> to the
                                                    table tag for a striped
                                                    table</p>
                                                <div className="row">
                                                    <div className="col s12">
                                                    </div>
                                                    <div className="col s12">
                                                        <table className="striped">
                                                            <thead>
                                                            <tr>
                                                                <th data-field="id">Name</th>
                                                                <th data-field="name">Item Name</th>
                                                                <th data-field="price">Item Price</th>
                                                            </tr>
                                                            </thead>
                                                            <tbody>
                                                            <tr>
                                                                <td>Alvin</td>
                                                                <td>Eclair</td>
                                                                <td>$0.87</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Alan</td>
                                                                <td>Jellybean</td>
                                                                <td>$3.76</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Jonathan</td>
                                                                <td>Lollipop</td>
                                                                <td>$7.00</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Shannon</td>
                                                                <td>KitKat</td>
                                                                <td>$9.99</td>
                                                            </tr>
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Highlight Table */}
                                <div className="row">
                                    <div className="col s12 m12 l12">
                                        <div id="highlight-table" className="card card card-default scrollspy">
                                            <div className="card-content">
                                                <h4 className="card-title">Highlight Table</h4>
                                                <p className="mb-2">Add <code
                                                    className="  language-markup">class="Highlight"</code> to the
                                                    table tag for a highlight
                                                    table</p>
                                                <div className="row">
                                                    <div className="col s12">
                                                    </div>
                                                    <div className="col s12">
                                                        <table className="highlight">
                                                            <thead>
                                                            <tr>
                                                                <th>Name</th>
                                                                <th>Item Name</th>
                                                                <th>Item Price</th>
                                                            </tr>
                                                            </thead>
                                                            <tbody>
                                                            <tr>
                                                                <td>Alvin</td>
                                                                <td>Eclair</td>
                                                                <td>$0.87</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Alan</td>
                                                                <td>Jellybean</td>
                                                                <td>$3.76</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Jonathan</td>
                                                                <td>Lollipop</td>
                                                                <td>$7.00</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Shannon</td>
                                                                <td>KitKat</td>
                                                                <td>$9.99</td>
                                                            </tr>
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Centered Table */}
                                <div className="row">
                                    <div className="col s12 m12 l12">
                                        <div id="centered-table" className="card card card-default scrollspy">
                                            <div className="card-content">
                                                <h4 className="card-title">Centered Table</h4>
                                                <p className="mb-2">Add <code
                                                    className="  language-markup">class="centered"</code> to the
                                                    table tag to center align
                                                    all the
                                                    text in the table</p>
                                                <div className="row">
                                                    <div className="col s12">
                                                    </div>
                                                    <div className="col s12">
                                                        <table className="centered">
                                                            <thead>
                                                            <tr>
                                                                <th data-field="id">Name</th>
                                                                <th data-field="name">Item Name</th>
                                                                <th data-field="price">Item Price</th>
                                                            </tr>
                                                            </thead>
                                                            <tbody>
                                                            <tr>
                                                                <td>Alvin</td>
                                                                <td>Eclair</td>
                                                                <td>$0.87</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Alan</td>
                                                                <td>Jellybean</td>
                                                                <td>$3.76</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Jonathan</td>
                                                                <td>Lollipop</td>
                                                                <td>$7.00</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Shannon</td>
                                                                <td>KitKat</td>
                                                                <td>$9.99</td>
                                                            </tr>
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Responsive Table */}
                                <div className="row">
                                    <div className="col s12 m12 l12">
                                        <div id="responsive-table" className="card card card-default scrollspy">
                                            <div className="card-content">
                                                <h4 className="card-title">Responsive Table</h4>
                                                <p className="mb-2">Add <code
                                                    className="  language-markup">class="responsive-table"</code>
                                                    to the table tag to make
                                                    the table
                                                    horizontally scrollable on smaller screen widths.</p>
                                                <div className="row">
                                                    <div className="col s12">
                                                    </div>
                                                    <div className="col s12">
                                                        <table className="responsive-table">
                                                            <thead>
                                                            <tr>
                                                                <th data-field="id">Name</th>
                                                                <th data-field="name">Item Name</th>
                                                                <th data-field="price">Item Price</th>
                                                                <th data-field="total">Total</th>
                                                                <th data-field="status">Status</th>
                                                            </tr>
                                                            </thead>
                                                            <tbody>
                                                            <tr>
                                                                <td>Alvin</td>
                                                                <td>Eclair</td>
                                                                <td>$0.87</td>
                                                                <td>$1.87</td>
                                                                <td>Yes</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Alan</td>
                                                                <td>Jellybean</td>
                                                                <td>$3.76</td>
                                                                <td>$10.87</td>
                                                                <td>No</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Jonathan</td>
                                                                <td>Lollipop</td>
                                                                <td>$7.00</td>
                                                                <td>$12.87</td>
                                                                <td>Yes</td>
                                                            </tr>
                                                            <tr>
                                                                <td>Shannon</td>
                                                                <td>KitKat</td>
                                                                <td>$9.99</td>
                                                                <td>$14.87</td>
                                                                <td>No</td>
                                                            </tr>
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
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
        orderStatisticReducer: state.OrderStatisticReducer
    }
};

const mapDispatchToProps = (dispatch) => ({
    getOrderStatByMonth: () => {
        dispatch(orderStatisticAction.getOrderStatByMonth());
    },
    getOrderStatByDay: () => {
        dispatch(orderStatisticAction.getOrderStatByDay());
    },
    setMonthStart: (value) => {
        dispatch(OrderStatisticActionType.setMonthStart(value));
    },
    setMonthEnd: (value) => {
        dispatch(OrderStatisticActionType.setMonthEnd(value));
    },
    changeDaySize: (value) => {
        dispatch(OrderStatisticActionType.setDaySize(value));
        dispatch(orderStatisticAction.getOrderStatByDay());
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(BasicTable)