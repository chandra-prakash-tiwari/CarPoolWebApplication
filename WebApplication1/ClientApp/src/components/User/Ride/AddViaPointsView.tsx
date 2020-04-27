import * as React from 'react';
import { TextField, Switch,  Grid, ButtonBase } from '@material-ui/core';
import '../../../css/create-ride.css';
import Services from './Services';

type viaPointsDetails = {
    viaPoints: {
        city: string,
        longitude: number,
        latitude: number
    }[],
    availableSeats: number,
    ratePerKM: number,
};


export default class AddViaPointsView extends React.Component<{}, viaPointsDetails> {
    constructor(props: viaPointsDetails) {
        super(props)
        this.state = {
            viaPoints: [{
                    city: '',
                    longitude: 0,
                    latitude: 0
                }],
            availableSeats: 0,
            ratePerKM: 0,
        }
    }

    addViaPoints = () => {
        this.setState({ viaPoints: [...this.state.viaPoints, { city: '', longitude: 0, latitude:0 }] })
    }

    editViaPoints = (e: any, index: number) => {
        this.state.viaPoints[index].city = e.target.value;
        this.state.viaPoints[index].longitude = index;
        this.state.viaPoints[index].latitude = index + 1;
        this.setState({ viaPoints:this.state.viaPoints });
    }

    changes = (event:any) => {
        this.setState({
            ...this.state,
            [event.target.name]: event.target.value
        });
    }

    submit = () => {
        Services.AddRides(this.state)
    }

    render() {
        return (
            <Grid className='create-ride' item md={4} id='viapointdetails'>
                <form className='ride-details' onSubmit={this.submit}>
                    <div className='header'>
                        <div className='head'>
                            <h1>Create Ride</h1>
                            <Switch color="secondary" name="checkedB" />
                        </div>
                        <p>we get you the matches asap!</p>
                    </div>
                    {
                        this.state.viaPoints.map((viapoint, index) => {
                            return (
                                <div key={index} className='input-via-points'>
                                    <TextField label={'stop ' + (index + 1)} style={{ margin: 8 }} InputLabelProps={{ shrink: true }} type='text' value={viapoint.city} onChange={(event) => this.editViaPoints(event,index)} />
                                </div>
                            )
                        })
                    }
                    <ButtonBase className='add' onClick={this.addViaPoints}><span>+</span></ButtonBase><br />
                    <TextField label='Available seat' style={{ margin: 8 }} InputLabelProps={{ shrink: true }} type='number' name='availableSeats' value={this.state.availableSeats} onChange={this.changes} />
                    <TextField label='Rate per km' style={{ margin: 8 }} InputLabelProps={{ shrink: true }} type='number' name='ratePerKM' value={this.state.ratePerKM} onChange={this.changes} />
                    <button type='submit'>Sumbit </button>
                </form>
            </Grid>
            )
    }
}