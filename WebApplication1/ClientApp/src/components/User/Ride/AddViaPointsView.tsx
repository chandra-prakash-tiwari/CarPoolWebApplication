import * as React from 'react';
import { TextField,  Grid, ButtonBase } from '@material-ui/core';
import '../../../css/add-via-points.css';
import Autocomplete from '@material-ui/lab/Autocomplete';
import RideService from '../../../Services/RideService';
import Icon from '@material-ui/core/Icon';
import DeleteIcon from '@material-ui/icons/Delete';
import Pagination from '@material-ui/lab/Pagination';
import ToggleOnIcon from '@material-ui/icons/ToggleOn';
import ToggleOffIcon from '@material-ui/icons/ToggleOff';
import { CityService } from '../../../Services/CityService';
import { RideConfirm, ServerError } from '../Response';

export class ViaPointsDetails {
    cities: ViaCity[];
    availableSeats: number;
    ratePerKM: number;
    carCapacity: number;
    meta: ViaCityMeta;
    offerStatus: boolean;
    rideStatus: boolean;
    serverError: boolean;

    constructor() {
        this.cities = [new ViaCity()];
        this.availableSeats = 0;
        this.ratePerKM = 0;
        this.meta = new ViaCityMeta();
        this.carCapacity = 0;
        this.offerStatus = true;
        this.serverError = false;
        this.rideStatus = false;
    }
};

export class ViaCity {
    city: string;

    constructor() {
        this.city = '';
        
    }
}

export class ViaCityMeta {
    cityError: string
    switch: boolean;

    constructor() {
        this.cityError = '';
        this.switch = true;
    }
}

export default class AddViaPointsView extends React.Component<{}, ViaPointsDetails> {
    constructor(props: ViaPointsDetails) {
        super(props)
        this.state = new ViaPointsDetails()
    }

    componentDidMount() {
        const list = [...this.state.cities];
        list.splice(0, 1);
        this.setState({ cities: list });
        var carDetailsStr = sessionStorage.getItem('carDetails')
        if (carDetailsStr != null) {
            var carDetails = JSON.parse(carDetailsStr);
            this.setState({ ...this.state, carCapacity: carDetails.noofSeat });
        }
    }

    addViaCities = () => {
        this.setState({ cities: [...this.state.cities, { city: '' }] })
    }

    editViaCities = (value: any, index: number) => {
        this.state.cities[index].city = value;
        this.setState({ cities: this.state.cities });
    }

    deleteViaCity = (index: any) => {
        const list = [...this.state.cities];
        list.splice(index, 1);
        this.setState({ cities: list });
    };

    editNoofSeats = (number: number) => {
        this.setState({ availableSeats:number })
    }

    isEmpty(value: string) {
        return !value || (value && value.trim().length === 0);
    }

    isValidCity(value: string) {
        var isValid = CityService.getValidCity(value);
        return isValid.length == 0;
    }

    isValidCityResponse(value: any,index:number) {
        let isEmpty = this.isEmpty(value);
        let isValid = this.isValidCity(value);
        this.setState({ meta: { ...this.state.meta, cityError: isEmpty ? 'Please enter source city name' : (isValid ? 'Please enter valid city name' : '')} })
        return isEmpty && !isValid;
    }

    onChanges = (event:any) => {
        this.setState({
            ...this.state,
            [event.target.name]: event.target.value
        });
    }

    onSubmit = (event:any) => {
        event.preventDefault();
        this.setState({ offerStatus:false })
        RideService.addRides(this.state)?.then((response) => {
            if (response === 'Ok') {
                this.setState({ rideStatus: true })
            }
            else if (response === 'serverError') {
                this.setState({ serverError:true })
            }
        })
    }

    render() {
        return (this.state.offerStatus?
            <Grid className='add-viaPoints' item md={4} id='viapointdetails'>
                <form className='form'>
                    <div className='header'>
                        <div className='head'>
                            <h1>Add Via Points</h1>
                            <ButtonBase onClick={() => { this.setState({ meta: { ...this.state.meta, switch: !this.state.meta.switch } }) }}>
                                {this.state.meta.switch ? <ToggleOnIcon className='switch' style={{ color: '#ac4fff' }} /> : <ToggleOffIcon className='switch' style={{ color: '#ffac19' }} />}
                            </ButtonBase>
                        </div>
                        <p>add all new via points</p>
                    </div>
                    {
                        this.state.cities.map((city, index) => {
                            return (
                                <div key={index} className='input-via-points'>
                                    <Autocomplete freeSolo options={CityService.getValidCity(city.city).map((option) => option.city)} onChange={(event: any, newInputvalue: any) => { this.editViaCities(newInputvalue, index); }} renderInput={(param) => (
                                        <TextField {...param} label={'stop ' + (index + 1)} style={{ width: '70%', marginBottom: '6%' }} InputLabelProps={{ shrink: true }} type='text' onChange={(event: any) => { this.editViaCities(event.target.value, index); }} />
                                    )} />
                                    <ButtonBase className='icon' onClick={() => this.deleteViaCity(index)}><DeleteIcon /></ButtonBase>
                                </div>
                            )
                        })
                    }
                    <ButtonBase className='icon' onClick={this.addViaCities}><Icon>add_circle</Icon></ButtonBase><br />
                    <div>
                        <span>Available seats</span>
                        <Pagination count={this.state.carCapacity} hideNextButton hidePrevButton onChange={(event, number) => this.editNoofSeats(number)} />
                    </div>
                    <TextField label='Rate per km' style={{ width: '70%', marginBottom: '6%' }} InputLabelProps={{ shrink: true }} type='number' name='ratePerKM' value={this.state.ratePerKM} onChange={this.onChanges} />
                    <button type='submit' className='submitButton' onClick={this.onSubmit}><span>Submit </span></button>                 
                </form>
            </Grid> : (
                <div>
                    <div>{this.state.rideStatus ? <RideConfirm /> : ''}</div>
                    <div>{this.state.serverError ? < ServerError />:''}</div>
                </div>
                )
            )
    }
}