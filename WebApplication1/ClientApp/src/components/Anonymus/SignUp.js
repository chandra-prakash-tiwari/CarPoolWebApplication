"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var TextField_1 = require("@material-ui/core/TextField");
var Link_1 = require("@material-ui/core/Link");
var Grid_1 = require("@material-ui/core/Grid");
var Typography_1 = require("@material-ui/core/Typography");
var UserService_1 = require("../../Services/UserService");
require("../../css/sign-up-form.css");
var Visibility_1 = require("@material-ui/icons/Visibility");
var core_1 = require("@material-ui/core");
var VisibilityOff_1 = require("@material-ui/icons/VisibilityOff");
var User_1 = require("../../Classes/DataClasses/User");
var User_2 = require("../../Classes/MetaClasses/User");
var SignUpProps = /** @class */ (function () {
    function SignUpProps() {
        this.user = new User_1.User();
        this.meta = new User_2.SignUpMeta();
    }
    return SignUpProps;
}());
exports.SignUpProps = SignUpProps;
var SignUp = /** @class */ (function (_super) {
    __extends(SignUp, _super);
    function SignUp(props) {
        var _this = _super.call(this, props) || this;
        _this.onChanges = function (event) {
            var _a;
            _this.setState(__assign(__assign({}, _this.state), { user: __assign(__assign({}, _this.state.user), (_a = {}, _a[event.target.name] = event.target.value, _a)) }));
        };
        _this.onSpanChanges = function () {
            _this.setState({ meta: __assign(__assign({}, _this.state.meta), { spanDisplay: '' }) });
        };
        _this.onSubmit = function (event) {
            event.preventDefault();
            _this.onSpanChanges();
            var isValid = _this.isValidName(_this.state.user.name);
            isValid = isValid && _this.isValidMobileNumber(_this.state.user.mobile);
            isValid = isValid && _this.isValidUserName(_this.state.user.userName);
            isValid = isValid && _this.isValidPassword(_this.state.user.password);
            isValid = isValid && _this.isEqualPassword(_this.state.user.password);
            isValid = isValid && _this.isValidEmail(_this.state.user.email);
            isValid = isValid && _this.isValidDrivingLicence(_this.state.user.drivingLicence);
            isValid = isValid && _this.isValidAddress(_this.state.user.address);
            if (!isValid) {
                UserService_1.default.addNewUser(_this.state.user).then(function (response) {
                    if (response == 'Ok')
                        window.location.pathname = '/login';
                    else if (response == 'Reject') {
                    }
                });
            }
        };
        _this.state = new SignUpProps();
        return _this;
    }
    SignUp.prototype.isEmpty = function (value) {
        return !value || (value && value.trim().length === 0);
    };
    SignUp.prototype.isValid = function (value, regex) {
        return !value.match(regex);
    };
    SignUp.prototype.hasUserName = function (value) {
        return UserService_1.default.validUserName(value).then(function (valid) { return valid; });
    };
    SignUp.prototype.hasEmail = function (value) {
        return UserService_1.default.validEmail(value).then(function (valid) { return valid; });
    };
    SignUp.prototype.isValidName = function (value) {
        var emptyStatus = this.isEmpty(value);
        var isValid = this.isValid(value, /^[a-zA-Z ]*$/);
        this.setState({ meta: __assign(__assign({}, this.state.meta), { nameError: emptyStatus ? "Please enter name" : (isValid ? "Please enter correct name" : "") }) });
        return emptyStatus && isValid;
    };
    SignUp.prototype.isValidEmail = function (value) {
        var emptyStatus = this.isEmpty(value);
        var isValid = this.isValid(value, /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
        this.setState({ meta: __assign(__assign({}, this.state.meta), { emailError: emptyStatus ? "Please enter email" : (isValid ? "Please enter correct email" : "") }) });
        return emptyStatus && isValid;
    };
    SignUp.prototype.isValidMobileNumber = function (value) {
        var emptyStatus = this.isEmpty(value);
        var validStatus = this.isValid(value, /^[6789]\d{9}$/);
        this.setState({ meta: __assign(__assign({}, this.state.meta), { mobileError: emptyStatus ? "Please enter mobile number" : (validStatus ? "Enter correct mobile number" : "") }) });
        return emptyStatus && validStatus;
    };
    SignUp.prototype.isValidPassword = function (value) {
        var emptyStatus = this.isEmpty(value);
        var validStatus = this.isValid(value, /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/);
        this.setState({ meta: __assign(__assign({}, this.state.meta), { passwordError: emptyStatus ? "Please enter password" : (validStatus ? "Password contain 8-15 character and atleast one numberic, upper alphabet, lower alphabet and special character" : "") }) });
        return emptyStatus && validStatus;
    };
    SignUp.prototype.isValidUserName = function (value) {
        var emptyStatus = this.isEmpty(value);
        var isAvailable = this.hasUserName(value);
        this.setState({ meta: __assign(__assign({}, this.state.meta), { userNameError: emptyStatus ? "Please enter username" : (!isAvailable ? "taken by someone" : "") }) });
        return emptyStatus;
    };
    SignUp.prototype.isEqualPassword = function (value) {
        var emptyStatus = this.isEmpty(value);
        var validStatus = (value == this.state.user.password);
        this.setState({ meta: __assign(__assign({}, this.state.meta), { passwordError: emptyStatus ? "Please re enter your password" : (validStatus ? "password can not matched" : "") }) });
        return emptyStatus && validStatus;
    };
    SignUp.prototype.isValidDrivingLicence = function (value) {
        var emptyStatus = this.isEmpty(value);
        var validStatus = this.isValid(value, /^[0-9a-zA-Z]{4,9}$/);
        this.setState({ meta: __assign(__assign({}, this.state.meta), { drivingLicenceError: emptyStatus ? "Please enter driving licence" : (validStatus ? "Driving licence is not correct" : "") }) });
        return emptyStatus && validStatus;
    };
    SignUp.prototype.isValidAddress = function (value) {
        var emptyStatus = this.isEmpty(value);
        this.setState({ meta: __assign(__assign({}, this.state.meta), { addressError: emptyStatus ? "Please enter address" : "" }) });
        return emptyStatus;
    };
    SignUp.prototype.render = function () {
        var _this = this;
        return (React.createElement(Grid_1.default, { item: true, xs: 12, sm: 8, md: 4 },
            React.createElement("div", { className: 'signup' },
                React.createElement("div", { className: 'header' },
                    React.createElement(Typography_1.default, { className: 'head', component: "h1", variant: "h5" }, "Sign Up"),
                    React.createElement("div", { className: 'header-underline' })),
                React.createElement("form", { className: "form" },
                    React.createElement(core_1.Tooltip, { title: this.state.meta.nameError, placement: 'bottom' },
                        React.createElement(TextField_1.default, { className: 'input', variant: "filled", onChange: function (event) { _this.onChanges(event); _this.isValidName(event.target.value); }, value: this.state.user.name, label: "Name", name: "name", autoFocus: true })),
                    React.createElement("span", { style: { display: this.state.meta.spanDisplay } }, this.state.meta.nameError),
                    React.createElement(core_1.Tooltip, { title: this.state.meta.mobileError, placement: 'bottom' },
                        React.createElement(TextField_1.default, { className: 'input', variant: "filled", onChange: function (event) { _this.onChanges(event); _this.isValidMobileNumber(event.target.value); }, value: this.state.user.mobile, label: "Mobile", name: "mobile" })),
                    React.createElement("span", { style: { display: this.state.meta.spanDisplay } }, this.state.meta.mobileError),
                    React.createElement(core_1.Tooltip, { title: this.state.meta.userNameError, placement: 'bottom' },
                        React.createElement(TextField_1.default, { className: 'input', variant: "filled", onChange: function (event) { _this.onChanges(event); _this.isValidUserName(event.target.value); }, value: this.state.user.userName, label: "UserName", name: "userName" })),
                    React.createElement("span", { style: { display: this.state.meta.spanDisplay } }, this.state.meta.userNameError),
                    React.createElement(core_1.Tooltip, { title: this.state.meta.addressError, placement: 'bottom' },
                        React.createElement(TextField_1.default, { className: 'input', variant: "filled", onChange: function (event) { _this.onChanges(event); _this.isValidAddress(event.target.value); }, value: this.state.user.address, label: "Address", name: "address" })),
                    React.createElement("span", { style: { display: this.state.meta.spanDisplay } }, this.state.meta.addressError),
                    React.createElement(core_1.Tooltip, { title: this.state.meta.drivingLicenceError, placement: 'bottom' },
                        React.createElement(TextField_1.default, { className: 'input', variant: "filled", onChange: function (event) { _this.onChanges(event); _this.isValidDrivingLicence(event.target.value); }, value: this.state.user.drivingLicence, label: "Driving Licenece", name: "drivingLicence" })),
                    React.createElement("span", { style: { display: this.state.meta.spanDisplay } }, this.state.meta.drivingLicenceError),
                    React.createElement(core_1.Tooltip, { title: this.state.meta.emailError, placement: 'bottom' },
                        React.createElement(TextField_1.default, { className: 'input', variant: "filled", onChange: function (event) { _this.onChanges(event); _this.isValidEmail(event.target.value); }, value: this.state.user.email, label: "Email Address", name: "email", type: 'email' })),
                    React.createElement("span", { style: { display: this.state.meta.spanDisplay } }, this.state.meta.emailError),
                    React.createElement(core_1.Tooltip, { title: this.state.meta.passwordError, placement: 'bottom' },
                        React.createElement(TextField_1.default, { className: 'input', variant: "filled", onChange: function (event) { _this.onChanges(event); _this.isValidPassword(event.target.value); }, value: this.state.user.password, name: "password", label: "Password", type: this.state.meta.passwordType ? 'password' : 'text', InputProps: {
                                endAdornment: (React.createElement(core_1.InputAdornment, { position: 'end', onClick: function () { _this.setState({ meta: __assign(__assign({}, _this.state.meta), { passwordType: !_this.state.meta.passwordType }) }); } }, this.state.meta.passwordType ? React.createElement(Visibility_1.default, null) : React.createElement(VisibilityOff_1.default, null)))
                            } })),
                    React.createElement("span", { style: { display: this.state.meta.spanDisplay } }, this.state.meta.passwordError),
                    React.createElement(core_1.Tooltip, { title: this.state.meta.passwordMatchError, placement: 'bottom' },
                        React.createElement(TextField_1.default, { className: 'input', variant: "filled", onChange: function (event) { _this.onChanges(event); _this.isEqualPassword(event.target.value); }, value: this.state.user.confirmPassword, name: "confirmPassword", label: "Confirm Password", type: "text" })),
                    React.createElement("span", { style: { display: this.state.meta.spanDisplay } }, this.state.meta.passwordError),
                    React.createElement("div", { className: 'submit' },
                        React.createElement("button", { type: 'submit', onClick: this.onSubmit },
                            React.createElement("span", null, "Submit")))),
                React.createElement("div", { className: 'footer' },
                    React.createElement("p", null, "Already a member ? "),
                    React.createElement("div", { className: 'link' },
                        React.createElement(Link_1.default, { href: "/login" }, " LOGIN"),
                        React.createElement("div", { className: 'footer-underline' }))))));
    };
    return SignUp;
}(React.Component));
exports.default = SignUp;
//# sourceMappingURL=SignUp.js.map