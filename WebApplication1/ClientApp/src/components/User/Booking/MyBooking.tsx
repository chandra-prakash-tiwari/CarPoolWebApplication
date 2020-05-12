import * as React from 'react';
import { ButtonBase, Card, Avatar, Grid } from '@material-ui/core';
import BookingService from '../../../Services/BookingService';
import '../../../css/my-bookings.css';
import { ServerError } from '../Response';

export class Bookings {
    bookings: Array<any>;
    serverError: boolean;

    constructor() {
        this.bookings = [];
        this.serverError = false;
    }
}

export default class MyBookings extends React.Component<{}, Bookings> {
    constructor(props: Bookings) {
        super(props);
        this.state = new Bookings()
    }

    componentDidMount() {
        BookingService.myBookings().then((response) => {
            console.log(response)
            if (response === 'serverError') {
                this.setState({ serverError: true })
            }

            if (response !== undefined && response !== 'serverError')
                this.setState({ bookings: response })
        })
    }

    render() {
        const BookingsDetails = this.state.bookings.length>0?(
            this.state.bookings.map((booking: any, i) => (
            <div key={i} style={{ margin: '1rem 4rem' }}>
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
                    </div>
                </Card>
                </div>
            ))) : (<p className='no-bookings'>you have not booked any offer</p>)
        return (
            !this.state.serverError?
            <div className='my-bookings'>
                <div className='head-card'>
                    <Card className='header'>Booked rides</Card>
                </div>
                <div className='all-bookings'>{BookingsDetails}</div>
                </div> : (
                    <ServerError/>
                    )
        )
    }
}
