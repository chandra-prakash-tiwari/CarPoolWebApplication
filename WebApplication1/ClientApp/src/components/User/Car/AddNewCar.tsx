﻿import * as React from 'react';
import { TextField, Grid, ButtonBase } from '@material-ui/core';
import CarService from '../../../Services/CarService'
import ToggleOnIcon from '@material-ui/icons/ToggleOn';
import ToggleOffIcon from '@material-ui/icons/ToggleOff';
import '../../../css/add-new-car.css'

type CarDetails ={
    carNumber?: string,
    carModel?: string,
    noofSeats: number,
    switch: boolean,
    carNumberError: string,
    carModelError: string,
    seatError:string
}

export default class AddNewCar extends React.Component<{}, CarDetails> {
    constructor(props: CarDetails) {
        super(props);
        this.state = {
            carNumber: '',
            carModel: '',
            noofSeats: 0,
            switch: true,
            carNumberError: '',
            carModelError: '',
            seatError:''
        }
    }

    OnChanges = (event: any) => {
        this.setState({
            ...this.state,
            [event.target.name]: event.target.value
        });
    }

    IsEmpty(value: string) {
        return !value || (value && value.trim().length === 0);
    }

    CarNumberValidator(value: any) {
        let isEmpty = this.IsEmpty(value);
        this.setState({ carNumberError: this.IsEmpty ? 'Please enter car number' : '' });
        return isEmpty;
    }

    CarModelValidator(value: any) {
        let isEmpty = this.IsEmpty(value);
        this.setState({ carNumberError: this.IsEmpty ? 'Please enter car model' : '' });
        return isEmpty;
    }

    SeatValidator(value: any) {
        let isEmpty = this.IsEmpty(value);
        let isValid = value <= 0 ? true : false
        this.setState({ carNumberError: this.IsEmpty ? 'Please enter no of seats' : (isValid ? 'Please enter correct seat' : '' )});
        return isEmpty && !isValid;
    }

    OnSubmit = (event: any) => {
        event.preventDefault();
        if (!this.CarNumberValidator(this.state.carNumber) && !this.CarModelValidator(this.state.carModel) && !this.SeatValidator(this.state.noofSeats)) {
            CarService.AddNewCar(this.state);
            window.location.pathname = '/home';
        }
    }

    render() {
        return (
            <Grid item md={4} className='add-new-car'>
                <form className='car-details'>
                    <div className='header'>
                        <div className='head'>
                            <h1>Add new car</h1>
                            <ButtonBase onClick={() => { this.setState({ switch: !this.state.switch })}} style={{ marginLeft: '5rem' }}>
                                {this.state.switch ? <ToggleOnIcon className='switch' style={{ color: '#ac4fff' }} /> : <ToggleOffIcon className='switch' style={{ color: '#808080' }} />}
                            </ButtonBase>
                        </div>
                        <p>we get you the matches asap!</p>
                    </div>
                    <TextField className='input' label="CarNumber" InputLabelProps={{ shrink: true }} type='text' value={this.state.carNumber} onChange={(event) => { this.OnChanges(event); this.CarNumberValidator(event.target.value) }} name='carNumber' />
                    <TextField className='input' label="Model" InputLabelProps={{ shrink: true }} type='text' value={this.state.carModel} onChange={(event) => { this.OnChanges(event); this.CarModelValidator(event.target.value) }} name='carModel' />
                    <TextField className='input' label="Max Number Of Seat" InputLabelProps={{ shrink: true }} type='number' value={this.state.noofSeats} onChange={(event) => { this.OnChanges(event); this.SeatValidator(event.target.value) }} name='noofSeats' />  
                    <div>
                        <button type='submit' className='submitButton' onClick={this.OnSubmit}>Submit</button>
                    </div>
                </form>
            </Grid>
        )
    }
}