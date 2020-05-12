import * as React from 'react';
import { TextField, Chip, ButtonBase, Tooltip, Grid } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import '../../../css/book-a-ride.css';
import ToggleOnIcon from '@material-ui/icons/ToggleOn';
import ToggleOffIcon from '@material-ui/icons/ToggleOff';
import { Booking } from '../../../Classes/DataClasses/Booking';
import { BookARideMeta } from '../../../Classes/MetaClasses/Booking';
import { CityService } from '../../../Services/CityService';

export class BookARideProps {
    data: Booking;
    meta: BookARideMeta;

    constructor() {
        this.data = new Booking();
        this.meta = new BookARideMeta()
    }
}

export default class BookaRide extends React.Component<{}, BookARideProps> {
    constructor(props: BookARideProps) {
        super(props);
        this.state = new BookARideProps()
    } 

    componentDidMount() {
        if (window.location.pathname === '/booking/search') {
            var bookingSearch = sessionStorage.getItem('bookingSearch');
            if (bookingSearch !== null) {
                var booking = JSON.parse(bookingSearch);
                this.state.data.from = booking.from;
                this.state.data.to = booking.to;
                this.state.data.date = booking.date;
                this.setState({ data: this.state.data });
            }
            else {
                window.location.pathname = '/booking';
            }
        }
    }

    onChanges = (event: any) => {
        this.setState({
            ...this.state,
            data: { ...this.state.data, [event.target.name]: event.target.value}
        });
    }

    onSelect = (value: any, name: string) => {
        this.setState({
            data: { ...this.state.data, [name]: value }
        })
    }

    isEmpty(value: string) {
        return !value || (value && value.trim().length === 0);
    }

    isValidFromCityName(value: any) {
        let emptyStatus = this.isEmpty(value);
        this.setState({ meta: { ...this.state.meta, fromError: emptyStatus ? 'Please enter source city name' : '' } })
        return emptyStatus;
    }

    isValidToCityName(value: any) {
        let emptyStatus = this.isEmpty(value);
        this.setState({ meta: { ...this.state.meta, fromError: emptyStatus ? 'Please enter destination city name' : '' } })
        return emptyStatus;
    }

    isValidDate(value: any) {
        let emptyStatus = this.isEmpty(value);
        this.setState({ meta: { ...this.state.meta, fromError: emptyStatus ? 'Please enter date' : '' } })
        return emptyStatus;
    }

    onSubmit = (event:any) => {
        event.preventDefault();
        if (!this.isValidFromCityName(this.state.data.from) && !this.isValidToCityName(this.state.data.to) && !this.isValidDate(this.state.data.date)) {
            console.log(this.state.data);
            sessionStorage.setItem('bookingSearch', JSON.stringify(this.state.data));
            window.location.pathname = '/booking/search';
        }
    }
    
    render() {
        return (
            <Grid md={12} item className='booking-a-ride'>
                 <form className='journey-details'>
                     <div className='header'>
                         <div className='head'>
                            <h1>Book a Ride</h1>
                            <ButtonBase onClick={() => this.setState({ meta: { ...this.state.meta, switch: !this.state.meta.switch } })} style={{ marginLeft: '5rem' }}>
                                {this.state.meta.switch ? <ToggleOnIcon className='switch' style={{ color: '#ac4fff' }} /> : <ToggleOffIcon className='switch' style={{ color: '#ffac19' }}/>}                              
                            </ButtonBase>
                         </div>
                         <p>we get you the matches asap!</p>
                    </div>
                    <Tooltip title={this.state.meta.fromError} placement='bottom-start'>
                        <Autocomplete options={CityService.getValidCity(this.state.data.from).map((option) => option.city)} onChange={(event: any, newInputvalue: any) => { this.onSelect(newInputvalue, 'from') }} value={this.state.data.from} renderInput={(param) => (
                            <TextField {...param} label="From" style={{ width: '85%', marginBottom: '6%' }} InputLabelProps={{ shrink: true }} type='text' value={this.state.data.from} onChange={(event) => { this.onChanges(event); this.isValidFromCityName(event.target.value) }} name='from' className='input' />
                        )}
                        />
                    </Tooltip>
                    <Tooltip title={this.state.meta.toError} placement='right'>
                        <Autocomplete freeSolo options={CityService.getValidCity(this.state.data.to).map((option) => option.city)} onChange={(event: any, newInputvalue: any) => { this.onSelect(newInputvalue, 'to') }} value={this.state.data.to} renderInput={(param) => (
                            <TextField {...param} label="To" style={{ width: '85%', marginBottom: '6%' }} InputLabelProps={{ shrink: true }} type='text' value={this.state.data.to} onChange={(event) => { this.onChanges(event); this.isValidToCityName(event.target.value) }} name='to' className='input ' helperText={this.state.meta.toError} />
                        )}
                        />
                    </Tooltip>
                    <TextField label="Date" style={{ width: '85%', marginBottom: '6%' }} InputLabelProps={{ shrink: true }} type='date' value={this.state.data.date} onChange={(event) => { this.onChanges(event); this.isValidDate(event.target.value) }} name='date' className='input' helperText={this.state.meta.dateError} />
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
                    <button type='submit' onClick={(event) => this.onSubmit(event)} className='submitButton'><span>Submit</span></button>
                </form>
            </Grid> 
        )
    }
}