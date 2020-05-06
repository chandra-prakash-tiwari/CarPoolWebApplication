import * as React from 'react';
import { TextField, Grid, ButtonBase } from '@material-ui/core';
import CarService from '../../../Services/CarService'
import ToggleOnIcon from '@material-ui/icons/ToggleOn';
import ToggleOffIcon from '@material-ui/icons/ToggleOff';
import '../../../css/add-new-car.css'

export class CarDetails {
    carNumber: string;
    carModel: string;
    noofSeats: number;
    switch: boolean;
    carNumberError: string;
    carModelError: string;
    seatError: string

    constructor() {
        this.carNumber = '';
        this.carModel = '';
        this.noofSeats = 0;
        this.switch = true;
        this.carNumberError = '';
        this.carModelError = '';
        this.seatError = '';
    }
}

export default class AddNewCar extends React.Component<{}, CarDetails> {
    constructor(props: CarDetails) {
        super(props);
        this.state = new CarDetails()
    }

    onChanges = (event: any) => {
        this.setState({
            ...this.state,
            [event.target.name]: event.target.value
        });
    }

    isEmpty(value: string) {
        return !value || (value && value.trim().length === 0);
    }

    isValidCarNumber(value: any) {
        let emptyStatus = this.isEmpty(value);
        this.setState({ carNumberError: emptyStatus ? 'Please enter car number' : '' });
        return emptyStatus;
    }

    isValiCarModel(value: any) {
        let emptyStatus = this.isEmpty(value);
        this.setState({ carNumberError: emptyStatus ? 'Please enter car model' : '' });
        return emptyStatus;
    }

    isValidSeat(value: any) {
        let emptyStatus = this.isEmpty(value);
        let seatValidStatus = value <= 0 ? true : false
        this.setState({ carNumberError: emptyStatus ? 'Please enter no of seats' : (seatValidStatus ? 'Please enter correct seat' : '' )});
        return emptyStatus && !seatValidStatus;
    }

    onSubmit = (event: any) => {
        event.preventDefault();
        if (!this.isValidCarNumber(this.state.carNumber) && !this.isValiCarModel(this.state.carModel) && !this.isValidSeat(this.state.noofSeats)) {
            var carDetails = {
                number: this.state.carNumber,
                model: this.state.carModel,
                noofseat:this.state.noofSeats
            }
            CarService.addNewCar(carDetails).then((response) => {
                if (response == 'Ok') {
                    alert("Car added successfully");
                    window.location.pathname = '/home';
                }
                else if (response == 'Server error') {
                    alert("Server can't do right now try again")
                }
            }) 
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
                    <TextField className='input' label="CarNumber" InputLabelProps={{ shrink: true }} type='text' value={this.state.carNumber} onChange={(event) => { this.onChanges(event); this.isValidCarNumber(event.target.value) }} name='carNumber' />
                    <TextField className='input' label="Model" InputLabelProps={{ shrink: true }} type='text' value={this.state.carModel} onChange={(event) => { this.onChanges(event); this.isValiCarModel(event.target.value) }} name='carModel' />
                    <TextField className='input' label="Max Number Of Seat" InputLabelProps={{ shrink: true }} type='number' value={this.state.noofSeats} onChange={(event) => { this.onChanges(event); this.isValidSeat(event.target.value) }} name='noofSeats' />  
                    <div>
                        <button type='submit' className='submitButton' onClick={this.onSubmit}>Submit</button>
                    </div>
                </form>
            </Grid>
        )
    }
}