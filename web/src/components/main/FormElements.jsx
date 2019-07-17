import React from 'react';
import {connect} from 'react-redux';
import {TextInput, DatePicker} from 'react-materialize';

const sysConst = require('../../utils/SysConst');
const formatUtil = require('../../utils/FormatUtil');

class FormElements extends React.Component {

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
        $('select').formSelect();
        $('.datepicker').datepicker();
        $('.timepicker').timepicker();
        $('input#input_text, textarea#textarea1').characterCounter();
        $('.fixed-action-btn').floatingActionButton();
    }

    render() {
        return (
            <div id="main" className="main-full">
                <div className="row">
                    <div className="breadcrumbs-inline pt-3 pb-1" id="breadcrumbs-wrapper">
                        {/* Search for small screen*/}
                        <div className="container">
                            <div className="row">
                                <div className="col s10 m6 l6 breadcrumbs-left">
                                    <h5 className="mt-0 mb-0 display-inline hide-on-small-and-down">Form Elements
                                        （1.4rem）</h5>
                                </div>
                                <div className="col s2 m6 l6"><a
                                    className="btn btn-floating dropdown-settings waves-effect waves-light breadcrumbs-btn right"

                                    data-target="dropdown1"><i className="material-icons">expand_more </i><i
                                    className="material-icons right">arrow_drop_down</i></a>
                                    <ul id='dropdown1' className='dropdown-content'>
                                        <li><a href="#!">one</a></li>
                                        <li><a href="#!">two</a></li>
                                        <li className="divider" tabIndex="-1"></li>
                                        <li><a href="#!">three</a></li>
                                        <li><a href="#!"><i className="material-icons">view_module</i>four</a></li>
                                        <li><a href="#!"><i className="material-icons">cloud</i>five</a></li>
                                    </ul>

                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col s12">
                        <div className="container">
                            <div className="card">
                                <div className="card-content">(15px)
                                    <p className="caption mb-0">Forms are the standard way to receive user inputted
                                        data. The
                                        transitions and smoothness
                                        of these elements are very important because of the inherent user interaction
                                        associated
                                        with forms.</p>
                                </div>
                            </div>

                            {/* Input Fields */}
                            <div className="row">
                                <div className="col s12">

                                    <div id="input-fields" className="card card-tabs">
                                        <div className="card-content">
                                            <div className="card-title">
                                                <div className="row">
                                                    <div className="col s12 m6 l10">
                                                        <h4 className="card-title">Input Fields (18px)</h4>
                                                    </div>
                                                    <div className="col s12 m6 l2">
                                                    </div>
                                                </div>
                                            </div>

                                            <div id="view-input-fields" className="active">
                                                <div className="row">
                                                    <div className="col s12"> (15px)
                                                        <p>Text fields allow user input. The border should light up
                                                            simply and
                                                            clearly indicating which field
                                                            the user is currently editing. You must have a <code
                                                                className=" language-markup">.input-field</code> div
                                                            wrapping your input and label. This helps our jQuery animate
                                                            the label.
                                                            This is only used in our
                                                            Input and Textarea form elements.</p>
                                                        <p>The validate class leverages HTML5 validation and will add
                                                            a <code
                                                                className=" language-markup">valid</code>
                                                            and <code className=" language-markup">invalid</code> class
                                                            accordingly. If
                                                            you don't want the Green and
                                                            Red validation states, just remove the <code
                                                                className=" language-markup">validate</code>
                                                            class from your
                                                            inputs.</p>
                                                        <br/>
                                                        <form className="row">
                                                            <div className="col s12">
                                                                <div className="input-field col s12">
                                                                    <input placeholder="Placeholder （输入内容 为16px）"
                                                                           id="first_name1"
                                                                           type="text" className="validate"/>
                                                                    <label htmlFor="first_name1"
                                                                           className="active">First Name</label>
                                                                </div>
                                                                <div className="input-field col s12">
                                                                    <input id="last_name" type="text"/>
                                                                    <label htmlFor="last_name">Last Name</label>
                                                                </div>
                                                            </div>
                                                            <div className="col s12">
                                                                <div className="input-field col s12">
                                                                    <input disabled="" value="I am not editable"
                                                                           id="disabled"
                                                                           type="text" className="validate"/>
                                                                    <label htmlFor="disabled"
                                                                           className="active">Disabled</label>
                                                                </div>
                                                            </div>
                                                            <div className="col s12">
                                                                <div className="input-field col s12">
                                                                    <input id="password" type="password"
                                                                           className="validate"/>
                                                                    <label htmlFor="password">Password</label>
                                                                </div>
                                                            </div>
                                                            <div className="col s12">
                                                                <div className="input-field col s12">
                                                                    <input id="email3" type="email"
                                                                           className="validate"/>
                                                                    <label htmlFor="email3">Email</label>
                                                                </div>
                                                            </div>
                                                            <div className="col s12">
                                                                <div className="col s12">
                                                                    This is an inline input field:
                                                                    <div className="input-field inline">
                                                                        <input id="email" type="email"
                                                                               className="validate"/>
                                                                        <label htmlFor="email"
                                                                               data-error="wrong"
                                                                               data-success="right">Email</label>
                                                                    </div>
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

                            {/* Prefilling Text Inputs */}
                            <div className="row">
                                <div className="col s12">
                                    <div id="prefilling-text" className="card card-tabs">
                                        <div className="card-content">
                                            <div className="card-title">
                                                <div className="row">
                                                    <div className="col s12 m6 l6">
                                                        <h4 className="card-title">Prefilling Text Inputs</h4>
                                                    </div>
                                                    <div className="col s12 m6 l6">
                                                    </div>
                                                </div>
                                            </div>
                                            <div id="view-prefilling-text" className="active">
                                                <div className="row">
                                                    <div className="col s12">
                                                        <p>If you are having trouble with the labels overlapping
                                                            prefilled content,
                                                            Try adding <code
                                                                className=" language-markup">class="active"</code>
                                                            to the label.
                                                            <br/>You can also call the function <code
                                                                className=" language-javascript">M<span
                                                                className="token punctuation">.</span><span
                                                                className="token function">updateTextFields</span><span
                                                                className="token punctuation">(</span><span
                                                                className="token punctuation">)</span><span
                                                                className="token punctuation">;</span></code>
                                                            to reinitialize all the Materialize labels on the page
                                                            if you are
                                                            dynamically adding inputs.</p>
                                                    </div>
                                                    <div className="col s12">
                                                        <div className="input-field col s6">
                                                            <div className="row">
                                                                <input value="Alvin" id="first_name2" type="text"
                                                                       className="validate"/>
                                                                <label className="active" htmlFor="first_name2">First
                                                                    Name</label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Icon Prefixes */}
                            <div className="row">
                                <div className="col s12">
                                    <div id="icon-prefixes" className="card card-tabs">
                                        <div className="card-content">
                                            <div className="card-title">
                                                <div className="row">
                                                    <div className="col s12 m6 l10">
                                                        <h4 className="card-title">Icon Prefixes</h4>
                                                    </div>
                                                    <div className="col s12 m6 l2">
                                                    </div>
                                                </div>
                                            </div>
                                            <div id="view-icon-prefixes" className="active">
                                                <p>You can add an icon prefix to make the form input label even more
                                                    clear. Just add
                                                    an icon with the class
                                                    <code className=" language-markup">prefix</code> before the input
                                                    and label.</p>
                                                <br/>
                                                <div className="row">
                                                    <form className="col s12">
                                                        <div className="row">
                                                            <div className="input-field col s6">
                                                                <i className="material-icons prefix">account_circle</i>
                                                                <input id="icon_prefix3" type="text"
                                                                       className="validate"/>
                                                                <label htmlFor="icon_prefix3">First Name</label>
                                                            </div>
                                                            <div className="input-field col s6">
                                                                <i className="material-icons prefix">phone</i>
                                                                <input id="icon_telephone" type="number"
                                                                       className="validate"/>
                                                                <label
                                                                    htmlFor="icon_telephone">Telephone</label>
                                                            </div>
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Custom Error or Success Messages */}
                            <div className="row">
                                <div className="col s12">
                                    <div id="custom-error" className="card card-tabs">
                                        <div className="card-content">
                                            <div className="card-title">
                                                <div className="row">
                                                    <div className="col s12 m6 l10">
                                                        <h4 className="card-title">Custom Error or Success Messages</h4>
                                                    </div>
                                                    <div className="col s12 m6 l2">
                                                    </div>
                                                </div>
                                            </div>
                                            <div id="view-custom-error" className="active">
                                                <p>You can add custom validation messages by adding either <code
                                                    className=" language-markup">data-error</code>
                                                    or <code className=" language-markup">data-success</code> attributes
                                                    to your input
                                                    field labels.</p>
                                                <br/>
                                                <div className="row">
                                                    <form className="col s12">
                                                        <div className="input-field col s12">
                                                            <input id="email4" type="email" className="validate"/>
                                                            <label htmlFor="email4" data-error="wrong"
                                                                   data-success="right">Email</label>
                                                            <span className="helper-text" data-error="wrong1111"
                                                                  data-success="right2222"></span>
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Textarea */}
                            <div className="row">
                                <div className="col s12">
                                    <div id="textarea" className="card card-tabs">
                                        <div className="card-content">
                                            <div className="card-title">
                                                <div className="row">
                                                    <div className="col s12 m6 l6">
                                                        <h4 className="card-title">Textarea</h4>
                                                    </div>
                                                    <div className="col s12 m6 l6">
                                                    </div>
                                                </div>
                                            </div>
                                            <div id="view-textarea" className="active">
                                                <p>Textareas allow larger expandable user input. The border should light
                                                    up simply
                                                    and clearly indicating
                                                    which field the user is currently editing. You must have a <code
                                                        className=" language-markup">.input-field</code>
                                                    div wrapping your input and label. This helps our jQuery animate the
                                                    label. This
                                                    is only used in our
                                                    Input and Textarea form elements.</p>
                                                <p>
                                                    <strong>Textareas will auto resize to the text inside.</strong>
                                                </p>
                                                <div className="row">
                                                    <form className="col s12">
                                                        <div className="row">
                                                            <div className="input-field col s12">
                                                                <textarea id="textarea2"
                                                                          className="materialize-textarea"></textarea>
                                                                <label htmlFor="textarea2">Textarea</label>
                                                            </div>
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Select */}
                            <div className="row">
                                <div className="col s12">
                                    <div id="select" className="card card-tabs">
                                        <div className="card-content">
                                            <div className="card-title">
                                                <div className="row">
                                                    <div className="col s12 m6 l10">
                                                        <h4 className="card-title">Select</h4>
                                                    </div>
                                                    <div className="col s12 m6 l2">
                                                    </div>
                                                </div>
                                            </div>
                                            <div id="view-select" className="active">
                                                <p> Select allows user input through specified options. Make sure you
                                                    wrap it in a
                                                    <code className=" language-markup">.input-field</code>
                                                    for proper alignment with other text fields. Remember that this is a
                                                    jQuery
                                                    plugin so make sure you
                                                    <a href="https://pixinvent.com/materialize-material-design-admin-template/html/ltr/vertical-menu-nav-dark-template/form-elements.html#select-initialization">initialize</a>
                                                    this in your document ready. </p>
                                                <div className="row">
                                                    <div className="input-field col s12">
                                                        <select>
                                                            <option value="" disabled selected>Choose your option
                                                            </option>
                                                            <option value="1">Option 1</option>
                                                            <option value="2">Option 2</option>
                                                            <option value="3">Option 3</option>
                                                        </select>
                                                        <label>Materialize Select</label>
                                                    </div>

                                                    <div className="input-field col s12">
                                                        <select multiple>
                                                            <option value="" disabled selected>Choose your option
                                                            </option>
                                                            <option value="1">Option 1</option>
                                                            <option value="2">Option 2</option>
                                                            <option value="3">Option 3</option>
                                                        </select>
                                                        <label>Materialize Multiple Select</label>
                                                    </div>

                                                    <div className="input-field col s12">
                                                        <select>
                                                            <optgroup label="team 1">
                                                                <option value="1">Option 1</option>
                                                                <option value="2">Option 2</option>
                                                            </optgroup>
                                                            <optgroup label="team 2">
                                                                <option value="3">Option 3</option>
                                                                <option value="4">Option 4</option>
                                                            </optgroup>
                                                        </select>
                                                        <label>Optgroups</label>
                                                    </div>

                                                    <div className="input-field col s12 m6">
                                                        <select className="icons">
                                                            <option value="" disabled selected>Choose your option
                                                            </option>
                                                            <option value=""
                                                                    data-icon="../../assets/images/avatar.jpeg">example
                                                                1
                                                            </option>
                                                            <option value=""
                                                                    data-icon="../../assets/images/avatar.jpeg">example
                                                                2
                                                            </option>
                                                            <option value=""
                                                                    data-icon="../../assets/images/avatar.jpeg">example
                                                                3
                                                            </option>
                                                        </select>
                                                        <label>Images in select</label>
                                                    </div>
                                                    <div className="input-field col s12 m6">
                                                        <select className="icons">
                                                            <option value="" disabled selected>Choose your option
                                                            </option>
                                                            <option value="" data-icon="../../assets/images/avatar.jpeg"
                                                                    className="left">example 1
                                                            </option>
                                                            <option value="" data-icon="../../assets/images/avatar.jpeg"
                                                                    className="left">example 2
                                                            </option>
                                                            <option value="" data-icon="../../assets/images/avatar.jpeg"
                                                                    className="left">example 3
                                                            </option>
                                                        </select>
                                                        <label>Images in select</label>
                                                    </div>

                                                    <label>Browser Select</label>
                                                    <select className="browser-default">
                                                        <option value="" disabled selected>Choose your option</option>
                                                        <option value="1">Option 1</option>
                                                        <option value="2">Option 2</option>
                                                        <option value="3">Option 3</option>
                                                    </select>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Disabled Styles */}
                            <div className="row">
                                <div className="col s12">
                                    <div id="disabled-styles" className="card card-tabs">
                                        <div className="card-content">
                                            <div className="card-title">
                                                <div className="row">
                                                    <div className="col s12 m6 l10">
                                                        <h4 className="card-title">Disabled Styles</h4>
                                                    </div>
                                                    <div className="col s12 m6 l2">
                                                    </div>
                                                </div>
                                            </div>
                                            <div id="view-disabled-styles" className="active">
                                                <p>You can also add <code
                                                    className=" language-markup">disabled</code> to the select
                                                    element to make the whole
                                                    thing disabled. Or if you add <code
                                                        className=" language-markup">disabled</code> to
                                                    the options, the
                                                    individual options will be unselectable. </p>
                                                <form className="col s12 m6">
                                                    <div className="input-field">
                                                        <select disabled>
                                                            <option value="" disabled selected>Choose your option
                                                            </option>
                                                            <option value="1">Option 1</option>
                                                            <option value="2">Option 2</option>
                                                            <option value="3">Option 3</option>
                                                        </select>
                                                        <label>Materialize Disabled</label>
                                                    </div>

                                                    <label>Browser Disabled</label>
                                                    <select className="browser-default" disabled>
                                                        <option value="" disabled selected>Choose your option</option>
                                                        <option value="1">Option 1</option>
                                                        <option value="2">Option 2</option>
                                                        <option value="3">Option 3</option>
                                                    </select>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Radio Buttons */}
                            <div className="row">
                                <div className="col s12">
                                    <div id="radio-buttons" className="card card-tabs">
                                        <div className="card-content">
                                            <div className="card-title">
                                                <div className="row">
                                                    <div className="col s12 m6 l10">
                                                        <h4 className="card-title">Radio Buttons</h4>
                                                    </div>
                                                    <div className="col s12 m6 l2">
                                                    </div>
                                                </div>
                                            </div>
                                            <div id="view-radio-buttons" className="active">
                                                <p>Radio Buttons are used when the user must make only one selection out
                                                    of a group
                                                    of items. The
                                                    <code className=" language-markup">for</code> attribute is necessary
                                                    to bind our
                                                    custom radio button with the
                                                    input. Add the input's <code
                                                        className=" language-markup">id</code> as the value of
                                                    the <code className=" language-markup">for</code>
                                                    attribute of the label.</p>
                                                <p>Add radio buttons to a group by adding the name attribute along with
                                                    the same
                                                    corresponding value for
                                                    each of the radio buttons in the group. Create disabled radio
                                                    buttons by adding
                                                    the disabled attribute as
                                                    shown below.</p>
                                                <form
                                                    action="https://pixinvent.com/materialize-material-design-admin-template/html/ltr/vertical-menu-nav-dark-template/form-elements.html#">
                                                    <p>
                                                        <label>
                                                            <input name="group1" type="radio" checked=""/>
                                                            <span>Radio-1</span>
                                                        </label>
                                                    </p>
                                                    <p>
                                                        <label>
                                                            <input name="group1" type="radio"/>
                                                            <span>Radio-2 </span>
                                                        </label>
                                                    </p>
                                                    <p>
                                                        <label>
                                                            <input className="with-gap" name="group1" type="radio"/>
                                                            <span>Radio-3</span>
                                                        </label>
                                                    </p>
                                                    <p>
                                                        <label>
                                                            <input name="group1" type="radio" disabled="disabled"/>
                                                            <span>Disabled Radio</span>
                                                        </label>
                                                    </p>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Checkboxes */}
                            <div className="row">
                                <div className="col s12">
                                    <div id="checkboxes" className="card card-tabs">
                                        <div className="card-content">
                                            <div className="card-title">
                                                <div className="row">
                                                    <div className="col s12 m6 l10">
                                                        <h4 className="card-title">Checkboxes</h4>
                                                    </div>
                                                    <div className="col s12 m6 l2">
                                                    </div>
                                                </div>
                                            </div>
                                            <div id="view-checkboxes" className="active">
                                                <p>Use checkboxes when looking for yes or no answers. The <code
                                                    className=" language-markup">for</code>
                                                    attribute is necessary to bind our custom checkbox with the input.
                                                    Add the
                                                    input's <code className=" language-markup">id</code>
                                                    as the value of the <code
                                                        className=" language-markup">for</code> attribute of the
                                                    label. </p>
                                                <form
                                                    action="https://pixinvent.com/materialize-material-design-admin-template/html/ltr/vertical-menu-nav-dark-template/form-elements.html#">
                                                    <p>
                                                        <label>
                                                            <input type="checkbox"/>
                                                            <span>Checkbox-1</span>
                                                        </label>
                                                    </p>
                                                    <p>
                                                        <label>
                                                            <input type="checkbox" checked="checked"/>
                                                            <span>Checkbox-2</span>
                                                        </label>
                                                    </p>
                                                    <p>
                                                        <label>
                                                            <input type="checkbox" className="filled-in"
                                                                   checked="checked"/>
                                                            <span>Filled in</span>
                                                        </label>
                                                    </p>
                                                    <p>
                                                        <label>
                                                            <input id="indeterminate-checkbox" type="checkbox"/>
                                                            <span>Indeterminate Style</span>
                                                        </label>
                                                    </p>
                                                    <p>
                                                        <label>
                                                            <input type="checkbox" checked="checked"
                                                                   disabled="disabled"/>
                                                            <span>Checkbox-3</span>
                                                        </label>
                                                    </p>
                                                    <p>
                                                        <label>
                                                            <input type="checkbox" disabled="disabled"/>
                                                            <span>Disabled Radio</span>
                                                        </label>
                                                    </p>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Switches */}
                            <div className="row">
                                <div className="col s12">
                                    <div id="switches" className="card card-tabs">
                                        <div className="card-content">
                                            <div className="card-title">
                                                <div className="row">
                                                    <div className="col s12 m6 l10">
                                                        <h4 className="card-title">Switches</h4>
                                                    </div>
                                                    <div className="col s12 m6 l2">
                                                    </div>
                                                </div>
                                            </div>
                                            <div id="view-switches" className="active">
                                                <p>Use checkboxes when looking for yes or no answers. The <code
                                                    className=" language-markup">for</code>
                                                    attribute is necessary to bind our custom checkbox with the input.
                                                    Add the
                                                    input's <code className=" language-markup">id</code>
                                                    as the value of the <code
                                                        className=" language-markup">for</code> attribute of the
                                                    label. </p>
                                                <form
                                                    action="https://pixinvent.com/materialize-material-design-admin-template/html/ltr/vertical-menu-nav-dark-template/form-elements.html#">
                                                    <div className="switch">
                                                        <label>
                                                            Off
                                                            <input checked="" type="checkbox"/>
                                                            <span className="lever"></span>
                                                            On
                                                        </label>
                                                    </div>
                                                    <div className="switch">
                                                        <label>
                                                            Off
                                                            <input disabled="" type="checkbox"/>
                                                            <span className="lever"></span>
                                                            On
                                                        </label>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/*File Input*/}
                            <div className="row">
                                <div className="col s12">
                                    <div id="file-input" className="card card-tabs">
                                        <div className="card-content">
                                            <div className="card-title">
                                                <div className="row">
                                                    <div className="col s12 m6 l10">
                                                        <h4 className="card-title">File Input</h4>
                                                    </div>
                                                    <div className="col s12 m6 l2">
                                                    </div>
                                                </div>
                                            </div>
                                            <div id="view-file-input" className="active">
                                                <p>If you want to style an input button with a path input we provide
                                                    this
                                                    structure.</p>
                                                <form
                                                    action="https://pixinvent.com/materialize-material-design-admin-template/html/ltr/vertical-menu-nav-dark-template/form-elements.html#">
                                                    <div className="file-field input-field">
                                                        <div className="btn">
                                                            <span>File</span>
                                                            <input type="file"/>
                                                        </div>
                                                        <div className="file-path-wrapper">
                                                            <input className="file-path validate" type="text"/>
                                                        </div>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/*Multiple File Input*/}
                            <div className="row">
                                <div className="col s12">
                                    <div id="multiple-file-input" className="card card-tabs">
                                        <div className="card-content">
                                            <div className="card-title">
                                                <div className="row">
                                                    <div className="col s12 m6 l10">
                                                        <h4 className="card-title">Multiple File Input</h4>
                                                    </div>
                                                    <div className="col s12 m6 l2">
                                                    </div>
                                                </div>
                                            </div>
                                            <div id="view-multiple-file-input" className="active">
                                                <p>You can also use the <code
                                                    className=" language-markup">multiple</code> attribute to
                                                    allow multiple file
                                                    uploads. </p>
                                                <form
                                                    action="https://pixinvent.com/materialize-material-design-admin-template/html/ltr/vertical-menu-nav-dark-template/form-elements.html#">
                                                    <div className="file-field input-field">
                                                        <div className="btn">
                                                            <span>File</span>
                                                            <input type="file" multiple=""/>
                                                        </div>
                                                        <div className="file-path-wrapper">
                                                            <input className="file-path validate" type="text"
                                                                   placeholder="Upload one or more files"/>
                                                        </div>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Date Picker */}
                            <div className="row">
                                <div className="col s12">
                                    <div id="date-picker" className="card card-tabs">
                                        <div className="card-content">
                                            <div className="card-title">
                                                <div className="row">
                                                    <div className="col s12 m6 l6">
                                                        <h4 className="card-title">Date Picker</h4>
                                                    </div>
                                                    <div className="col s12 m6 l6">
                                                    </div>
                                                </div>
                                            </div>
                                            <br/>
                                            <div id="view-date-picker" className="row active">
                                                <p>We use a modified version of pickadate.js to create a materialized
                                                    date picker.
                                                    Test it out below! </p>

                                                <div className="input-field col s10 custom-input-field">
                                                    <DatePicker s={12} label="推荐时间(始)" options={sysConst.DATE_PICKER_OPTION} />
                                                    <span className="mdi data-clear-icon mdi-window-close" />
                                                    <span className="mdi data-icon mdi-table-large"/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/*/!* Time Picker *!/*/}
                            {/*<div className="row">*/}
                            {/*    <div className="col s12">*/}
                            {/*        <div id="time-picker" className="card card-tabs">*/}
                            {/*            <div className="card-content">*/}
                            {/*                <div className="card-title">*/}
                            {/*                    <div className="row">*/}
                            {/*                        <div className="col s12 m6 l6">*/}
                            {/*                            <h4 className="card-title">Time Picker</h4>*/}
                            {/*                        </div>*/}
                            {/*                        <div className="col s12 m6 l6">*/}

                            {/*                        </div>*/}
                            {/*                    </div>*/}
                            {/*                </div>*/}
                            {/*                <div id="view-time-picker" className="active">*/}
                            {/*                    <p>We use a modified version of pickatime.js to create a materialized*/}
                            {/*                        time picker.*/}
                            {/*                        Test it out below! </p>*/}
                            {/*                    <label htmlFor="lunch-time">Lunch Time</label>*/}
                            {/*                    <div className="modal timepicker-modal"*/}
                            {/*                         id="modal-35b93db5-465d-9aef-83fa-3bc9eb7d6dd2"*/}
                            {/*                         tabIndex="0">*/}
                            {/*                        <div className="modal-content timepicker-container">*/}
                            {/*                            <div className="timepicker-digital-display">*/}
                            {/*                                <div className="timepicker-text-container">*/}
                            {/*                                    <div className="timepicker-display-column"><span*/}
                            {/*                                        className="timepicker-span-hours text-primary"></span>:<span*/}
                            {/*                                        className="timepicker-span-minutes"></span></div>*/}
                            {/*                                    <div*/}
                            {/*                                        className="timepicker-display-column timepicker-display-am-pm">*/}
                            {/*                                        <div className="timepicker-span-am-pm">*/}
                            {/*                                            <div className="am-btn">AM</div>*/}
                            {/*                                            <div className="pm-btn">PM</div>*/}
                            {/*                                        </div>*/}
                            {/*                                    </div>*/}
                            {/*                                </div>*/}
                            {/*                            </div>*/}
                            {/*                            <div className="timepicker-analog-display">*/}
                            {/*                                <div className="timepicker-plate">*/}
                            {/*                                    <div className="timepicker-canvas">*/}
                            {/*                                        <svg className="timepicker-svg" width="270"*/}
                            {/*                                             height="270">*/}
                            {/*                                            <g transform="translate(135,135)">*/}
                            {/*                                                <line x1="0" y1="0"></line>*/}
                            {/*                                                <circle className="timepicker-canvas-bg"*/}
                            {/*                                                        r="20"></circle>*/}
                            {/*                                                <circle*/}
                            {/*                                                    className="timepicker-canvas-bearing"*/}
                            {/*                                                    cx="0" cy="0"*/}
                            {/*                                                    r="4"></circle>*/}
                            {/*                                            </g>*/}
                            {/*                                        </svg>*/}
                            {/*                                    </div>*/}
                            {/*                                    <div className="timepicker-dial timepicker-hours">*/}
                            {/*                                        <div className="timepicker-tick"*/}
                            {/*                                             style="left: 167.5px; top: 24.0673px;">1*/}
                            {/*                                        </div>*/}
                            {/*                                        <div className="timepicker-tick"*/}
                            {/*                                             style="left: 205.933px; top: 62.5px;">2*/}
                            {/*                                        </div>*/}
                            {/*                                        <div className="timepicker-tick"*/}
                            {/*                                             style="left: 220px; top: 115px;">*/}
                            {/*                                            3*/}
                            {/*                                        </div>*/}
                            {/*                                        <div className="timepicker-tick"*/}
                            {/*                                             style="left: 205.933px; top: 167.5px;">4*/}
                            {/*                                        </div>*/}
                            {/*                                        <div className="timepicker-tick"*/}
                            {/*                                             style="left: 167.5px; top: 205.933px;">5*/}
                            {/*                                        </div>*/}
                            {/*                                        <div className="timepicker-tick"*/}
                            {/*                                             style="left: 115px; top: 220px;">*/}
                            {/*                                            6*/}
                            {/*                                        </div>*/}
                            {/*                                        <div className="timepicker-tick"*/}
                            {/*                                             style="left: 62.5px; top: 205.933px;">7*/}
                            {/*                                        </div>*/}
                            {/*                                        <div className="timepicker-tick"*/}
                            {/*                                             style="left: 24.0673px; top: 167.5px;">8*/}
                            {/*                                        </div>*/}
                            {/*                                        <div className="timepicker-tick"*/}
                            {/*                                             style="left: 10px; top: 115px;">9*/}
                            {/*                                        </div>*/}
                            {/*                                        <div className="timepicker-tick"*/}
                            {/*                                             style="left: 24.0673px; top: 62.5px;">10*/}
                            {/*                                        </div>*/}
                            {/*                                        <div className="timepicker-tick"*/}
                            {/*                                             style="left: 62.5px; top: 24.0673px;">11*/}
                            {/*                                        </div>*/}
                            {/*                                        <div className="timepicker-tick"*/}
                            {/*                                             style="left: 115px; top: 10px;">*/}
                            {/*                                            12*/}
                            {/*                                        </div>*/}
                            {/*                                    </div>*/}
                            {/*                                    <div*/}
                            {/*                                        className="timepicker-dial timepicker-minutes timepicker-dial-out">*/}
                            {/*                                        <div className="timepicker-tick"*/}
                            {/*                                             style="left: 115px; top: 10px;">*/}
                            {/*                                            00*/}
                            {/*                                        </div>*/}
                            {/*                                        <div className="timepicker-tick"*/}
                            {/*                                             style="left: 167.5px; top: 24.0673px;">05*/}
                            {/*                                        </div>*/}
                            {/*                                        <div className="timepicker-tick"*/}
                            {/*                                             style="left: 205.933px; top: 62.5px;">10*/}
                            {/*                                        </div>*/}
                            {/*                                        <div className="timepicker-tick"*/}
                            {/*                                             style="left: 220px; top: 115px;">*/}
                            {/*                                            15*/}
                            {/*                                        </div>*/}
                            {/*                                        <div className="timepicker-tick"*/}
                            {/*                                             style="left: 205.933px; top: 167.5px;">20*/}
                            {/*                                        </div>*/}
                            {/*                                        <div className="timepicker-tick"*/}
                            {/*                                             style="left: 167.5px; top: 205.933px;">25*/}
                            {/*                                        </div>*/}
                            {/*                                        <div className="timepicker-tick"*/}
                            {/*                                             style="left: 115px; top: 220px;">*/}
                            {/*                                            30*/}
                            {/*                                        </div>*/}
                            {/*                                        <div className="timepicker-tick"*/}
                            {/*                                             style="left: 62.5px; top: 205.933px;">35*/}
                            {/*                                        </div>*/}
                            {/*                                        <div className="timepicker-tick"*/}
                            {/*                                             style="left: 24.0673px; top: 167.5px;">40*/}
                            {/*                                        </div>*/}
                            {/*                                        <div className="timepicker-tick"*/}
                            {/*                                             style="left: 10px; top: 115px;">*/}
                            {/*                                            45*/}
                            {/*                                        </div>*/}
                            {/*                                        <div className="timepicker-tick"*/}
                            {/*                                             style="left: 24.0673px; top: 62.5px;">50*/}
                            {/*                                        </div>*/}
                            {/*                                        <div className="timepicker-tick"*/}
                            {/*                                             style="left: 62.5px; top: 24.0673px;">55*/}
                            {/*                                        </div>*/}
                            {/*                                    </div>*/}
                            {/*                                </div>*/}
                            {/*                                <div className="timepicker-footer">*/}
                            {/*                                    <button*/}
                            {/*                                        className="btn-flat timepicker-clear waves-effect"*/}
                            {/*                                        style="visibility: hidden;" type="button"*/}
                            {/*                                        tabIndex="3">Clear*/}
                            {/*                                    </button>*/}
                            {/*                                    <div className="confirmation-btns">*/}
                            {/*                                        <button*/}
                            {/*                                            className="btn-flat timepicker-close waves-effect"*/}
                            {/*                                            type="button" tabIndex="3">Cancel*/}
                            {/*                                        </button>*/}
                            {/*                                        <button*/}
                            {/*                                            className="btn-flat timepicker-close waves-effect"*/}
                            {/*                                            type="button" tabIndex="3">Ok*/}
                            {/*                                        </button>*/}
                            {/*                                    </div>*/}
                            {/*                                </div>*/}
                            {/*                            </div>*/}
                            {/*                        </div>*/}
                            {/*                    </div>*/}
                            {/*                    <input type="text" className="timepicker" id="lunch-time"/>*/}
                            {/*                </div>*/}
                            {/*            </div>*/}
                            {/*        </div>*/}
                            {/*    </div>*/}
                            {/*</div>*/}

                            {/*/!* Auto Complete *!/*/}
                            <div className="row">
                                <div className="col s12">
                                    <div id="autoComplete" className="card card-tabs">
                                        <div className="card-content">
                                            <div className="card-title">
                                                <div className="row">
                                                    <div className="col s12 m6 l6">
                                                        <h4>Auto Complete</h4>
                                                    </div>
                                                    <div className="col s12 m6 l6">
                                                    </div>
                                                </div>
                                            </div>
                                            <div id="view-autocomplete" className="active">
                                                <div className="row">
                                                    <div className="col s12">
                                                        <div className="row">
                                                            <div className="input-field col s12">
                                                                <i className="material-icons prefix">textsms</i>
                                                                <input type="text" id="autocomplete-input"
                                                                       className="autocomplete"
                                                                       data-target="autocomplete-options-4da7ed18-b274-d60c-9c9a-b3e670dd06b1"/>
                                                                <ul id="autocomplete-options-4da7ed18-b274-d60c-9c9a-b3e670dd06b1"
                                                                    className="autocomplete-content dropdown-content"
                                                                    tabIndex="0"></ul>
                                                                <label
                                                                    htmlFor="autocomplete-input">Autocomplete</label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/*/!* Character counter *!/*/}
                            {/*<div className="row">*/}
                            {/*    <div className="col s12">*/}
                            {/*        <div id="autoComplete" className="card card-tabs">*/}
                            {/*            <div className="card-content">*/}
                            {/*                <div className="card-title">*/}
                            {/*                    <div className="row">*/}
                            {/*                        <div className="col s12 m6 l6">*/}
                            {/*                            <h4>Character Counter</h4>*/}
                            {/*                        </div>*/}
                            {/*                        <div className="col s12 m6 l6">*/}
                            {/*                        </div>*/}
                            {/*                    </div>*/}
                            {/*                </div>*/}
                            {/*                <div id="view-counter" className="active">*/}
                            {/*                    <div className="row">*/}
                            {/*                        <div className="col s12">*/}
                            {/*                            <div className="row">*/}
                            {/*                                <form className="col s12">*/}
                            {/*                                    <div className="row">*/}
                            {/*                                        <div className="input-field col s12">*/}
                            {/*                                            <input id="input_text" type="text"*/}
                            {/*                                                   data-length="10"/>*/}
                            {/*                                            <label htmlFor="input_text">Input*/}
                            {/*                                                text</label>*/}
                            {/*                                            <span className="character-counter"*/}
                            {/*                                                  style="float: right; font-size: 12px;"></span>*/}
                            {/*                                        </div>*/}
                            {/*                                    </div>*/}
                            {/*                                    <div className="row">*/}
                            {/*                                        <div className="input-field col s12">*/}
                            {/*                                <textarea id="textarea1" className="materialize-textarea"*/}
                            {/*                                          data-length="120"></textarea>*/}
                            {/*                                            <label htmlFor="textarea1">Textarea</label>*/}
                            {/*                                            <span className="character-counter"*/}
                            {/*                                                  style="float: right; font-size: 12px;"></span>*/}
                            {/*                                        </div>*/}
                            {/*                                    </div>*/}
                            {/*                                </form>*/}
                            {/*                            </div>*/}

                            {/*                        </div>*/}
                            {/*                    </div>*/}
                            {/*                </div>*/}
                            {/*            </div>*/}
                            {/*        </div>*/}
                            {/*    </div>*/}
                            {/*</div>*/}
                            {/*/!* START RIGHT SIDEBAR NAV *!/*/}
                            {/*<div style="bottom: 50px; right: 19px;" className="fixed-action-btn direction-top"><a*/}
                            {/*    className="btn-floating btn-large gradient-45deg-light-blue-cyan gradient-shadow"><i*/}
                            {/*    className="material-icons">add</i></a>*/}
                            {/*    <ul>*/}
                            {/*        <li><a href="#!" className="btn-floating blue"><i*/}
                            {/*            className="material-icons">help_outline</i></a></li>*/}
                            {/*        <li><a href="#!" className="btn-floating green"><i*/}
                            {/*            className="material-icons">widgets</i></a></li>*/}
                            {/*        <li><a href="#!" className="btn-floating amber"><i*/}
                            {/*            className="material-icons">today</i></a></li>*/}
                            {/*        <li><a href="#!" className="btn-floating red"><i*/}
                            {/*            className="material-icons">mail_outline</i></a></li>*/}
                            {/*    </ul>*/}
                            {/*</div>*/}
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

export default connect(mapStateToProps, mapDispatchToProps)(FormElements)