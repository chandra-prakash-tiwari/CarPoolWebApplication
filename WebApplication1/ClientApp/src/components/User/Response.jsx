import React, { Component } from 'react';

export class RideConfirm extends Component {
    render() {
        return (
            <p>Ride is created successfully</p>
            )
    }
}

export class WrongPassword extends Component {
    render() {
        return (
            <p>Sorry wrong username or password</p>
            )
    }
}

export class BookingRequest extends Component {
    render() {
        return (
            <p>Booking request will be send</p>
            )
    }
}

export class ServerError extends Component {
    render() {
        return (
            <p>Sorry internal server is not working</p>
            )
    }
}

export class NoOffer extends Component {
    render() {
        return (
            <p>No offer is found</p>
            )
    }
}