import React, { Component } from 'react';
import Authentication from '../Helper/authentication';
import { ButtonBase, Card, Avatar } from '@material-ui/core';
import '../css/my-rides.css';
import { Button } from 'reactstrap';

export default class MyBookings extends Component {
    constructor() {
        super();
        this.state = {
            bookings: []
        }
    }

    componentDidMount() {
        fetch(`/api/booking/userbooking?ownerId=${Authentication.currentUserId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                Authorization: `Bearer ${Authentication.userToken}`
            }
        }).then(async response => {
            const data = await response.json();
            if (!response.ok) {
                return Promise.reject();
            }
            console.log(data)
            this.setState({ bookings: data })
        }).catch(error => {
            console.log(error);
        })
    }

    render() {

        const RidesDetails = this.state.bookings.map((booking, i) => (
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
