import React, { Component } from 'react';


export class RideConfirm extends Component {
    render() {
        return (
            <p style={{ color: 'green', fontSize:'1.5rem' }}>Ride is created successfully</p>
            )
    }
}

export class WrongPassword extends Component {
    render() {
        return (
            <p style={{ color: 'red', fontSize: '1.5rem' }}>Sorry wrong username or password</p>
            )
    }
}

export class BookingRequest extends Component {
    render() {
        return (
            <p style={{ color: 'green', fontSize: '1.5rem' }}>Booking request will be send</p>
            )
    }
}

export class ServerError extends Component {
    render() {
        return (
            <p style={{ color: 'red', fontSize: '1.5rem' }}>Sorry internal server is not working</p>
            )
    }
}

export class NoOffer extends Component {
    render() {
        return (
            <p style={{ color: 'blue', fontSize: '1.5rem' }}>No offer is found</p>
            )
    }
}