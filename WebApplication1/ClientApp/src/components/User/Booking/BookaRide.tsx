import * as React from 'react';
import { TextField, Chip, ButtonBase } from '@material-ui/core';
import '../../../css/book-a-ride.css';
import ToggleOnIcon from '@material-ui/icons/ToggleOn';
import ToggleOffIcon from '@material-ui/icons/ToggleOff';

export class JourneyDetails {
    from: string;
    to: string;
    date: string;
    time: string;
    switch: boolean;
    fromError: string;
    toError: string;
    dateError: string;

    constructor(value: any) {
        this.from= value.from;
        this.to= value.to;
        this.date = value.date;
        this.time = value.time;
        this.switch = value.switch;
        this.fromError = value.fromError;
        this.toError = value.toError;
        this.dateError = value.dateError;
    }
}

export default class BookaRide extends React.Component<{}, JourneyDetails> {
    constructor(props: JourneyDetails) {
        super(props);
        this.state = {
            from: '',
            to: '',
            date: '',
            time: '',
            switch: true,
            fromError: '',
            toError: '',
            dateError:''
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

    FromCityValidatity(value: any) {
        let isEmpty = this.IsEmpty(value);
        this.setState({ fromError: isEmpty ? 'Please enter source city name' : '' })
        return isEmpty;
    }

    ToCityValidatity(value: any) {
        let isEmpty = this.IsEmpty(value);
        this.setState({ fromError: isEmpty ? 'Please enter destination city name' : '' })
        return isEmpty;
    }

    DateValidatity(value: any) {
        let isEmpty = this.IsEmpty(value);
        this.setState({ fromError: isEmpty ? 'Please enter date' : '' })
        return isEmpty;
    }

    OnSubmit = (event:any) => {
        event.preventDefault();
        if (!this.FromCityValidatity(this.state.from) && !this.ToCityValidatity(this.state.to) && !this.DateValidatity(this.state.date)) {
            var data = {
                from: this.state.from,
                to: this.state.to,
                date: this.state.date
            }
            localStorage.setItem('bookingSearch', JSON.stringify(data));
            window.location.pathname = '/booking/search';
        }
    }
    
    render() {
        return (
            <div className='booking-a-ride'>
                 <form className='journey-details'>
                     <div className='header'>
                         <div className='head'>
                            <h1>Book a Ride</h1>
                            <ButtonBase onClick={() => this.setState({ switch: !this.state.switch })} style={{ marginLeft: '5rem' }}>
                                {this.state.switch ? <ToggleOnIcon className='switch' style={{ color: '#ac4fff' }} /> : <ToggleOffIcon className='switch' style={{ color: '#ffac19' }}/>}                              
                            </ButtonBase>
                         </div>
                         <p>we get you the matches asap!</p>
                         
                    </div>
                    <TextField label="From" style={{ width: '85%', marginBottom: '6%' }} InputLabelProps={{ shrink: true }} type='text' value={this.state.from} onChange={(event) => { this.OnChanges(event); this.FromCityValidatity(event.target.value) }} name='from' className='input' helperText={this.state.fromError} />
                    <TextField label="To" style={{ width: '85%', marginBottom: '6%' }} InputLabelProps={{ shrink: true }} type='text' value={this.state.to} onChange={(event) => { this.OnChanges(event); this.ToCityValidatity(event.target.value) }} name='to' className='input ' helperText={this.state.toError} />
                    <TextField label="Date" style={{ width: '85%', marginBottom: '6%' }} InputLabelProps={{ shrink: true }} type='date' value={this.state.date} onChange={(event) => { this.OnChanges(event); this.DateValidatity(event.target.value) }} name='date' className='input' helperText={this.state.dateError} />
                     <div className='chips'>
                         <div className='label'>
                             <span>Time</span>
                        </div>
                        <Chip label="5am - 9am" clickable className='chip' />
                        <Chip label="9am - 12am" clickable className='chip'/>
                        <Chip label="12pm - 3pm" clickable className='chip'/>
                        <Chip label="3pm - 6pm" clickable className='chip' />
                        <Chip label="6pm - 9pm" clickable className='chip' />
                    </div>
                    <button type='submit' onClick={(event) => this.OnSubmit(event)} className='submitButton'><span>Submit</span></button>
                 </form>
            </div> 
        )
    }
}