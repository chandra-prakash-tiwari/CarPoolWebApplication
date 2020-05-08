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
var UserService_1 = require("../../../Services/UserService");
var BookingService_1 = require("../../../Services/BookingService");
require("../../../css/booking-search.css");
var Bookings = /** @class */ (function () {
    function Bookings() {
        this.bookings = [];
    }
    return Bookings;
}());
exports.Bookings = Bookings;
var BookingSearch = /** @class */ (function (_super) {
    __extends(BookingSearch, _super);
    function BookingSearch(props) {
        var _this = _super.call(this, props) || this;
        _this.timeEnum = { 1: '5am - 9am', 2: '9am - 12pm', 3: '12pm - 3pm', 4: '3pm - 6pm', 5: '6pm - 9pm' };
        _this.onSubmit = function (booking) {
            console.log(booking);
            BookingService_1.default.addBookings(booking).then(function (booking) {
                if (booking === 'Ok') {
                    alert('Request will be sended');
                    window.location.pathname = '/home';
                }
            });
        };
        _this.state = new Bookings();
        return _this;
    }
    BookingSearch.prototype.componentDidMount = function () {
        var _this = this;
        var bookingSearch = localStorage.getItem('bookingSearch');
        if (bookingSearch === null)
            return;
        BookingService_1.default.searchRide(JSON.parse(bookingSearch)).then(function (searchBooking) {
            if (searchBooking != undefined)
                _this.setState({ bookings: searchBooking });
        });
    };
    BookingSearch.prototype.userDetails = function (id) {
        return UserService_1.default.getUser(id).then(function (user) { return user; });
    };
    BookingSearch.prototype.render = function () {
        var _this = this;
        var Bookings = this.state.bookings != null ?
            this.state.bookings.length > 0 ? (this.state.bookings.map(function (booking, i) { return (React.createElement(core_1.ButtonBase, { key: i, style: { margin: '1rem' }, onClick: function () { return _this.onSubmit(booking); } },
                React.createElement(core_1.Card, { className: 'bookings' },
                    React.createElement("div", { className: 'head' },
                        React.createElement(core_1.Grid, { item: true, md: 10 },
                            React.createElement("h1", null, " ")),
                        React.createElement(core_1.Grid, { item: true, md: 2 },
                            React.createElement(core_1.Avatar, null))),
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
                            React.createElement("span", null, booking.time))),
                    React.createElement("div", { className: 'booking-line' },
                        React.createElement("div", { className: 'left' },
                            React.createElement("span", { className: 'label' }, "Price"),
                            React.createElement("br", null),
                            React.createElement("span", null, booking.ratePerKM)),
                        React.createElement("div", { className: 'right' },
                            React.createElement("span", { className: 'label' }, "Seat availabilty"),
                            React.createElement("br", null),
                            React.createElement("span", null, booking.availableSeats)))))); })) : (React.createElement("div", { className: 'no-offer' },
                React.createElement("p", { className: "content" }, "Sorry no offer currently available "),
                React.createElement("p", { className: "content" }, "Better for next time"),
                React.createElement("p", { className: "content" }, "Thanks for using my services"))) : null;
        return (React.createElement("div", { className: 'bookingsearches' },
            React.createElement("div", { className: 'header' },
                React.createElement("p", null, "Your Matches")),
            React.createElement("div", { className: 'booking-search' }, Bookings)));
    };
    return BookingSearch;
}(React.Component));
exports.default = BookingSearch;
//# sourceMappingURL=BookingSearch.js.map