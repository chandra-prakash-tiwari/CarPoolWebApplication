import * as React from 'react'
import { Card, ButtonBase, Avatar } from '@material-ui/core';
import userServices from '../../Anonymus/Services';
import Services from './Services'

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
            Services.SearchRide(JSON.parse(BookingSearchStr))
        }
    }

    render() {
        const Bookings = this.state.bookings.map((booking:any, i) => (
            <ButtonBase key={i} style={{ margin: '1rem 4rem' }}>
                <Card className='bookings'>
                    <div style={{ width: '20rem' }}>
                        <h4></h4>
                        <Avatar></Avatar>
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
            ))

        return (
            <div className='booking-search'>
                {Bookings}
            </div>
        )
    }
}
