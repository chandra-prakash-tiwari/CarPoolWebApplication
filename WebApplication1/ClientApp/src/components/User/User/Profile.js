"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var Button_1 = require("@material-ui/core/Button");
var Menu_1 = require("@material-ui/core/Menu");
var MenuItem_1 = require("@material-ui/core/MenuItem");
var Services_js_1 = require("../../Anonymus/Services.js");
var core_1 = require("@material-ui/core");
function Profile() {
    var _a = React.useState(null), close = _a[0], open = _a[1];
    var handleClick = function (event) {
        open(event.currentTarget);
    };
    var myRides = function () {
        window.location.pathname = '/myride';
    };
    var logout = function () {
        Services_js_1.default.Logout();
        window.location.pathname = '/login';
    };
    var home = function () {
        window.location.pathname = '/home';
    };
    return (React.createElement("div", { className: 'Avatar' },
        React.createElement(Button_1.default, { "aria-controls": "menu", onClick: handleClick },
            React.createElement("h5", null, Services_js_1.default.currentUser.name),
            React.createElement(core_1.Avatar, null)),
        React.createElement(Menu_1.default, { id: "menu", anchorEl: close, open: Boolean(close) },
            React.createElement(MenuItem_1.default, null, "Profile"),
            React.createElement(MenuItem_1.default, { onClick: myRides }, "My Rides"),
            React.createElement(MenuItem_1.default, { onClick: logout }, "Logout")),
        React.createElement(core_1.ButtonBase, null,
            React.createElement("span", { onClick: home }, "HOME"))));
}
exports.default = Profile;
//# sourceMappingURL=Profile.js.map