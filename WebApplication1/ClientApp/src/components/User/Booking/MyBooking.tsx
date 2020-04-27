import * as React from 'react';
import { ButtonBase, Card, Avatar } from '@material-ui/core';
import Services from './Services'
import '../../../css/my-rides.css';

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
        if (data == null)
            return;
       // this.setState({ bookings:data })
    }

    render() {

        const RidesDetails = this.state.bookings.map((booking: any, i) => (
            <ButtonBase key={i} style={{ margin: '1rem 4rem' }}>
                <Card className='bookings'>
                    <div>
                        <h4></h4>
                        <Avatar></Avatar>
                    </div>
                    <div className='ride-line'>
                        <div className='left'>
                            <span className='label'>From</span><br />
                            <span>{booking.from}</span>
                        </div>
                        <div className='right'>
                            <span className='label'>To</span><br />
                            <span>{booking.to}</span>
                        </div>
                    </div>
                    <div className='ride-line'>
                        <div className='left'>
                            <span className='label'>Date</span><br />
                            <span>{booking.travelDate.split('T')[0]}</span>
                        </div>
                        <div className='right'>
                            <span className='label'>Time</span><br />
                            <span>{booking.travelDate.split('T')[1]}</span>
                        </div>
                    </div>
                    <div className='ride-line'>
                        <div className='left'>
                            <span className='label'>Price</span><br />
                            <span>{booking.ratePerKM}</span>
                        </div>
                    </div>
                </Card>
            </ButtonBase>
        ))
        return (
            <div className='my-bookings'>
                <ButtonBase>
                    <Card>BookedRide</Card>
                </ButtonBase>
                <div>{RidesDetails}</div>
            </div>
        )
    }
}
