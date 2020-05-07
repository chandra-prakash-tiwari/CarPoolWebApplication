import * as React from 'react';
import { TextField, Chip, Grid, ButtonBase, Tooltip } from '@material-ui/core';
import AddViaPointsView from './AddViaPointsView';
import Autocomplete from '@material-ui/lab/Autocomplete';
import '../../../css/create-ride.css';
import ToggleOnIcon from '@material-ui/icons/ToggleOn';
import ToggleOffIcon from '@material-ui/icons/ToggleOff';
import { CityService } from '../../../Services/CityService';
import { Ride } from '../../../Classes/DataClasses/Ride';
import { CreateRideMeta } from '../../../Classes/MetaClasses/Ride';

export class RideDetails {
    data: Ride;
    meta: CreateRideMeta;

    constructor() {
        this.data = new Ride();
        this.meta = new CreateRideMeta();
    }
}

export default class CreateRide extends React.Component<{}, RideDetails> {
    constructor(props: RideDetails) {
        super(props);
        this.state = new RideDetails()
    }

    componentDidMount = () => {
        if (sessionStorage.getItem('carDetails') === null) {
            alert("Please add any car for this ride");
            window.location.pathname = '/car';
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

    onSubmit = (event:any) => {
        event.preventDefault();
        if (!this.isValidFrom(this.state.data.from) && !this.isValidTo(this.state.data.to) && !this.isValidDate(this.state.data.date)) {
            sessionStorage.setItem('rideDetails', JSON.stringify(this.state.data));
            this.setState({ meta: { ...this.state.meta, viaPointComponent: true } })
        }
    }

    isEmpty(value: string) {
        return !value || (value && value.trim().length === 0);
    }

    isValidCity(value: string) {
        var isValid = CityService.getValidCity(value);
        return isValid.length == 0;
    }

    isValidFrom(value: any) {
        let isEmpty = this.isEmpty(value);
        let isValid = this.isValidCity(value);
        this.setState({ meta: { ...this.state.meta, fromError: isEmpty ? 'Please enter source city name' : (isValid ? 'Please enter valid city name' : '') }})
        return isEmpty && !isValid;
    }

    isValidTo(value: any) {
        let isEmpty = this.isEmpty(value);
        let isValid = this.isValidCity(value);
        this.setState({ meta: { ...this.state.meta, fromError: isEmpty ? 'Please enter destination city name' : (isValid ? 'Please enter valid city name' : '') }})
        return isEmpty && !isValid;
    }

    isValidDate(value: any) {
        let isEmpty = this.isEmpty(value);
        this.setState({ meta: { ...this.state.meta, fromError: isEmpty ? 'Please enter date' : '' }})
        return isEmpty;
    }

    render() {
        return (
            <Grid item md={12} container>
                <Grid className='create-ride' item md={4}>
                    <form className='ride-details'>
                        <div className='header'>
                            <div className='head'>
                                <h1>Create Ride</h1>
                                <ButtonBase onClick={() => this.setState({ meta: { ...this.state.meta, switch: !this.state.meta.switch } })} style={{ marginLeft: '2rem' }}>
                                    {this.state.meta.switch ? <ToggleOnIcon className='switch' style={{ color: '#ac4fff' }} /> : <ToggleOffIcon className='switch' style={{ color: '#ffac19' }} />}
                                </ButtonBase>
                            </div>
                            <p>we get you the matches asap!</p>
                        </div>
                        <Tooltip title={this.state.meta.fromError} placement='left'>
                            <Autocomplete freeSolo options={CityService.getValidCity(this.state.data.from).map((option) => option.city)} onChange={(event: any, newInputvalue: any) => { this.onSelect(newInputvalue, 'from') }} renderInput={(param) => (
                                <TextField {...param} label="From" style={{ width: '85%', marginBottom: '6%' }} InputLabelProps={{ shrink: true }} type='text' name='from' className='input' />
                            )} />
                        </Tooltip>
                        <Tooltip title={this.state.meta.toError} placement='left'>
                            <Autocomplete freeSolo options={CityService.getValidCity(this.state.data.to).map((option) => option.city)} onChange={(event: any, newInputvalue: any) => { this.onSelect(newInputvalue, 'to') }} renderInput={(param) => (
                                <TextField {...param} label="To" style={{ width: '85%', marginBottom: '6%' }} InputLabelProps={{ shrink: true }} type='text'name='to' className='input' />
                            )} />
                        </Tooltip>
                        <Tooltip title={this.state.meta.dateError} placement='left'>
                            <TextField label="Date" style={{ width: '85%', marginBottom: '6%' }} InputLabelProps={{ shrink: true }} type='date' value={this.state.data.date} onChange={(event) => { this.onChanges(event); this.isValidDate(event.target.value) }} name='date' className='input' />
                        </Tooltip>
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
                            <ButtonBase onClick={this.onSubmit}>Next>>></ButtonBase>
                        </div>

                    </form>
                </Grid>
                {this.state.meta.viaPointComponent ?
                    <AddViaPointsView /> :
                    null
                }
            </Grid>
        )
    }
}