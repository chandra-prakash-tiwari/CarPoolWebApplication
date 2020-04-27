import * as React from 'react';
import { TextField, Switch } from '@material-ui/core';
import Services from './Services'

type Car ={
    carNumber?: string,
    carModel?: string,
    noofSeats: number
}

export default class AddNewCar extends React.Component<{},Car> {
    constructor(props: Car) {
        super(props);
        this.state = {
            carNumber: '',
            carModel: '',
            noofSeats:0
        }
    }

    changes = (event: any) => {
        this.setState({
            ...this.state,
            [event.target.name]: event.target.value
        });
    }

    submit = () => {
        Services.AddNewCar(this.state)
    }

    render() {
        return (
            <div className='add-new-car'>
                <form className='car-details'>
                    <div className='header'>
                        <div className='head'>
                            <h1>Add a new car</h1>
                            <Switch color="secondary" name="checkedB" />
                        </div>
                        <p>we get you the matches asap!</p>
                    </div>
                    <TextField label="CarNumber" style={{ margin: 8 }} InputLabelProps={{ shrink: true }} type='text' value={this.state.carNumber}  onChange={this.changes} name='carNumber' />
                    <TextField label="Model" style={{ margin: 8 }} InputLabelProps={{ shrink: true }} type='text' value={this.state.carModel} onChange={this.changes} name='carModel' />
                    <TextField label="Max Number Of Seat" style={{ margin: 8 }} InputLabelProps={{ shrink: true }} type='number' value={this.state.noofSeats} onChange={this.changes} name='noofSeats' />  
                    <div>
                        <button type='submit' color='primary' onClick={this.submit}>Submit</button>
                    </div>
                </form>
            </div>
        )
    }
}