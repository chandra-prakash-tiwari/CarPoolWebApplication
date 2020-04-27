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
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var core_1 = require("@material-ui/core");
require("../../../css/my-rides.css");
var Services_js_1 = require("./Services.js");
var MyRides = /** @class */ (function (_super) {
    __extends(MyRides, _super);
    function MyRides(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            rides: []
        };
        return _this;
    }
    MyRides.prototype.componentDidMount = function () {
        var data = Services_js_1.default.AllRides();
        //this.setState({ rides: data })
    };
    MyRides.prototype.render = function () {
        var RidesDetails = this.state.rides.map(function (ride, i) { return (React.createElement(core_1.ButtonBase, { key: i, style: { margin: '1rem 4rem' } },
            React.createElement(core_1.Card, { className: 'rides' },
                React.createElement("div", null,
                    React.createElement("h4", null),
                    React.createElement(core_1.Avatar, null)),
                React.createElement("div", { className: 'ride-line' },
                    React.createElement("div", { className: 'left' },
                        React.createElement("span", { className: 'label' }, "From"),
                        React.createElement("br", null),
                        React.createElement("span", null, ride.from)),
                    React.createElement("div", { className: 'right' },
                        React.createElement("span", { className: 'label' }, "To"),
                        React.createElement("br", null),
                        React.createElement("span", null, ride.to))),
                React.createElement("div", { className: 'ride-line' },
                    React.createElement("div", { className: 'left' },
                        React.createElement("span", { className: 'label' }, "Date"),
                        React.createElement("br", null),
                        React.createElement("span", null, ride.travelDate.split('T')[0])),
                    React.createElement("div", { className: 'right' },
                        React.createElement("span", { className: 'label' }, "Time"),
                        React.createElement("br", null),
                        React.createElement("span", null, ride.travelDate.split('T')[1]))),
                React.createElement("div", { className: 'ride-line' },
                    React.createElement("div", { className: 'left' },
                        React.createElement("span", { className: 'label' }, "Price"),
                        React.createElement("br", null),
                        React.createElement("span", null, ride.ratePerKM)))))); });
        return (React.createElement("div", { className: 'my-ride' },
            React.createElement(core_1.ButtonBase, null,
                React.createElement(core_1.Card, { className: 'header' }, "Offered Ride")),
            React.createElement("div", null, RidesDetails)));
    };
    return MyRides;
}(React.Component));
exports.default = MyRides;
//# sourceMappingURL=MyRides.js.map