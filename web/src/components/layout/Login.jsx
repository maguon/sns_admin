import React from 'react';
import {connect} from 'react-redux';
import {Field, reduxForm} from 'redux-form'

const loginAction = require('../../actions/layout/LoginAction');

const validate = (values) => {
    const errors = {};
    const requiredFields = [
        'userName',
        'password'
    ];
    requiredFields.forEach(field => {
        if (!values[field]) {
            errors[field] = '必填'
        }
    });
    return errors
};

const renderField = ({
    input,
    label,
    type,
    meta: {touched, error},
    id,
    icon
}) => {

    const labelClass = "validate " + (touched && error ? 'invalid' : '');
    return (
        <div className="input-field col s12">
            <i className={icon}/>
            <input id={id} {...input} type={type} className={labelClass} required/>
            <label htmlFor={id}>{label}</label>
            {(touched && (error && <span className="helper-text" data-error={error}/>))}
        </div>
    )
};

class Login extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }

    render() {
        const {handleSubmit, submitting, login} = this.props;
        return (
            <div className="row">
                <div className="col s12">
                    <div className="container">
                        <div id="login-page" className="row">
                            <div className="col s12 m6 l4 z-depth-4 card-panel border-radius-5 login-card bg-opacity-8">
                                <form onSubmit={handleSubmit(login)}>
                                    <div className="row">
                                        <div className="input-field col s12">
                                            <h5 className="ml-4">Sign in</h5>
                                        </div>
                                    </div>
                                    <div className="row margin">
                                        <div className="input-field col s12">
                                            <Field label="用户名" name="userName" type="text" id="userName" icon="mdi mdi-account prefix" component={renderField}/>
                                        </div>
                                    </div>
                                    <div className="row margin">
                                        <div className="input-field col s12">
                                            <Field label="密码" name="password" type="password" id="password"
                                                   icon="mdi mdi-lock prefix"
                                                   component={renderField}/>
                                        </div>
                                    </div>
                                    {/*<div className="row">*/}
                                    {/*    <div className="col s12 m12 l12 ml-2 mt-1">*/}
                                    {/*        <p>*/}
                                    {/*            <label>*/}
                                    {/*                <input type="checkbox"/>*/}
                                    {/*                <span>Remember Me</span>*/}
                                    {/*            </label>*/}
                                    {/*        </p>*/}
                                    {/*    </div>*/}
                                    {/*</div>*/}
                                    <div className="row">
                                        <div className="input-field col s12">
                                            <button type="submit" disabled={submitting} className="btn waves-effect waves-light cyan col s12 border-round">登陆</button>
                                            {/*<a ng-click="login()"*/}
                                            {/*   className="btn waves-effect waves-light border-round gradient-45deg-purple-deep-orange col s12">*/}
                                            {/*    Login*/}
                                            {/*</a>*/}
                                        </div>
                                    </div>
                                    {/*<div className="row">*/}
                                    {/*    <div className="input-field col s6 m6 l6">*/}
                                    {/*        <p className="margin medium-small"><Link to="/register">注册</Link></p>*/}
                                    {/*    </div>*/}
                                    {/*    <div className="input-field col s6 m6 l6">*/}
                                    {/*        <p className="margin right-align medium-small"><Link to="/reset">忘记密码</Link></p>*/}
                                    {/*    </div>*/}
                                    {/*</div>*/}
                                </form>
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
        initialValues: state.LoginReducer.data
    }
};

const mapDispatchToProps = (dispatch) => ({
    login: (values) => {
        dispatch(loginAction.login(values));
        //dispatch({type:loginActionType.loginInit,payload:values})
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(
    reduxForm({
            form: 'loginForm',
            validate
        }
    )(Login));

