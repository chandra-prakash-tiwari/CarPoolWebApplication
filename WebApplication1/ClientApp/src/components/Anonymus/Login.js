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
require("../../css/login-form.css");
var Services_1 = require("./Services");
var Login = /** @class */ (function (_super) {
    __extends(Login, _super);
    function Login(props) {
        var _this = _super.call(this, props) || this;
        _this.changes = function (event) {
            var _a;
            _this.setState(__assign(__assign({}, _this.state), (_a = {}, _a[event.target.name] = event.target.value, _a)));
        };
        _this.handleAuthentication = function (event) {
            event.preventDefault();
            Services_1.default.Login(_this.state);
            window.location.pathname = '/home';
        };
        _this.state = {
            userName: '',
            password: ''
        };
        return _this;
    }
    Login.prototype.render = function () {
        return (React.createElement(Grid_1.default, { item: true, xs: 12, sm: 8, md: 4 },
            React.createElement("div", { className: 'login' },
                React.createElement("div", { className: 'header' },
                    React.createElement(Typography_1.default, { component: "h1", variant: "h5", className: 'head' }, "Log In")),
                React.createElement("form", { className: 'form' },
                    React.createElement(TextField_1.default, { variant: "filled", className: 'input', value: this.state.userName, onChange: this.changes, required: true, id: "userName", label: "Email Address", name: "userName", autoFocus: true }),
                    React.createElement(TextField_1.default, { variant: "filled", className: 'input', value: this.state.password, onChange: this.changes, required: true, name: "password", label: "Password", type: "password", id: "password", margin: 'normal' }),
                    React.createElement("div", { className: 'submit' },
                        React.createElement(Button_1.default, { type: "submit", onClick: this.handleAuthentication }, " Submit "))),
                React.createElement("div", { className: 'a' },
                    React.createElement(Typography_1.default, null,
                        "Not a member yet?",
                        React.createElement(Link_1.default, { href: "/signup" }, "SIGN UP"))))));
    };
    return Login;
}(React.Component));
exports.default = Login;
//# sourceMappingURL=Login.js.map