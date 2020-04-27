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
require("../../../css/car-selector.css");
var Services_js_1 = require("./Services.js");
var CarSelector = /** @class */ (function (_super) {
    __extends(CarSelector, _super);
    function CarSelector(props) {
        var _this = _super.call(this, props) || this;
        _this.handleclick = function (carRecord) {
            localStorage.setItem('carDetails', JSON.stringify(carRecord));
            window.location.pathname = '/createride';
        };
        _this.state = {
            cars: []
        };
        return _this;
    }
    CarSelector.prototype.componentDidMount = function () {
        var data = Services_js_1.default.GetCars();
        console.log(data);
        //this.setState({cars:data})
    };
    CarSelector.prototype.render = function () {
        var _this = this;
        var carDetails = this.state.cars.map(function (carRecord, i) { return (React.createElement(core_1.ButtonBase, { key: i, onClick: function () { return _this.handleclick(carRecord); } },
            React.createElement(core_1.Card, { className: 'car-cards' },
                React.createElement("div", null,
                    React.createElement("p", null,
                        "Model : ",
                        carRecord.model)),
                React.createElement("div", null,
                    React.createElement("p", null,
                        "Car Number : ",
                        carRecord.number)),
                React.createElement("div", null,
                    React.createElement("p", null,
                        "MAX NUMBER OF SEAT: ",
                        carRecord.noofSeat))))); });
        return (React.createElement("div", { className: 'car-selectors' },
            React.createElement("div", { className: 'header' },
                React.createElement("h3", null, "Select one car if not present then add that car")),
            React.createElement("div", { className: 'user-cars' }, carDetails),
            React.createElement(core_1.ButtonBase, { href: '/car/addnewcar' },
                React.createElement(core_1.Card, { className: 'car-cards' },
                    React.createElement("div", { className: 'add-new-car' }, "+")))));
    };
    return CarSelector;
}(React.Component));
exports.default = CarSelector;
//# sourceMappingURL=CarSelector.js.map