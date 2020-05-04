import * as React from 'react';
import { ButtonBase, Card, Avatar, Grid } from '@material-ui/core';
import Services from './Services'
import '../../../css/my-bookings.css';

type allBookings = {
    bookings:[]
}

export default class MyBookings extends React.Component<{}, allBookings> {
    constructor(props: allBookings) {
        super(props);
        this.state = {
            bookings: []
        }
    }

    componentDidMount() {
        var data = Services.MyBookings();
        data.then((myBookings) => this.setState({ bookings: myBookings }))
    }

    render() {
        const BookingsDetails = this.state.bookings.length>0?(
            this.state.bookings.map((booking: any, i) => (
            <ButtonBase key={i} style={{ margin: '1rem 4rem' }}>
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
                </ButtonBase>
            ))) : (<p className='no-bookings'>you have not booked any offer</p>)
        return (
            <div className='my-bookings'>
                <ButtonBase className='head-card'>
                    <Card className='header'>Booked rides</Card>
                </ButtonBase>
                <div className='all-bookings'>{BookingsDetails}</div>
            </div>
        )
    }
}
