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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var core_1 = require("@material-ui/core");
require("../../../css/create-ride.css");
var Services_1 = require("./Services");
var AddViaPointsView = /** @class */ (function (_super) {
    __extends(AddViaPointsView, _super);
    function AddViaPointsView(props) {
        var _this = _super.call(this, props) || this;
        _this.addViaPoints = function () {
            _this.setState({ viaPoints: __spreadArrays(_this.state.viaPoints, [{ city: '', longitude: 0, latitude: 0 }]) });
        };
        _this.editViaPoints = function (e, index) {
            _this.state.viaPoints[index].city = e.target.value;
            _this.state.viaPoints[index].longitude = index;
            _this.state.viaPoints[index].latitude = index + 1;
            _this.setState({ viaPoints: _this.state.viaPoints });
        };
        _this.changes = function (event) {
            var _a;
            _this.setState(__assign(__assign({}, _this.state), (_a = {}, _a[event.target.name] = event.target.value, _a)));
        };
        _this.submit = function () {
            Services_1.default.AddRides(_this.state);
        };
        _this.state = {
            viaPoints: [{
                    city: '',
                    longitude: 0,
                    latitude: 0
                }],
            availableSeats: 0,
            ratePerKM: 0,
        };
        return _this;
    }
    AddViaPointsView.prototype.render = function () {
        var _this = this;
        return (React.createElement(core_1.Grid, { className: 'create-ride', item: true, md: 4, id: 'viapointdetails' },
            React.createElement("form", { className: 'ride-details', onSubmit: this.submit },
                React.createElement("div", { className: 'header' },
                    React.createElement("div", { className: 'head' },
                        React.createElement("h1", null, "Create Ride"),
                        React.createElement(core_1.Switch, { color: "secondary", name: "checkedB" })),
                    React.createElement("p", null, "we get you the matches asap!")),
                this.state.viaPoints.map(function (viapoint, index) {
                    return (React.createElement("div", { key: index, className: 'input-via-points' },
                        React.createElement(core_1.TextField, { label: 'stop ' + (index + 1), style: { margin: 8 }, InputLabelProps: { shrink: true }, type: 'text', value: viapoint.city, onChange: function (event) { return _this.editViaPoints(event, index); } })));
                }),
                React.createElement(core_1.ButtonBase, { className: 'add', onClick: this.addViaPoints },
                    React.createElement("span", null, "+")),
                React.createElement("br", null),
                React.createElement(core_1.TextField, { label: 'Available seat', style: { margin: 8 }, InputLabelProps: { shrink: true }, type: 'number', name: 'availableSeats', value: this.state.availableSeats, onChange: this.changes }),
                React.createElement(core_1.TextField, { label: 'Rate per km', style: { margin: 8 }, InputLabelProps: { shrink: true }, type: 'number', name: 'ratePerKM', value: this.state.ratePerKM, onChange: this.changes }),
                React.createElement("button", { type: 'submit' }, "Sumbit "))));
    };
    return AddViaPointsView;
}(React.Component));
exports.default = AddViaPointsView;
//# sourceMappingURL=AddViaPointsView.js.map