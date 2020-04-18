import React, { Component } from 'react';
import { TextField, Switch } from '@material-ui/core';
import UserCar from '../Helper/UserCar'

export default class AddNewCar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Number: '',
            Model: '',
            NoofSeat: 0,
        }
    }

    changes = (event) => {
        this.setState({
            ...this.state,
            [event.target.name]: event.target.value
        });
    }

    render() {
        return (
            <div className='add-new-car'>
                <form className='car-details' onSubmit={() => UserCar.AddNewCar(this.state.Number, this.state.Model, this.state.NoofSeat)}>
                    <div className='header'>
                        <div className='head'>
                            <h1>Add a new car</h1>
                            <Switch color="secondary" checked={this.state.checkedB} onChange={this.handleChange} name="checkedB" />
                        </div>
                        <p>we get you the matches asap!</p>

                    </div>
                    <TextField label="CarNumber" style={{ margin: 8 }} InputLabelProps={{ shrink: true }} type='text' value={this.state.Number} onChange={this.changes} name='Number' />
                    <TextField label="Model" style={{ margin: 8 }} InputLabelProps={{ shrink: true }} type='text' value={this.state.Model} onChange={this.changes} name='Model' />
                    <TextField label="Max Number Of Seat" style={{ margin: 8 }} InputLabelProps={{ shrink: true }} type='number' value={this.state.NoofSeat} onChange={this.changes} name='NoofSeat' />  
                    <div>
                        <button type='submit' variant='contained' color='primary'>Submit</button>
                    </div>
                </form>
            </div>
        )
    }
}
