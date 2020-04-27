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
var Services_1 = require("../../Anonymus/Services");
var Services_2 = require("./Services");
var BookingSearch = /** @class */ (function (_super) {
    __extends(BookingSearch, _super);
    function BookingSearch(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            bookings: []
        };
        return _this;
    }
    BookingSearch.prototype.componentDidMount = function () {
        var token = Services_1.default.userToken;
        var BookingSearchStr = localStorage.getItem('bookingSearch');
        if (BookingSearchStr === null)
            return;
        if (token) {
            Services_2.default.SearchRide(JSON.parse(BookingSearchStr));
        }
    };
    BookingSearch.prototype.render = function () {
        var Bookings = this.state.bookings.map(function (booking, i) { return (React.createElement(core_1.ButtonBase, { key: i, style: { margin: '1rem 4rem' } },
            React.createElement(core_1.Card, { className: 'bookings' },
                React.createElement("div", { style: { width: '20rem' } },
                    React.createElement("h4", null),
                    React.createElement(core_1.Avatar, null)),
                React.createElement("div", { className: 'booking-line' },
                    React.createElement("div", { className: 'left' },
                        React.createElement("span", { className: 'label' }, "From"),
                        React.createElement("br", null),
                        React.createElement("span", null, booking.from)),
                    React.createElement("div", { className: 'right' },
                        React.createElement("span", { className: 'label' }, "To"),
                        React.createElement("br", null),
                        React.createElement("span", null, booking.to))),
                React.createElement("div", { className: 'booking-line' },
                    React.createElement("div", { className: 'left' },
                        React.createElement("span", { className: 'label' }, "Date"),
                        React.createElement("br", null),
                        React.createElement("span", null, booking.travelDate.split('T')[0])),
                    React.createElement("div", { className: 'right' },
                        React.createElement("span", { className: 'label' }, "Time"),
                        React.createElement("br", null),
                        React.createElement("span", null, booking.travelDate.split('T')[1]))),
                React.createElement("div", { className: 'booking-line' },
                    React.createElement("div", { className: 'left' },
                        React.createElement("span", { className: 'label' }, "Price"),
                        React.createElement("br", null),
                        React.createElement("span", null, booking.ratePerKM)))))); });
        return (React.createElement("div", { className: 'booking-search' }, Bookings));
    };
    return BookingSearch;
}(React.Component));
exports.default = BookingSearch;
//# sourceMappingURL=BookingSearch.js.map