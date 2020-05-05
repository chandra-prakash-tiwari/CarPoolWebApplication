import * as React from 'react';
import { TextField,  Grid, ButtonBase } from '@material-ui/core';
import '../../../css/add-via-points.css';
import RideService from '../../../Services/RideService';
import Icon from '@material-ui/core/Icon';
import DeleteIcon from '@material-ui/icons/Delete';
import ToggleOnIcon from '@material-ui/icons/ToggleOn';
import ToggleOffIcon from '@material-ui/icons/ToggleOff';

type ViaPointsDetails = {
    viaPoints: {
        city: string,
        longitude: number,
        latitude: number
    }[],
    availableSeats: number,
    ratePerKM: number,
    switch: boolean
};

export default class AddViaPointsView extends React.Component<{}, ViaPointsDetails> {
    constructor(props: ViaPointsDetails) {
        super(props)
        this.state = {
            viaPoints: [{
                    city: '',
                    longitude: 0,
                    latitude: 0
                }],
            availableSeats: 0,
            ratePerKM: 0,
            switch:true
        }
    }

    AddNewViaPoint = () => {
        this.setState({ viaPoints: [...this.state.viaPoints, { city: '', longitude: 0, latitude:0 }] })
    }

    EditViaPointDetails = (e: any, index: number) => {
        this.state.viaPoints[index].city = e.target.value;
        this.state.viaPoints[index].longitude = index;
        this.state.viaPoints[index].latitude = index + 1;
        this.setState({ viaPoints:this.state.viaPoints });
    }

    DeleteViaPoint = (index:any) => {
        const list = [...this.state.viaPoints];
        list.splice(index, 1);
        this.setState({ viaPoints: list });
    };

    OnChanges = (event:any) => {
        this.setState({
            ...this.state,
            [event.target.name]: event.target.value
        });
    }

    OnSubmit = (event:any) => {
        event.preventDefault();
        RideService.AddRides(this.state);
        window.location.pathname = '/home';
    }

    render() {
        return (
            <Grid className='add-viaPoints' item md={4} id='viapointdetails'>
                <form className='form'>
                    <div className='header'>
                        <div className='head'>
                            <h1>Add Via Points</h1>
                            <ButtonBase onClick={() => { this.setState({ switch: !this.state.switch }) }}>
                                {this.state.switch ? <ToggleOnIcon className='switch' style={{ color: '#ac4fff' }} /> : <ToggleOffIcon className='switch' style={{ color: '#ffac19' }} />}
                            </ButtonBase>
                        </div>
                        <p>add all new via points</p>
                    </div>
                    {
                        this.state.viaPoints.map((viapoint, index) => {
                            return (
                                <div key={index} className='input-via-points'>
                                    <TextField label={'stop ' + (index + 1)} style={{ width: '70%', marginBottom: '6%' }} InputLabelProps={{ shrink: true }} type='text' value={viapoint.city} onChange={(event) => this.EditViaPointDetails(event, index)} />
                                    <ButtonBase className='icon' onClick={() => this.DeleteViaPoint(index)}><DeleteIcon /></ButtonBase>
                                </div>
                            )
                        })
                    }
                    <ButtonBase className='icon' onClick={this.AddNewViaPoint}><Icon>add_circle</Icon></ButtonBase><br />
                    <TextField label='Available seat' style={{ width: '70%', marginBottom: '6%' }} InputLabelProps={{ shrink: true }} type='number' name='availableSeats' value={this.state.availableSeats} onChange={this.OnChanges} />
                    <TextField label='Rate per km' style={{ width: '70%', marginBottom: '6%' }} InputLabelProps={{ shrink: true }} type='number' name='ratePerKM' value={this.state.ratePerKM} onChange={this.OnChanges} />
                    <button type='submit' className='submitButton' onClick={this.OnSubmit}><span>Submit </span></button>
                </form>
            </Grid>
            )
    }
}