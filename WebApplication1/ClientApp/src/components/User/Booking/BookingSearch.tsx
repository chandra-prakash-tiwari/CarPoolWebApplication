import * as React from 'react'
import { Card, ButtonBase, Avatar, Grid } from '@material-ui/core';
import userServices from '../../Anonymus/Services';
import Services from './Services';
import '../../../css/booking-search.css';

type allBookings = {
    bookings:[]
}

export default class BookingSearch extends React.Component<{}, allBookings> {
    constructor(props: allBookings) {
        super(props);
        this.state = {
            bookings:[]
        }
    }

    componentDidMount() {
        var token = userServices.userToken;
        var BookingSearchStr = localStorage.getItem('bookingSearch');
        if (BookingSearchStr === null)
            return;
        if (token) {
            var data = Services.SearchRide(JSON.parse(BookingSearchStr));
            data.then((searchBooking) => this.setState({ bookings: searchBooking }));
        }
    }

    render() {
        const Bookings = this.state.bookings.length > 0 ? (
            this.state.bookings.map((booking: any, i) => (
                <ButtonBase key={i} style={{ margin: '1rem' }}>
                    <Card className='bookings'>
                        <div className='head'>
                            <Grid item md={10}>
                                <h4> </h4>
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
                                <span>{booking.travelDate.split('T')[1]}</span>
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
        ) : (<div className='no-offer'>
            <p className="content">Sorry no offer currently available </p>
                <p className="content">Better for next time</p>
                <p className="content">Thanks for using my services</p>
                </div>)

        return (
            <div className='bookingsearches'>
                <div className='header'>
                    <p>Your Matches</p>
                </div>
                <div className='booking-search'>
                    { Bookings } 
                </div>
            </div>
        )
    }
}
