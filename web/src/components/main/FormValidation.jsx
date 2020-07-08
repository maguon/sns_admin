import React from 'react';
import Select from 'react-select';
import {connect} from 'react-redux';
import {OrderStatisticActionType} from "../../types";

const formatUtil = require('../../utils/FormatUtil');
const sysConst = require('../../utils/SysConst');

class FormValidation extends React.Component {

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
                        {/*Search for small screen*/}
                        <div className="container">
                            <div className="row">
                                <div className="col s10 m6 l6 breadcrumbs-left">
                                    <h5 className="mt-0 mb-0 display-inline hide-on-small-and-down">Form Validation</h5>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col s12">
                    <div className="container">
                        <div className="section">
                            {/*HTML VALIDATION*/}
                            <div className="row">
                                <div className="col s12">
                                    <div id="html-validations" className="card card-tabs">
                                        <div className="card-content">
                                            <div className="card-title">
                                                <div className="row">
                                                    <div className="col s12 m6 l10">
                                                        <h4 className="card-title">HTML Validation Example</h4>
                                                    </div>
                                                    <div className="col s12 m6 l2">
                                                    </div>
                                                </div>
                                            </div>
                                            <div id="html-view-validations">
                                                <form className="formValidate0" id="formValidate0" method="get">
                                                    <div className="row">
                                                        <div className="input-field col s12">
                                                            <label htmlFor="uname0">Username*</label>
                                                            <input className="validate" required="" aria-required="true"
                                                                   id="uname0"
                                                                   name="uname0" type="text"/>
                                                        </div>
                                                        <div className="input-field col s12">
                                                            <label htmlFor="cemail0">E-Mail *</label>
                                                            <input className="validate" required="" aria-required="true"
                                                                   id="cemail0"
                                                                   type="email" name="cemail0"/>
                                                        </div>
                                                        <div className="input-field col s12">
                                                            <label htmlFor="password0">Password *</label>
                                                            <input className="validate" required="" aria-required="true"
                                                                   id="password0"
                                                                   type="password" name="password0"/>
                                                        </div>
                                                        <div className="input-field col s12">
                                                            <label htmlFor="cpassword0">Confirm Password *</label>
                                                            <input className="validate" required="" aria-required="true"
                                                                   id="cpassword0"
                                                                   type="password" name="cpassword0"/>
                                                        </div>
                                                        <div className="input-field col s12">
                                                            <label htmlFor="curl0">URL *</label>
                                                            <input className="validate" required="" aria-required="true"
                                                                   id="curl0"
                                                                   type="url" name="curl0"/>
                                                        </div>


                                                        <div className="input-field col s12">
                                                            <select>
                                                                <option value="" disabled="" selected="">Choose your
                                                                    profile
                                                                </option>
                                                                <option value="1">Manager</option>
                                                                <option value="2">Developer</option>
                                                                <option value="3">Business</option>
                                                            </select>
                                                            <label>Role</label>
                                                        </div>
                                                        <div className="input-field col s12">
                                                <textarea id="ccomment0" name="ccomment0"
                                                          className="materialize-textarea validate" aria-required="true"
                                                          required=""></textarea>
                                                            <label htmlFor="ccomment0">Your comment *</label>
                                                        </div>
                                                        <div className="col s12">
                                                            <p>Gender</p>
                                                            <p>
                                                                <label>
                                                                    <input className="validate" required=""
                                                                           aria-required="true"
                                                                           name="gender0" type="radio" checked=""/>
                                                                        <span>Male</span>
                                                                </label>
                                                            </p>

                                                            <label>
                                                                <input className="validate" required=""
                                                                       aria-required="true"
                                                                       name="gender0" type="radio"/>
                                                                    <span>Female</span>
                                                            </label>
                                                            <div className="input-field">
                                                            </div>
                                                        </div>
                                                        <div className="col s12">
                                                            <label htmlFor="tnc_select1">T&amp;C *</label>
                                                            <p>
                                                                <label>
                                                                    <input className="validate" required=""
                                                                           aria-required="true"
                                                                           id="tnc_select1" type="checkbox"/>
                                                                        <span>Please agree to our policies</span>
                                                                </label>
                                                            </p>
                                                            <div className="input-field">
                                                            </div>
                                                        </div>
                                                        <div className="input-field col s12">
                                                            <button className="btn waves-effect waves-light right"
                                                                    type="submit"
                                                                    name="action">Submit
                                                                <i className="material-icons right">send</i>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </form>
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
});

export default connect(mapStateToProps, mapDispatchToProps)(FormValidation)