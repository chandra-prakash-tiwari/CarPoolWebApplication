﻿import * as React from 'react'
import { Card, ButtonBase } from '@material-ui/core';
import '../../../css/car-selector.css';
import Services from './Services.js';

type allCars = {
    cars: [];
}

export default class CarSelector extends React.Component<{}, allCars> {
    constructor(props: allCars) {
        super(props);
        this.state = {
            cars: []
        }
    }

    componentDidMount() {
        var data = Services.GetCars();
        data.then((myCars) => this.setState({ cars: myCars }))
    }

    handleclick = (carRecord:any) => {
        localStorage.setItem('carDetails', JSON.stringify(carRecord));
        window.location.pathname = '/createride';
    }

    render() {

        const carDetails = this.state.cars.map((carRecord:any, i) => (
            <ButtonBase key={i} onClick={() => this.handleclick(carRecord)} >
                < Card className='car-cards'>
                     <p className='car-details'>Model : {carRecord.model}</p>
                     <p className='car-details'>Car Number : {carRecord.number}</p>
                     <p className='car-details'>MAX NUMBER OF SEAT: {carRecord.noofSeat}</p>
                </Card>
            </ButtonBase>
        ))

        return (
            <div className='car-selectors'>
                <div className='header'>
                    <p className='head'>Select a car for a ride or add new car</p>
                </div>
                <div className='user-cars'>{carDetails}</div>
                <ButtonBase href='/car/addnewcar' >
                    < Card className='car-cards'>
                        <div className='add-car'>+</div>
                    </Card>
                </ButtonBase>
            </div>
        )
    }
}