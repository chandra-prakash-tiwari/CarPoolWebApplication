import * as React from 'react';
import { TextField, Grid, ButtonBase } from '@material-ui/core';
import CarService from '../../../Services/CarService'
import ToggleOnIcon from '@material-ui/icons/ToggleOn';
import ToggleOffIcon from '@material-ui/icons/ToggleOff';
import '../../../css/add-new-car.css'
import { Car } from '../../../Classes/DataClasses/Car';
import { AddNewCarMeta } from '../../../Classes/MetaClasses/Car';
import { ServerError } from '../Response';

export class AddNewCarProps {
    data: Car;
    meta: AddNewCarMeta;

    constructor() {
        this.data = new Car();
        this.meta = new AddNewCarMeta();
    }
}

export default class AddNewCar extends React.Component<{}, AddNewCarProps> {
    constructor(props: AddNewCarProps) {
        super(props);
        this.state = new AddNewCarProps()
    }

    onChanges = (event: any) => {
        this.setState({
            ...this.state,
            data: { ...this.state.data, [event.target.name]: event.target.value}
        });
    }

    isEmpty(value: string) {
        return !value || (value && value.trim().length === 0);
    }

    isValidCarNumber(value: any) {
        let emptyStatus = this.isEmpty(value);
        this.setState({ meta: { ...this.state.meta, carNumberError: emptyStatus ? 'Please enter car number' : '' } });
        return emptyStatus;
    }

    isValiCarModel(value: any) {
        let emptyStatus = this.isEmpty(value);
        this.setState({ meta: { ...this.state.meta, carNumberError: emptyStatus ? 'Please enter car model' : '' } });
        return emptyStatus;
    }

    isValidSeat(value: any) {
        let emptyStatus = this.isEmpty(value);
        let seatValidStatus = value <= 0 ? true : false
        this.setState({ meta: { ...this.state.meta, carNumberError: emptyStatus ? 'Please enter no of seats' : (seatValidStatus ? 'Please enter correct seat' : '') }});
        return emptyStatus && !seatValidStatus;
    }

    onSubmit = (event: any) => {
        event.preventDefault();
        if (!this.isValidCarNumber(this.state.data.number) && !this.isValiCarModel(this.state.data.model) && !this.isValidSeat(this.state.data.noofSeats)) {
            CarService.addNewCar(this.state.data).then((response) => {
                if (response == 'Ok') {
                    window.location.pathname = '/car';
                }
                else if (response == 'Server error') {
                    this.setState({ meta: { ...this.state.meta, serverError: true } })
                }
            }) 
        }
    }

    render() {
        return (!this.state.meta.serverError?
            <Grid item md={4} className='add-new-car'>
                <form className='car-details'>
                    <div className='header'>
                        <div className='head'>
                            <h1>Add new car</h1>
                            <ButtonBase onClick={() => { this.setState({ meta: { ...this.state.meta, switch: !this.state.meta.switch } }) }} style={{ marginLeft: '5rem' }}>
                                {this.state.meta.switch ? <ToggleOnIcon className='switch' style={{ color: '#ac4fff' }} /> : <ToggleOffIcon className='switch' style={{ color: '#808080' }} />}
                            </ButtonBase>
                        </div>
                        <p>we get you the matches asap!</p>
                    </div>
                    <TextField className='input' label="CarNumber" InputLabelProps={{ shrink: true }} type='text' value={this.state.data.number} onChange={(event) => { this.onChanges(event); this.isValidCarNumber(event.target.value) }} name='number' helperText={this.state.meta.carNumberError} />
                    <TextField className='input' label="Model" InputLabelProps={{ shrink: true }} type='text' value={this.state.data.model} onChange={(event) => { this.onChanges(event); this.isValiCarModel(event.target.value) }} name='model' helperText={this.state.meta.carModelError} />
                    <TextField className='input' label="Max Number Of Seat" InputLabelProps={{ shrink: true }} type='number' value={this.state.data.noofSeats} onChange={(event) => { this.onChanges(event); this.isValidSeat(event.target.value) }} name='noofSeats' helperText={this.state.meta.seatError} />  
                    <div>
                        <button type='submit' className='submitButton' onClick={this.onSubmit}>Submit</button>
                    </div>
                </form>
            </Grid> : <ServerError/>
        )
    }
}