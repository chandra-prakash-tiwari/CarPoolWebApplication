import * as React from 'react';
import { TextField,  Grid, ButtonBase } from '@material-ui/core';
import '../../../css/add-via-points.css';
import Autocomplete from '@material-ui/lab/Autocomplete';
import RideService from '../../../Services/RideService';
import Icon from '@material-ui/core/Icon';
import DeleteIcon from '@material-ui/icons/Delete';
import ToggleOnIcon from '@material-ui/icons/ToggleOn';
import ToggleOffIcon from '@material-ui/icons/ToggleOff';
import { CityService } from '../../../Services/CityService';

export class ViaPointsDetails {
    cities: Array<City>;
    availableSeats: number;
    ratePerKM: number;
    switch: boolean;

    constructor() {
        this.cities = [new City()];
        this.availableSeats = 0;
        this.ratePerKM = 0;
        this.switch = true;
    }
};

export class City {
    city: string;
    cityError: string;

    constructor() {
        this.city = '';
        this.cityError=''
    }
}

export default class AddViaPointsView extends React.Component<{}, ViaPointsDetails> {
    constructor(props: ViaPointsDetails) {
        super(props)
        this.state = new ViaPointsDetails()
    }

    addViaCities = () => {
        this.setState({ cities: [...this.state.cities, { city: '', cityError:'' }] })
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
        this.state.cities[index].cityError = isEmpty ? 'Please enter source city name' : (isValid ? 'Please enter valid city name' : '');
        this.setState({ cities: this.state.cities })
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
        RideService.addRides(this.state)?.then((response) => {
            if (response === 'Ok') {
                alert("Ride  is created");
                window.location.pathname = '/home';      
            }
        })
    }

    render() {
        return (
            <Grid className='add-viaPoints' item md={4} id='viapointdetails'>
                <form className='form'>
                    <div className='header'>
                        <div className='head'>
                            <h1>Add Via Points</h1>
                            <ButtonBase onClick={() => { this.setState({ switch: !this.state.switch }) }}>
                                {this.state.switch ? <ToggleOnIcon className='switch' style={{ color: '#ac4fff' }} /> : <ToggleOffIcon className='switch' style={{ color: '#ffac19' }} />}
                            </ButtonBase>
                        </div>
                        <p>add all new via points</p>
                    </div>
                    {
                        this.state.cities.map((city, index) => {
                            return (
                                <div key={index} className='input-via-points'>
                                    <Autocomplete freeSolo options={CityService.getValidCity(city.city).map((option) => option.city)} onChange={(event: any, newInputvalue: any) => { this.editViaCities(newInputvalue, index); }} renderInput={(param) => (
                                        <TextField {...param} label={'stop ' + (index + 1)} style={{ width: '70%', marginBottom: '6%' }} InputLabelProps={{ shrink: true }} type='text'  />
                                    )} />
                                    <ButtonBase className='icon' onClick={() => this.deleteViaCity(index)}><DeleteIcon /></ButtonBase>
                                </div>
                            )
                        })
                    }
                    <ButtonBase className='icon' onClick={this.addViaCities}><Icon>add_circle</Icon></ButtonBase><br />
                    <TextField label='Available seat' style={{ width: '70%', marginBottom: '6%' }} InputLabelProps={{ shrink: true }} type='number' name='availableSeats' value={this.state.availableSeats} onChange={this.onChanges} />
                    <TextField label='Rate per km' style={{ width: '70%', marginBottom: '6%' }} InputLabelProps={{ shrink: true }} type='number' name='ratePerKM' value={this.state.ratePerKM} onChange={this.onChanges} />
                    <button type='submit' className='submitButton' onClick={this.onSubmit}><span>Submit </span></button>
                </form>
            </Grid>
            )
    }
}