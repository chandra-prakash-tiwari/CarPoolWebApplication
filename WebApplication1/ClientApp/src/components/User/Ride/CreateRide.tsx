﻿import * as React from 'react';
import { TextField, Chip, Grid, ButtonBase, Tooltip } from '@material-ui/core';
import AddViaPointsView from './AddViaPointsView';
import Autocomplete from '@material-ui/lab/Autocomplete';
import '../../../css/create-ride.css';
import ToggleOnIcon from '@material-ui/icons/ToggleOn';
import ToggleOffIcon from '@material-ui/icons/ToggleOff';
import { CityService } from '../../../Services/CityService';
import { Ride } from '../../../Classes/DataClasses/Ride';
import { CreateRideMeta } from '../../../Classes/MetaClasses/Ride';
import { Required, Invalid } from '../../../Classes/Constraint';
import RideService from '../../../Services/RideService';

export class RideDetails {
    data: Ride;
    meta: CreateRideMeta;

    constructor() {
        this.data = new Ride();
        this.meta = new CreateRideMeta();
    }
}

export default class CreateRide extends React.Component<{}, RideDetails> {
    constructor(props: RideDetails) {
        super(props);
        this.state = new RideDetails()
    }

    componentDidMount = () => {
        if (window.location.pathname === '/ride/details') {
            if (sessionStorage.getItem('carDetails') === null) {
                window.location.pathname = '/ride/selectcar';
            }

            var today = new Date();
            var todayDate = today.getFullYear() + '-' + ((today.getMonth() + 1) < 10 ? '0' : '') + (today.getMonth() + 1) + '-' + (today.getDate() < 10 ? '0' : '') + today.getDate();
            this.setState({ data: { ...this.state.data, date: todayDate } })
            this.setState({ meta: { ...this.state.meta, validDate: todayDate } })
        }

        else if (window.location.pathname === '/edit/ride/details') {
            if (sessionStorage.getItem('carDetails') === null) {
                window.location.pathname = '/home';
            }
            else {
                RideService.getRideById(sessionStorage.getItem('rideId')).then((response) => {
                    console.log(response)
                    if (response !== undefined)
                        this.setState({ data: { ...this.state.data, from: response.from, to: response.to, date: response.travelDate.split('T')[0] } })
                })
            }
        } 
    }

    onChanges = (event: any) => {
        this.setState({
            ...this.state,
            data: { ...this.state.data, [event.target.name]: event.target.value}      
        });
    }

    onSelect = (value: any, name: string) => {
        this.setState({
            data: { ...this.state.data, [name]: value }
        })
    }

    editTime = (number: number) => {
        this.setState({
            data: { ...this.state.data, time:number }
        })
    }

    onSubmit = (event:any) => {
        event.preventDefault();
        this.isCarAvailable(this.state.data.date, this.state.data.time);
        console.log(!this.isValidFrom(this.state.data.from));
        console.log(!this.isValidTo(this.state.data.to))
        console.log(!this.isValidDate(this.state.data.date))
        console.log(!this.state.meta.carAvailable)
        if (!this.isValidFrom(this.state.data.from) && !this.isValidTo(this.state.data.to) && !this.isValidDate(this.state.data.date) && this.state.meta.carAvailable) {
            sessionStorage.setItem('rideDetails', JSON.stringify(this.state.data));
            this.setState({ meta: { ...this.state.meta, viaPointComponent: true } });
        }
    }

    isEmpty(value: string) {
        return !value || (value && value.trim().length === 0);
    }

    isValidCity(value: string) {
        var isValid = CityService.getValidCity(value);
        return isValid.length == 0;
    }

    isCarAvailable(date: string, time: number) {
        RideService.carAvailableForRide(date, time).then((response) => {
            if (response !== undefined) {
                this.setState({ meta: { ...this.state.meta, carAvailable: response } })
                this.setState({ meta: { ...this.state.meta, carNotAvailableError: response ? '' : 'Car is booked' } })
            }
        })
    }

