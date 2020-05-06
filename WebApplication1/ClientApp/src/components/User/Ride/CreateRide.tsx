import * as React from 'react';
import { TextField, Chip, Grid, ButtonBase } from '@material-ui/core';
import AddViaPointsView from './AddViaPointsView';
import '../../../css/create-ride.css';
import ToggleOnIcon from '@material-ui/icons/ToggleOn';
import ToggleOffIcon from '@material-ui/icons/ToggleOff';
import { CityService } from '../../../Services/CityService';

export class RideDetails {
    from: string;
    to: string;
    date: string
    time: string;
    viaPointComponent: boolean;
    switch: boolean;
    fromError: string;
    toError: string;
    dateError: string;

    constructor(value: any) {
        this.from = value.from;
        this.to = value.to;
        this.date = value.date;
        this.time = value.time;
        this.viaPointComponent = value.time;
        this.switch = value.switch;
        this.fromError = value.fromError;
        this.toError = value.toError;
        this.dateError = value.dateError;
    }
}

export default class CreateRide extends React.Component<{}, RideDetails> {
    constructor(props: RideDetails) {
        super(props);
        this.state = new RideDetails({
            from: '',
            to: '',
            date: '',
            time: '',
            viaPointComponent: false,
            switch: true,
            fromError: '',
            toError: '',
            dateError: ''
        })
    }

    componentDidMount = () => {
        if (sessionStorage.getItem('carDetails') === null) {
            alert("Please add any car for this ride");
            window.location.pathname = '/car';
        }
    }

    onChanges = (event: any) => {
        this.setState({
            ...this.state,
            [event.target.name]: event.target.value
        });
    }

    onSubmit = (event:any) => {
        event.preventDefault();
        if (this.isValidFrom(this.state.from) && this.isValidTo(this.state.to) && this.isValidDate(this.state.date)) {
            var data = {
                from: this.state.from,
                to: this.state.to,
                date: this.state.date
            }
            sessionStorage.setItem('rideDetails', JSON.stringify(data));
            this.setState({ viaPointComponent: true })
        }
    }

    isEmpty(value: string) {
        return !value || (value && value.trim().length === 0);
    }

    isValidCity(value: string) {
        var isValid = CityService.getValidCity(value);
        return isValid.length == 0;
    }

    isValidFrom(value: any) {
        let isEmpty = this.isEmpty(value);
        let isValid = this.isValidCity(value);
        this.setState({ fromError: isEmpty ? 'Please enter source city name' : (isValid ? 'Please enter valid city name' : '') })
        return isEmpty && !isValid;
    }

    isValidTo(value: any) {
        let isEmpty = this.isEmpty(value);
        let isValid = this.isValidCity(value);
        this.setState({ fromError: isEmpty ? 'Please enter destination city name' : (isValid ? 'Please enter valid city name' : '') })
        return isEmpty && !isValid;
    }

    isValidDate(value: any) {
        let isEmpty = this.isEmpty(value);
        this.setState({ fromError: isEmpty ? 'Please enter date' : '' })
        return isEmpty;
    }

    render() {
        return (
            <Grid item md={12} container>
                <Grid className='create-ride' item md={4}>
                    <form className='ride-details'>
                        <div className='header'>
                            <div className='head'>
                                <h1>Create Ride</h1>
                                <ButtonBase onClick={() => this.setState({ switch: !this.state.switch })} style={{ marginLeft: '2rem' }}>
                                    {this.state.switch ? <ToggleOnIcon className='switch' style={{ color: '#ac4fff' }} /> : <ToggleOffIcon className='switch' style={{ color: '#ffac19' }} />}
                                </ButtonBase>
                            </div>
                            <p>we get you the matches asap!</p>
                        </div>
                        <TextField label="From" style={{ width: '85%', marginBottom: '6%' }} InputLabelProps={{ shrink: true }} type='text' value={this.state.from} onChange={(event) => { this.onChanges(event); this.isValidFrom(event.target.value) }} name='from' helperText={this.state.fromError} className='input' />
                        <TextField label="To" style={{ width: '85%', marginBottom: '6%' }} InputLabelProps={{ shrink: true }} type='text' value={this.state.to} onChange={(event) => { this.onChanges(event); this.isValidTo(event.target.value) }} name='to' helperText={this.state.toError} className='input' />
                        <TextField label="Date" style={{ width: '85%', marginBottom: '6%' }} InputLabelProps={{ shrink: true }} type='date' value={this.state.date} onChange={(event) => { this.onChanges(event); this.isValidDate(event.target.value) }} name='date' helperText={this.state.dateError} className='input' />
                        <div className='chips'>
                            <div className='label'>
                                <span>Time</span>
                            </div>
                            <Chip label="5am - 9am" clickable className='chip' />
                            <Chip label="9am - 12am" clickable className='chip' />
                            <Chip label="12pm - 3pm" clickable className='chip' />
                            <Chip label="3pm - 6pm" clickable className='chip' />
                            <Chip label="6pm - 9pm" clickable className='chip' />
                        </div>
                        <div className='nextButton'>
                            <ButtonBase onClick={this.onSubmit}>Next>>></ButtonBase>
                        </div>

                    </form>
                </Grid>
                {this.state.viaPointComponent ?
                    <AddViaPointsView /> :
                    null
                }
            </Grid>
        )
    }
}