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
var Button_1 = require("@material-ui/core/Button");
var TextField_1 = require("@material-ui/core/TextField");
var Link_1 = require("@material-ui/core/Link");
var Grid_1 = require("@material-ui/core/Grid");
var Typography_1 = require("@material-ui/core/Typography");
var Services_1 = require("./Services");
require("../../css/sign-up-form.css");
var SignUp = /** @class */ (function (_super) {
    __extends(SignUp, _super);
    function SignUp(props) {
        var _this = _super.call(this, props) || this;
        _this.changes = function (event) {
            var _a;
            _this.setState(__assign(__assign({}, _this.state), (_a = {}, _a[event.target.name] = event.target.value, _a)));
        };
        _this.state = {
            name: '',
            mobile: '',
            userName: '',
            address: '',
            drivingLicence: '',
            email: '',
            password: ''
        };
        return _this;
    }
    SignUp.prototype.render = function () {
        var _this = this;
        return (React.createElement(Grid_1.default, { item: true, xs: 12, sm: 8, md: 4 },
            React.createElement("div", { className: 'signup' },
                React.createElement("div", { className: 'header' },
                    React.createElement(Typography_1.default, { className: 'head', component: "h1", variant: "h5" }, "Sign in")),
                React.createElement("form", { id: "form" },
                    React.createElement(TextField_1.default, { className: 'input', variant: "filled", onChange: this.changes, value: this.state.name, required: true, id: "Name", label: "Name", name: "name", autoFocus: true }),
                    React.createElement(TextField_1.default, { className: 'input', variant: "filled", onChange: this.changes, value: this.state.mobile, required: true, id: "Mobile", label: "Mobile", name: "mobile" }),
                    React.createElement(TextField_1.default, { className: 'input', variant: "filled", onChange: this.changes, value: this.state.userName, required: true, id: "UserName", label: "UserName", name: "userName" }),
                    React.createElement(TextField_1.default, { className: 'input', variant: "filled", onChange: this.changes, value: this.state.address, required: true, id: "Address", label: "Address", name: "address" }),
                    React.createElement(TextField_1.default, { className: 'input', variant: "filled", onChange: this.changes, value: this.state.drivingLicence, required: true, id: "DrivingLicenece", label: "drivingLicenece", name: "DrivingLicence" }),
                    React.createElement(TextField_1.default, { className: 'input', variant: "filled", onChange: this.changes, value: this.state.email, required: true, id: "email", label: "Email Address", name: "email", type: 'email' }),
                    React.createElement(TextField_1.default, { className: 'input', variant: "filled", onChange: this.changes, value: this.state.password, required: true, name: "Password", label: "Password", type: "password", id: "password" }),
                    React.createElement(TextField_1.default, { className: 'input', variant: "filled", required: true, name: "confirm-password", label: "Confirm Password", type: "text", id: "confirm-password" }),
                    React.createElement("div", { className: 'submit' },
                        React.createElement(Button_1.default, { type: 'submit', variant: "contained", color: "primary", onClick: function () { return Services_1.default.AddNewUser(_this.state); } }, "Submit"))),
                React.createElement("div", { className: 'a' },
                    React.createElement(Typography_1.default, null,
                        "Already a member ? ",
                        React.createElement(Link_1.default, { href: "/login" }, "LOGIN"))))));
    };
    return SignUp;
}(React.Component));
exports.default = SignUp;
//# sourceMappingURL=SignUp.js.map