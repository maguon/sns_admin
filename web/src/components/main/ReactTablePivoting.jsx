import React from 'react';
import {connect} from 'react-redux';

import {makeData} from "../../utils/Utils";
import _ from 'lodash'

// Import React Table
import ReactTable from "react-table";

const tempUser = [
    {
        firstName: 'a',
        lastName: '1',
        age: 10,
        visits: 1,
        progress: 1
    },
    {
        firstName: 'a',
        lastName: '1',
        age: 11,
        visits: 2,
        progress: 2
    },
    {
        firstName: 'a',
        lastName: '2',
        age: 10,
        visits: 1,
        progress: 1
    },
    {
        firstName: 'a',
        lastName: '2',
        age: 11,
        visits: 1,
        progress: 1
    },
    {
        firstName: 'b',
        lastName: '1',
        age: 10,
        visits: 1,
        progress: 1
    },
    {
        firstName: 'b',
        lastName: '2',
        age: 11,
        visits: 1,
        progress: 1
    },
    {
        firstName: 'c',
        lastName: '1',
        age: 11,
        visits: 1,
        progress: 1
    },
    {
        firstName: 'c',
        lastName: '2',
        age: 11,
        visits: 1,
        progress: 1
    },
    {
        firstName: 'd',
        lastName: 'last name',
        age: 11,
        visits: 1,
        progress: 1
    }
];

class ReactTablePivoting extends React.Component {

    /**
     * 组件准备要挂载的最一开始，调用执行
     */
    constructor(props) {
        super(props);
        this.state = {
            data: makeData()
        };
        this.renderEditable = this.renderEditable.bind(this);
    }

    /**
     * 组件完全挂载到页面上，调用执行
     */
    componentDidMount() {
        console.log('componentDidMount');
    }

    renderEditable(cellInfo) {
        return (
            <div
                style={{backgroundColor: "#fafafa"}}
                contentEditable
                suppressContentEditableWarning
                onBlur={e => {
                    const data = [...this.state.data];
                    data[cellInfo.index][cellInfo.column.id] = e.target.innerHTML;
                    this.setState({data});
                }}
                dangerouslySetInnerHTML={{
                    __html: this.state.data[cellInfo.index][cellInfo.column.id]
                }}
            />
        );
    }

    render() {
        const {data} = this.state;
        const {orderStatisticReducer, getOrderStatByMonth, changeDaySize} = this.props;
        return (
            <div>

                {/*  1： custom data for pivoting */}
                <ReactTable
                    data={tempUser}
                    columns={[
                        {
                            Header: "Name",
                            columns: [
                                {
                                    Header: "First Name",
                                    accessor: "firstName"
                                },
                                {
                                    Header: "Last Name",
                                    id: "lastName",
                                    accessor: d => d.lastName
                                }
                            ]
                        },
                        {
                            Header: "Info",
                            columns: [
                                {
                                    Header: "Age",
                                    accessor: "age",
                                    aggregate: vals => _.round(_.mean(vals)),
                                    Aggregated: row => {
                                        return (
                                            <span>
                        {row.value} (avg)
                      </span>
                                        );
                                    }
                                },
                                {
                                    Header: "Visits",
                                    accessor: "visits",
                                    aggregate: vals => _.sum(vals)
                                }
                            ]
                        }
                    ]}
                    pivotBy={["firstName", "lastName"]}
                    defaultPageSize={5}
                    className="-striped -highlight"
                />

                <br/>
                <br/>
                <br/>

                {/*  2： edit table */}
                <ReactTable
                    data={data}
                    columns={[
                        {
                            Header: "First Name",
                            accessor: "firstName",
                            Cell: this.renderEditable
                        },
                        {
                            Header: "Last Name",
                            accessor: "lastName",
                            Cell: this.renderEditable
                        },
                        {
                            Header: "Full Name",
                            id: "full",
                            accessor: d =>
                                <div
                                    dangerouslySetInnerHTML={{
                                        __html: d.firstName + " " + d.lastName
                                    }}
                                />
                        }
                    ]}
                    filterable
                    defaultPageSize={5}
                    className="-striped -highlight"
                />

                <br/>
                <br/>
                <br/>


                {/*  3： edit table */}
                <ReactTable
                    data={data}
                    columns={[
                        {
                            Header: "Name",
                            columns: [
                                {
                                    Header: "First Name",
                                    accessor: "firstName"
                                },
                                {
                                    Header: "Last Name",
                                    id: "lastName",
                                    accessor: d => d.lastName
                                }
                            ]
                        },
                        {
                            Header: "Info",
                            columns: [
                                {
                                    Header: "Age",
                                    accessor: "age",
                                    aggregate: vals => _.round(_.mean(vals)),
                                    Aggregated: row => {
                                        return (
                                            <span>
                        {row.value} (avg)
                      </span>
                                        );
                                    }
                                },
                                {
                                    Header: "Visits",
                                    accessor: "visits",
                                    aggregate: vals => _.sum(vals)
                                }
                            ]
                        }
                    ]}
                    pivotBy={["firstName", "lastName"]}
                    defaultPageSize={5}
                    className="-striped -highlight"
                    SubComponent={row => {
                        return (
                            <div style={{ padding: "20px" }}>
                                <em>Sub Component!</em>
                            </div>
                        );
                    }}
                />


                <br/>
                <br/>
                <br/>


                {/* 4: react-table-cell-renderers cell中加入自定义颜色显示 */}
                <ReactTable
                    data={data}
                    columns={[{
                        Header: 'Name',
                        columns: [{
                            Header: 'First Name',
                            accessor: 'firstName'
                        }, {
                            Header: 'Last Name',
                            id: 'lastName',
                            accessor: d => d.lastName
                        }]
                    }, {
                        Header: 'Info',
                        columns: [{
                            Header: 'Profile Progress',
                            accessor: 'progress',
                            Cell: row => (
                                <div
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        backgroundColor: '#dadada',
                                        borderRadius: '2px'
                                    }}
                                >
                                    <div
                                        style={{
                                            width: `${row.value}%`,
                                            height: '100%',
                                            backgroundColor: row.value > 66 ? '#85cc00'
                                                : row.value > 33 ? '#ffbf00'
                                                    : '#ff2e00',
                                            borderRadius: '2px',
                                            transition: 'all .2s ease-out'
                                        }}
                                    />
                                </div>
                            )
                        }, {
                            Header: 'Status',
                            accessor: 'status',
                            Cell: row => (
                                <span>
            <span style={{
                color: row.value === 'relationship' ? '#ff2e00'
                    : row.value === 'complicated' ? '#ffbf00'
                        : '#57d500',
                transition: 'all .3s ease'
            }}>
              &#x25cf;
            </span> {
                                    row.value === 'relationship' ? 'In a relationship'
                                        : row.value === 'complicated' ? `It's complicated`
                                        : 'Single'
                                }
          </span>
                            )
                        }]
                    }]}
                    defaultPageSize={5}
                    className="-striped -highlight"
                />


                <br/>
                <br/>
                <br/>
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
});

export default connect(mapStateToProps, mapDispatchToProps)(ReactTablePivoting)