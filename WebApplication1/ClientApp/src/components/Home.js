"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var core_1 = require("@material-ui/core");
require("../css/home.css");
var Services_js_1 = require("../components/Anonymus/Services.js");
function Home() {
    return (React.createElement("div", { className: "home" },
        React.createElement("div", { className: 'welcome' },
            React.createElement("h1", null,
                "Hey ",
                Services_js_1.default.currentUser.name.split(' ')[0])),
        React.createElement("div", { className: 'cards' },
            React.createElement(core_1.ButtonBase, { href: '/booking' },
                React.createElement(core_1.Card, { className: 'ride' },
                    React.createElement(core_1.CardContent, null,
                        React.createElement(core_1.Typography, { className: 'cards-element', component: 'h1', variant: 'h5' }, "Book a Ride")))),
            React.createElement(core_1.ButtonBase, { href: '/car' },
                React.createElement(core_1.Card, { className: 'booking' },
                    React.createElement(core_1.CardContent, null,
                        React.createElement(core_1.Typography, { className: 'cards-element', component: 'h1', variant: 'h5' }, "Offer a Ride")))))));
}
exports.default = Home;
//# sourceMappingURL=Home.js.map