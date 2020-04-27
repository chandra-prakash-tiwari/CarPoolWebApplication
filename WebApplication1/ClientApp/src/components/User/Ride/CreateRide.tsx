import * as React from 'react';
import { TextField, Switch, Chip, Grid, ButtonBase } from '@material-ui/core';
import AddViaPointsView from './AddViaPointsView';
import '../../../css/create-ride.css';

type RideDetails = {
    from: '',
    to: '',
    date: '',
    time: '',
    showComponent: false|true
}

export default class CreateRide extends React.Component<{}, RideDetails> {
    constructor(props: RideDetails) {
        super(props);
        this.state = {
            from: '',
            to: '',
            date: '',
            time: '',
            showComponent: false
        }
    }

    changes = (event: any) => {
        this.setState({
            ...this.state,
            [event.target.name]: event.target.value
        });
    }

    submit = () => {
        localStorage.setItem('rideDetails', JSON.stringify(this.state));
        this.setState({ showComponent:true })
    }

    render() {
        return (
            <Grid item md={12} container>
                <Grid className='create-ride' item md={4}>
                    <form className='ride-details'>
                        <div className='header'>
                            <div className='head'>
                                <h1>Create Ride</h1>
                                <Switch color="secondary" name="checkedB" />
                            </div>
                            <p>we get you the matches asap!</p>
                        </div>
                        <TextField label="From" style={{ margin: 8 }} InputLabelProps={{ shrink: true }} type='text' value={this.state.from} onChange={this.changes} name='from' />
                        <TextField label="To" style={{ margin: 8 }} InputLabelProps={{ shrink: true }} type='text' value={this.state.to} onChange={this.changes} name='to' />
                        <TextField label="Date" style={{ margin: 8 }} InputLabelProps={{ shrink: true }} type='date' value={this.state.date} onChange={this.changes} name='date' />
                        <div className='chips'>
                            <div className='label'>
                                <span>Time</span>
                            </div>
                            <Chip label="5am - 9am" style={{ margin: 8 }} color="primary" clickable variant="outlined" />
                            <Chip label="9am - 12am" style={{ margin: 8 }} color="primary" clickable variant="outlined" />
                            <Chip label="12pm - 3pm" style={{ margin: 8 }} color="primary" clickable variant="outlined" />
                            <Chip label="3pm - 6pm" style={{ margin: 8 }} color="primary" clickable variant="outlined" />
                            <Chip label="6pm - 9pm" style={{ margin: 8 }} color="primary" clickable variant="outlined" />
                        </div>
                        <div>
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