    isValidFrom(value: any) {
        let isEmpty = this.isEmpty(value);
        let isValid = this.isValidCity(value);
        this.setState({ meta: { ...this.state.meta, fromError: isEmpty ? Required : (isValid ? Invalid : '') } })
        return isEmpty && !isValid;
    }

    isValidTo(value: any) {
        let isEmpty = this.isEmpty(value);
        let isValid = this.isValidCity(value);
        this.setState({ meta: { ...this.state.meta, toError: isEmpty ? Required : (isValid ? Invalid : '') } })
        return isEmpty && !isValid;
    }

    isValidDate(value: any) {
        let isEmpty = this.isEmpty(value);
        this.setState({ meta: { ...this.state.meta, dateError: isEmpty ? Required : '' } })
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
                                <ButtonBase onClick={() => this.setState({ meta: { ...this.state.meta, switch: !this.state.meta.switch } })} style={{ marginLeft: '2rem' }}>
                                    {this.state.meta.switch ? <ToggleOnIcon className='switch' style={{ color: '#ac4fff' }} /> : <ToggleOffIcon className='switch' style={{ color: '#ffac19' }} />}
                                </ButtonBase>
                            </div>
                            <p>we get you the matches asap!</p>
                        </div>
                        <div className='input-box'>
                            <Autocomplete freeSolo options={CityService.getValidCity(this.state.data.from).map((option) => option.city)} onChange={(event: any, newInputvalue: any) => {this.onSelect(newInputvalue, 'from') }} value={this.state.data.from} renderInput={(param) => (
                                <TextField {...param} label="From" style={{ width: '85%' }} InputLabelProps={{ shrink: true }} value={this.state.data.from} type='text' onChange={this.onChanges} name='from' className='input' />
                            )} />
                            <span className='helper'>{this.state.meta.fromError}</span>
                        </div>
                        <div className='input-box'>
                            <Autocomplete freeSolo options={CityService.getValidCity(this.state.data.to).map((option) => option.city)} onChange={(event: any, newInputvalue: any) => { this.onSelect(newInputvalue, 'to') }} value={this.state.data.to} renderInput={(param) => (
                                <TextField {...param} label="To" style={{ width: '85%' }} InputLabelProps={{ shrink: true }} value={this.state.data.to} onChange={this.onChanges} type='text' name='to' className='input' />
                            )} />
                            <span className='helper'>{this.state.meta.toError}</span>
                        </div>
                        <div className='input-box'>
                            <TextField label="Date" style={{ width: '85%' }} InputLabelProps={{ shrink: true }} type='date' value={this.state.data.date} onChange={(event) => { this.onChanges(event); this.isValidDate(event.target.value) }} name='date' className='input' />
                            <span className='helper'>{this.state.meta.dateError}</span>
                        </div>
                        <div className='chips'>
                            <div className='label'>
                                <span>Time</span>
                            </div>
                            <Chip label="5am - 9am" clickable className='chip' onClick={() => this.editTime(1)} style={{ backgroundColor: this.state.data.time === 1 ?'#ac4fff':'white' }} />
                            <Chip label="9am - 12am" clickable className='chip' onClick={() => this.editTime(2)}style={{ backgroundColor: this.state.data.time === 2 ?'#ac4fff':'white'}} />
                            <Chip label="12pm - 3pm" clickable className='chip' onClick={() => this.editTime(3)}style={{ backgroundColor: this.state.data.time === 3 ?'#ac4fff':'white'}} />
                            <Chip label="3pm - 6pm" clickable className='chip' onClick={() => this.editTime(4)} style={{ backgroundColor: this.state.data.time === 4 ?'#ac4fff':'white'}}/>
                            <Chip label="6pm - 9pm" clickable className='chip' onClick={() => this.editTime(5)} style={{ backgroundColor: this.state.data.time === 5 ?'#ac4fff':'white'}}/>
                        </div>
                        <span className='helper'>{this.state.meta.carNotAvailableError}</span>
                        <div className='nextButton' onClick={this.onSubmit}>Next>>></div>
                    </form>
                </Grid>
                {this.state.meta.viaPointComponent ?
                    <AddViaPointsView /> :
                    null
                }
            </Grid>
        )
    }
}