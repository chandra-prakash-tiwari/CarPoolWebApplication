import * as React from 'react';
import { TextField, Chip, ButtonBase } from '@material-ui/core';
import '../../../css/book-a-ride.css';
import ToggleOnIcon from '@material-ui/icons/ToggleOn';
import ToggleOffIcon from '@material-ui/icons/ToggleOff';

type JourneyDetails = {
    from?: string,
    to?: string,
    date?: string,
    time?: string,
    switch: boolean,
    fromValidity: string,
    toValidity: string,
    dateValidity:string
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

        this.validator(event.target.name, event.target.value);
    }

    switchChanges = () => {
        this.setState({ switch: !this.state.switch })
    }

    IsNull(value:any) {
        return (value.length === 0 || value === null);
    }

    validator(name: any, value: any) {
        switch (name) {
            case 'from':
                this.IsNull(value) ? this.setState({ fromValidity: 'Please enter starting point' }) : this.setState({ fromValidity: '' });
                return !this.IsNull(value);

            case 'to':
                this.IsNull(value) ? this.setState({ toValidity: 'Please enter end point' }) : this.setState({ toValidity: '' });
                return !this.IsNull(value);

            case 'date':
                this.IsNull(value) ? this.setState({ dateValidity: 'Please enter date' }) : this.setState({ dateValidity: '' });
                return !this.IsNull(value);
        }
    }

    submit = (event:any) => {
        event.preventDefault();
        if (this.validator('from', this.state.from) && this.validator('to', this.state.to) && this.state.date) {
            localStorage.setItem('bookingSearch', JSON.stringify(this.state));
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
                            <ButtonBase onClick={this.switchChanges} style={{ marginLeft:'5rem' }}>
                                {this.state.switch ? <ToggleOnIcon className='switch' style={{ color: '#ac4fff' }} /> : <ToggleOffIcon className='switch' style={{ color: '#ffac19' }}/>}                              
                            </ButtonBase>
                         </div>
                         <p>we get you the matches asap!</p>
                         
                    </div>
                    <TextField label="From" style={{ width: '85%', marginBottom: '6%' }} InputLabelProps={{ shrink: true }} type='text' value={this.state.from} onChange={this.changes} name='from' className='input' helperText={this.state.fromValidity} />
                    <TextField label="To" style={{ width: '85%', marginBottom: '6%' }} InputLabelProps={{ shrink: true }} type='text' value={this.state.to} onChange={this.changes} name='to' className='input ' helperText={this.state.toValidity} />
                    <TextField label="Date" style={{ width: '85%', marginBottom: '6%' }} InputLabelProps={{ shrink: true }} type='date' value={this.state.date} onChange={this.changes} name='date' className='input' helperText={this.state.dateValidity} />
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
                    <button type='submit' onClick={(event) => this.submit(event)} className='submitButton'><span>Submit</span></button>
                 </form>
            </div> 
        )
    }
}