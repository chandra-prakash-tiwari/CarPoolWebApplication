import * as React from 'react';
import { TextField, Chip, Grid, ButtonBase } from '@material-ui/core';
import AddViaPointsView from './AddViaPointsView';
import '../../../css/create-ride.css';
import ToggleOnIcon from '@material-ui/icons/ToggleOn';
import ToggleOffIcon from '@material-ui/icons/ToggleOff';

type RideDetails = {
    from: string,
    to: string,
    date: string,
    time: string,
    showComponent: boolean,
    switch: boolean,
    fromValidity: string,
    toValidity: string,
    dateValidity: string
}

export default class CreateRide extends React.Component<{}, RideDetails> {
    constructor(props: RideDetails) {
        super(props);
        this.state = {
            from: '',
            to: '',
            date: '',
            time: '',
            showComponent: false,
            switch: true,
            fromValidity: '',
            toValidity: '',
            dateValidity:''
        }
    }

    changes = (event: any) => {
        this.setState({
            ...this.state,
            [event.target.name]: event.target.value
        });

        this.validator(event.target.name, event.target.value)
    }

    submit = (event:any) => {
        event.preventDefault();
        if (this.validator('from', this.state.from) && this.validator('to', this.state.to) && this.validator('date', this.state.date)) {
            var data = {
                from: this.state.from,
                to: this.state.to,
                date: this.state.date
            }
            localStorage.setItem('rideDetails', JSON.stringify(data));
            this.setState({ showComponent: true })
        }
    }

    switchChanges = () => {
        this.setState({ switch: !this.state.switch })
    }

    validator(name: any, value: any) {
        switch (name) {
            case 'from':
                if (value.length === 0 || value === null) {
                    this.setState({ fromValidity: 'Please enter starting point' })
                    return false;
                }
                else {
                    this.setState({ fromValidity: '' })
                    return true;
                }
            case 'to':
                if (value.length === 0 || value === null) {
                    this.setState({ toValidity: 'Please enter end point' });
                    return false;
                }
                else {
                    this.setState({ toValidity: '' });
                    return true;
                }
            case 'date':
                if (value.length === 0 || value === null) {
                    this.setState({ dateValidity: 'Please enter date' })
                    return false;
                }
                else {
                    this.setState({ dateValidity: '' })
                    return true;
                }
        }
    }

    render() {
        return (
            <Grid item md={12} container>
                <Grid className='create-ride' item md={4}>
                    <form className='ride-details'>
                        <div className='header'>
                            <div className='head'>
                                <h1>Create Ride</h1>
                                <ButtonBase onClick={this.switchChanges} style={{ marginLeft: '2rem' }}>
                                    {this.state.switch ? <ToggleOnIcon className='switch' style={{ color: '#ac4fff' }} /> : <ToggleOffIcon className='switch' style={{ color: '#ffac19' }} />}
                                </ButtonBase>
                            </div>
                            <p>we get you the matches asap!</p>
                        </div>
                        <TextField label="From" style={{ width: '85%', marginBottom: '6%' }} InputLabelProps={{ shrink: true }} type='text' value={this.state.from} onChange={this.changes} name='from' helperText={this.state.fromValidity} className='input' />
                        <TextField label="To" style={{ width: '85%', marginBottom: '6%' }} InputLabelProps={{ shrink: true }} type='text' value={this.state.to} onChange={this.changes} name='to' helperText={this.state.toValidity} className='input'/>
                        <TextField label="Date" style={{ width: '85%', marginBottom: '6%' }} InputLabelProps={{ shrink: true }} type='date' value={this.state.date} onChange={this.changes} name='date' helperText={this.state.dateValidity} className='input'/>
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
                            <ButtonBase onClick={this.submit}>Next>>></ButtonBase>
                        </div>

                    </form>
                </Grid>
                {this.state.showComponent ?
                    <AddViaPointsView /> :
                    null
                }
            </Grid>
        )
    }
}