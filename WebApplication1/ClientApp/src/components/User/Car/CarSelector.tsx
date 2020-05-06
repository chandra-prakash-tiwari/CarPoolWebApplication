import * as React from 'react'
import { Card, ButtonBase } from '@material-ui/core';
import '../../../css/car-selector.css';
import CarService from '../../../Services/CarService'

export class UserCar {
    cars: Array<any>;

    constructor(value: any) {
        this.cars = value.cars;
    }
}

export default class CarSelector extends React.Component<{}, UserCar> {
    constructor(props: UserCar) {
        super(props);
        this.state = new UserCar({
            cars: []
        })
    }

    componentDidMount() {
        CarService.GetCars().then((response) => {
            console.log(response)
            if (response != undefined) {
                this.setState({ cars: response })
            }
        })
    }

    OnSubmit = (carRecord:any) => {
        localStorage.setItem('carDetails', JSON.stringify(carRecord));
        window.location.pathname = '/createride';
    }

    render() {
        const carDetails = this.state.cars.map((carRecord: any, i) => (
            <ButtonBase key={i} onClick={() => this.OnSubmit(carRecord)} >
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