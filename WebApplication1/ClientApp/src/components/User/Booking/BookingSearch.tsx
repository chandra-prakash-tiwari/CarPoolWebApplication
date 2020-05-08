import * as React from 'react';
import { Card, ButtonBase, Avatar, Grid } from '@material-ui/core';
import UserService from '../../../Services/UserService';
import BookingService from '../../../Services/BookingService';
import '../../../css/booking-search.css';
import { NoOffer, ServerError, BookingRequest } from '../Response';

export class Bookings {
    bookings: Array<any>;
    bookingConfirm: boolean;
    serverError: boolean;
    noOffer: boolean;
    requestSended: boolean;
    offer: boolean;

    constructor() {
        this.bookings = [];
        this.bookingConfirm = false;
        this.serverError = false;
        this.noOffer = false;
        this.offer = true;
        this.requestSended = false;
    }
}

export default class BookingSearch extends React.Component<{}, Bookings> {
    constructor(props: Bookings) {
        super(props);
        this.state = new Bookings()
    }

    timeEnum = { 1:'5am - 9am', 2: '9am - 12pm', 3: '12pm - 3pm', 4: '3pm - 6pm', 5: '6pm - 9pm' };

    componentDidMount() {
        var bookingSearch = localStorage.getItem('bookingSearch');
        if (bookingSearch === null)
            return;
        BookingService.searchRide(JSON.parse(bookingSearch)).then((searchBooking) => {
            if (searchBooking != undefined)
                this.setState({ bookings: searchBooking })
        });
    }

    onSubmit = (booking: any) => {
        console.log(booking);
        this.setState({ offer: false })
        BookingService.addBookings(booking).then((response) => {
            if (response === 'Ok') {
                this.setState({ requestSended: true })
            }
            else if (response === 'serverError') {
                this.setState({ serverError: true })
            }
        })
    }

    userDetails(id: any) {
        return UserService.getUser(id).then((user) => { return user });
    }

    render() {
        const Bookings = this.state.bookings != null ?
            this.state.bookings.length > 0 ? (
                this.state.bookings.map((booking: any, i) => (
                    <ButtonBase key={i} style={{ margin: '1rem' }} onClick={() => this.onSubmit(booking)} >
                    <Card className='bookings'>
                        <div className='head'>
                            <Grid item md={10}>
                                <h1> </h1>
                            </Grid>
                            <Grid item md={2}>
                                <Avatar></Avatar>
                            </Grid>
                        </div>
                        <div className='booking-line'>
                            <div className='left'>
                                <span className='label'>From</span><br />
                                <span>{booking.from}</span>
                            </div>
                            <div className='right'>
                                <span className='label'>To</span><br />
                                <span>{booking.to}</span>
                            </div>
                        </div>
                        <div className='booking-line'>
                            <div className='left'>
                                <span className='label'>Date</span><br />
                                <span>{booking.travelDate.split('T')[0]}</span>
                            </div>
                            <div className='right'>
                                    <span className='label'>Time</span><br />
                                    <span>{booking.time}</span>
                            </div>
                        </div>
                        <div className='booking-line'>
                            <div className='left'>
                                <span className='label'>Price</span><br />
                                <span>{booking.ratePerKM}</span>
                            </div>
                            <div className='right'>
                                <span className='label'>Seat availabilty</span><br />
                                <span>{booking.availableSeats}</span>
                            </div>
                        </div>
                    </Card>
                </ButtonBase>
            ))
            ) : (
                    <div>
                        <p>Sorry no offer currently available </p>
                        <p>Better for next time</p>
                    </div>
                ) : null

        return (
            this.state.offer ?
                <div className='bookingsearches'>
                    <div className='header'>
                        <p>Your Matches</p>
                    </div>
                    <div className='booking-search'>
                        {Bookings}
                    </div>
                </div> :
                (<div>
                    <div>{this.state.serverError ? <ServerError /> : ''}</div>
                    <div>{this.state.requestSended ? <BookingRequest/>:''}</div>
                </div>
                )
        )
    }
}
