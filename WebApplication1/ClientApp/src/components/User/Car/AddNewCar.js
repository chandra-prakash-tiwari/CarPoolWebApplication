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
var Services_1 = require("./Services");
var AddNewCar = /** @class */ (function (_super) {
    __extends(AddNewCar, _super);
    function AddNewCar(props) {
        var _this = _super.call(this, props) || this;
        _this.changes = function (event) {
            var _a;
            _this.setState(__assign(__assign({}, _this.state), (_a = {}, _a[event.target.name] = event.target.value, _a)));
        };
        _this.submit = function () {
            Services_1.default.AddNewCar(_this.state);
        };
        _this.state = {
            carNumber: '',
            carModel: '',
            noofSeats: 0
        };
        return _this;
    }
    AddNewCar.prototype.render = function () {
        return (React.createElement("div", { className: 'add-new-car' },
            React.createElement("form", { className: 'car-details' },
                React.createElement("div", { className: 'header' },
                    React.createElement("div", { className: 'head' },
                        React.createElement("h1", null, "Add a new car"),
                        React.createElement(core_1.Switch, { color: "secondary", name: "checkedB" })),
                    React.createElement("p", null, "we get you the matches asap!")),
                React.createElement(core_1.TextField, { label: "CarNumber", style: { margin: 8 }, InputLabelProps: { shrink: true }, type: 'text', value: this.state.carNumber, onChange: this.changes, name: 'carNumber' }),
                React.createElement(core_1.TextField, { label: "Model", style: { margin: 8 }, InputLabelProps: { shrink: true }, type: 'text', value: this.state.carModel, onChange: this.changes, name: 'carModel' }),
                React.createElement(core_1.TextField, { label: "Max Number Of Seat", style: { margin: 8 }, InputLabelProps: { shrink: true }, type: 'number', value: this.state.noofSeats, onChange: this.changes, name: 'noofSeats' }),
                React.createElement("div", null,
                    React.createElement("button", { type: 'submit', color: 'primary', onClick: this.submit }, "Submit")))));
    };
    return AddNewCar;
}(React.Component));
exports.default = AddNewCar;
//# sourceMappingURL=AddNewCar.js.map