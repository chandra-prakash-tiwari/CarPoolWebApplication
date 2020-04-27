import * as React from 'react';
import { TextField, Switch, Chip, Grid } from '@material-ui/core';
import '../../../css/book-a-ride.css'

type journeyDetails = {
    from?: string,
    to?: string,
    date?: string,
    time?: string
}

export default class BookaRide extends React.Component<{}, journeyDetails> {
    constructor(props: journeyDetails) {
        super(props);
        this.state = {
            from: '',
            to: '',
            date: '',
            time: '',
        }
    } 

    changes = (event: any) => {
        this.setState({
            ...this.state,
            [event.target.name]: event.target.value
        });
    }

    submit = (event:any) => {
        event.preventDefault();
        localStorage.setItem('bookingSearch', JSON.stringify(this.state));
        window.location.pathname = '/booking/search';
    }
    
    render() {
        return (
            <div className='booking-a-ride'>
                 <form className='journey-details' onSubmit={this.submit}>
                     <div className='header'>
                         <div className='head'>
                             <h1>Book a Ride</h1>
                             <Switch color="secondary" name="checkedB" />
                         </div>
                         <p>we get you the matches asap!</p>
                         
                     </div>
                     <TextField label="From" style={{ margin: 8 }} InputLabelProps={{ shrink: true }} type='text' value={this.state.from} onChange={this.changes} name='from'/>
                     <TextField label="To" style={{ margin: 8 }} InputLabelProps={{ shrink: true }} type='text' value={this.state.to} onChange={this.changes} name='to'/>
                     <TextField label="Date" style={{ margin: 8 }} InputLabelProps={{ shrink: true }} type='date' value={this.state.date} onChange={this.changes} name='date'/>
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
                         <button type='submit' color='primary'>Submit</button>
                     </div>
                 </form>
            </div> 
        )
    }
}
