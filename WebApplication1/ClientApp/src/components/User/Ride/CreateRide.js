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
var core_1 = require("@material-ui/core");
var AddViaPointsView_1 = require("./AddViaPointsView");
require("../../../css/create-ride.css");
var CreateRide = /** @class */ (function (_super) {
    __extends(CreateRide, _super);
    function CreateRide(props) {
        var _this = _super.call(this, props) || this;
        _this.changes = function (event) {
            var _a;
            _this.setState(__assign(__assign({}, _this.state), (_a = {}, _a[event.target.name] = event.target.value, _a)));
        };
        _this.submit = function () {
            localStorage.setItem('rideDetails', JSON.stringify(_this.state));
            _this.setState({ showComponent: true });
        };
        _this.state = {
            from: '',
            to: '',
            date: '',
            time: '',
            showComponent: false
        };
        return _this;
    }
    CreateRide.prototype.render = function () {
        return (React.createElement(core_1.Grid, { item: true, md: 12, container: true },
            React.createElement(core_1.Grid, { className: 'create-ride', item: true, md: 4 },
                React.createElement("form", { className: 'ride-details' },
                    React.createElement("div", { className: 'header' },
                        React.createElement("div", { className: 'head' },
                            React.createElement("h1", null, "Create Ride"),
                            React.createElement(core_1.Switch, { color: "secondary", name: "checkedB" })),
                        React.createElement("p", null, "we get you the matches asap!")),
                    React.createElement(core_1.TextField, { label: "From", style: { margin: 8 }, InputLabelProps: { shrink: true }, type: 'text', value: this.state.from, onChange: this.changes, name: 'from' }),
                    React.createElement(core_1.TextField, { label: "To", style: { margin: 8 }, InputLabelProps: { shrink: true }, type: 'text', value: this.state.to, onChange: this.changes, name: 'to' }),
                    React.createElement(core_1.TextField, { label: "Date", style: { margin: 8 }, InputLabelProps: { shrink: true }, type: 'date', value: this.state.date, onChange: this.changes, name: 'date' }),
                    React.createElement("div", { className: 'chips' },
                        React.createElement("div", { className: 'label' },
                            React.createElement("span", null, "Time")),
                        React.createElement(core_1.Chip, { label: "5am - 9am", style: { margin: 8 }, color: "primary", clickable: true, variant: "outlined" }),
                        React.createElement(core_1.Chip, { label: "9am - 12am", style: { margin: 8 }, color: "primary", clickable: true, variant: "outlined" }),
                        React.createElement(core_1.Chip, { label: "12pm - 3pm", style: { margin: 8 }, color: "primary", clickable: true, variant: "outlined" }),
                        React.createElement(core_1.Chip, { label: "3pm - 6pm", style: { margin: 8 }, color: "primary", clickable: true, variant: "outlined" }),
                        React.createElement(core_1.Chip, { label: "6pm - 9pm", style: { margin: 8 }, color: "primary", clickable: true, variant: "outlined" })),
                    React.createElement("div", null,
                        React.createElement(core_1.ButtonBase, { onClick: this.submit }, "Next>>>")))),
            this.state.showComponent ?
                React.createElement(AddViaPointsView_1.default, null) :
                null));
    };
    return CreateRide;
}(React.Component));
exports.default = CreateRide;
//# sourceMappingURL=CreateRide.js.map