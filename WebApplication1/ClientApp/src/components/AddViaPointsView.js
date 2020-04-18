import React, { Component } from 'react';
import { TextField, Switch, Chip, Grid, ButtonBase, Card } from '@material-ui/core';
import '../css/create-ride.css';
import Authentication from '../Helper/authentication'

export default class AddViaPointsView extends Component {
    constructor(props) {
        super(props)
        this.state = {
            viapoints: [],
            AvailableSeats: 0,
            RatePerKM: 0,
        }
    }

    addViaPoints = () => {
        this.setState({ viapoints: [...this.state.viapoints, ''] })
    }

    editViaPoints = (e, index) => {
        this.state.viapoints[index] = e.target.value;
        this.setState({ viapoint: 'val' })
    }


    submit = () => {
        var token = Authentication.userToken;
        var cardetails = JSON.parse(localStorage.getItem('carSetails'));
        var RideDetails = JSON.parse(localStorage.getItem('rideDetails'));
        if (token) {
            return fetch(`/api/ride/createride`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    From: RideDetails.from,
                    To: RideDetails.to,
                    TravelDate: RideDetails.date,
                    AvailableSeats: 5,
                    OwnerId: cardetails.ownerId,
                    CarId: cardetails.id
                }),
            })
                .then(async response => {
                    const data = await response.json();
                    if (!response.ok) {
                        console.log(response);
                        const error = (data && data.message) || response.status;
                        return Promise.reject(error);
                    }

                    localStorage.removeItem('carSetails');
                    localStorage.removeItem('rideDetails');
                    return data;
                }).catch(error => {
                    return console.log(error);
                })
        }
    }

    render() {
        return (
            <Grid className='create-ride' item md={4} id='viapointdetails'>
                <form className='ride-details' onSubmit={this.submit}>
                    <div className='header'>
                        <div className='head'>
                            <h1>Create Ride</h1>
                            <Switch color="secondary" checked={this.state.checkedB} onChange={this.handleChange} name="checkedB" />
                        </div>
                        <p>we get you the matches asap!</p>
                    </div>
                    {
                        this.state.viapoints.map((viapoint, index) => {
                            return (
                                <div key={index} className='input-via-points'>
                                    <TextField label={'stop ' + (index + 1)} style={{ margin: 8 }} InputLabelProps={{ shrink: true }} type='text' value={viapoint} onChange={(event) => this.editViaPoints(event, index)} />
                                </div>
                            )
                        })
                    }
                    <ButtonBase className='add' onClick={this.addViaPoints}><span>+</span></ButtonBase><br />
                    <TextField label='AvailableSeat' style={{ margin: 8 }} InputLabelProps={{ shrink: true }} type='text'/>
                    <TextField label='' style={{ margin: 8 }} InputLabelProps={{ shrink: true }} type='text'/>
                    <button type='submit'>Sumbit </button>
                </form>
            </Grid>
            )
    }
}