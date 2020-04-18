import React, { Component } from 'react'
import { Card, ButtonBase, Avatar} from '@material-ui/core';
import Authentication from '../Helper/authentication';

export default class BookingSearch extends Component {

    state = {
        bookings:[]
    }

    componentDidMount() {
        var token = Authentication.userToken;
        var BookingSearch = JSON.parse(localStorage.getItem('bookingSearch'));
        if (token) {
            return fetch(`/api/ride/searchride`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    From: BookingSearch.from,
                    To: BookingSearch.to,
                    TravelDate: BookingSearch.date
                }),
            })
                .then(async response => {
                    const data = await response.json();
                    if (!response.ok) {
                        console.log(response);
                        const error = (data && data.message) || response.status;
                        return Promise.reject(error);
                    }

                    this.setState({ bookings: data })
                    console.log(this.state.bookings);
                    return data;
                }).catch(error => {
                    return console.log(error);
                })
        }
    }

    render() {
        const Bookings = this.state.bookings.map((booking, i) => (
            <ButtonBase key={i} style={{ margin: '1rem 4rem' }}>
                <Card className='bookings'>
                    <div>
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
