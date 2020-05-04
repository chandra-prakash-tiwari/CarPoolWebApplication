import * as React from 'react';
import { TextField, Grid, ButtonBase } from '@material-ui/core';
import Services from './Services';
import ToggleOnIcon from '@material-ui/icons/ToggleOn';
import ToggleOffIcon from '@material-ui/icons/ToggleOff';

type Car ={
    carNumber?: string,
    carModel?: string,
    noofSeats: number,
    switch:boolean
}

export default class AddNewCar extends React.Component<{},Car> {
    constructor(props: Car) {
        super(props);
        this.state = {
            carNumber: '',
            carModel: '',
            noofSeats: 0,
            switch: true
        }
    }

    changes = (event: any) => {
        this.setState({
            ...this.state,
            [event.target.name]: event.target.value
        });
    }

    switchChanges = () => {
        this.setState({ switch: !this.state.switch })
    }

    submit = (event: any) => {
        event.preventDefault();
        Services.AddNewCar(this.state);
        window.location.pathname = '/home';
    }

    render() {
        return (
            <Grid item md={4} className='add-new-car'>
                <form className='car-details'>
                    <div className='header'>
                        <div className='head'>
                            <h1>Add new car</h1>
                            <ButtonBase onClick={this.switchChanges} style={{ marginLeft: '5rem' }}>
                                {this.state.switch ? <ToggleOnIcon className='switch' style={{ color: '#ac4fff' }} /> : <ToggleOffIcon className='switch' style={{ color: '#808080' }} />}
                            </ButtonBase>
                        </div>
                        <p>we get you the matches asap!</p>
                    </div>
                    <TextField className='input' label="CarNumber" InputLabelProps={{ shrink: true }} type='text' value={this.state.carNumber}  onChange={this.changes} name='carNumber' />
                    <TextField className='input' label="Model" InputLabelProps={{ shrink: true }} type='text' value={this.state.carModel} onChange={this.changes} name='carModel' />
                    <TextField className='input' label="Max Number Of Seat" InputLabelProps={{ shrink: true }} type='number' value={this.state.noofSeats} onChange={this.changes} name='noofSeats' />  
                    <div>
                        <button type='submit' className='submitButton' onClick={this.submit}>Submit</button>
                    </div>
                </form>
            </Grid>
        )
    }
}