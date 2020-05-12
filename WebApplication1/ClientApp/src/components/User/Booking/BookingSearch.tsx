import * as React from 'react';
import { Card, ButtonBase, Avatar, Grid } from '@material-ui/core';
import UserService from '../../../Services/UserService';
import { Dialog } from '@material-ui/core';
import BookingService from '../../../Services/BookingService';
import '../../../css/booking-search.css';
import { ServerError, BookingRequest } from '../Response';
import '../../../css/ride-details-dialog.css'
import RideService from '../../../Services/RideService';

export class Bookings {
    bookings: Array<any>;
    rides: any;
    bookingConfirm: boolean;
    serverError: boolean;
    noOffer: boolean;
    requestSended: boolean;
    offer: boolean;
    bookingDetailsDisplay: boolean;
    bookingDetails: any;

    constructor() {
        this.bookings = [];
        this.rides = null;
        this.bookingConfirm = false;
        this.serverError = false;
        this.noOffer = false;
        this.offer = true;
        this.requestSended = false;
        this.bookingDetailsDisplay = false;
        this.bookingDetails = null;
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
            if (searchBooking !== undefined && searchBooking !== 'serverError')
                this.setState({ bookings: searchBooking })
            else if (searchBooking === 'serverError') {
                this.setState({ offer: false })
                this.setState({ serverError:true })
            }
        });
    }

    onSubmit = (booking: any) => {
        this.setState({ bookingDetailsDisplay: true })
        RideService.getRideById(booking.id).then((response) => {
            if (response !== undefined) {
                this.setState({ bookingDetailsDisplay: true })
                this.setState({ rides: response })
            }
        })
    }

    onBookingConfirm=()=> {
        this.setState({ bookingDetailsDisplay: false });
        this.setState({ offer:false })
        BookingService.addBookings(this.state.rides).then((response) => {
            if (response === 'Ok') {
                this.setState({ rides: null })
                this.setState({ requestSended: true })
                localStorage.removeItem('bookingSearch')
            }
            else if (response === 'serverError') {
                this.setState({ serverError: true })
            }
        })
    }

    onBookingCancel=()=> {
        this.setState({ bookingDetailsDisplay: false })
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
                                    <span>{Math.round(booking.ratePerKM * booking.totalDistance)}</span>
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

        const viaPoints = this.state.rides !== null ?
            ((JSON.parse(this.state.rides.viaPoints)).map((viacity: any, i: any) => (
                <p key={i} className='via-point'>{viacity.city}</p>
            ))) : null

        const dialog = (this.state.bookingDetailsDisplay && this.state.rides !== null) ? (
            <Dialog fullScreen open={this.state.bookingDetailsDisplay} className='dialog'>
                <div className='content'>
                    <p className='left'>From</p>
                    <p className='right'>{this.state.rides.from}</p>
                </div>
                <div className='content'>
                    <p className='left'>To</p>
                    <p className='right'>{this.state.rides.to}</p>
                </div>
                <div className='content'>
                    <p className='left'>Date</p>
                    <p className='right'>{this.state.rides.travelDate}</p>
                </div>
                <div className='content'>
                    <p className='left'>Available Seats </p>
                    <p className='right'>{this.state.rides.availableSeats}</p>
                </div>
                <div className='content'>
                    <p className='left'>Time</p>
                    <p className='right'>{this.state.rides.time}</p>
                </div>
                <div className='content'>
                    <p className='left'>Via Points</p>
                    {viaPoints}
                </div>
                <div>
                    <button className='submit' onClick={this.onBookingConfirm}>Submit</button>
                    <button className='cancel' onClick={this.onBookingCancel}>Cancel</button>
                </div>
            </Dialog>
        ) : null;

        return (
            this.state.offer ?
                <div className='bookingsearches'>
                    <div className='header'>
                        <p>Your Matches</p>
                    </div>
                    <div className='booking-search'>
                        {Bookings}
                    </div>
                    {dialog}
                </div> :
                (<div>
                    <div>{this.state.serverError ? <ServerError /> : ''}</div>
                    <div>{this.state.requestSended ? <BookingRequest/>:''}</div>
                </div>
                )
        )
    }
}
