import * as React from 'react'
import { Card, ButtonBase } from '@material-ui/core';
import '../../../css/car-selector.css';
import DeleteIcon from '@material-ui/icons/Delete';
import CarService from '../../../Services/CarService'
import { ServerError } from '../Response';

export class UserCar {
    cars: Array<any>;
    serverError: boolean;
    deleteButton: boolean;
    deleteStatus: boolean;

    constructor() {
        this.cars = [];
        this.serverError = true;
        this.deleteButton = false;
        this.deleteStatus = false;
    }
}

export default class CarSelector extends React.Component<{}, UserCar> {
    constructor(props: UserCar) {
        super(props);
        this.state = new UserCar()
    }

    componentDidMount() {
        CarService.getCars().then((response) => {
            if (response !== undefined && response === 'serverError') {
                this.setState({ serverError:false })
            }
            else if (response !== undefined) {
                this.setState({ cars: response })
            }
        })
    }

    onDelete(id: any) {
        CarService.deleteCar(id).then((response) => {
            if (response === 'ok') {
                window.location.reload();
            }
            else {
                this.setState({ deleteStatus: true })
            }
        })
    }

    onSubmit = (carRecord: any) => {
        if (!this.state.deleteButton) {
            sessionStorage.setItem('carDetails', JSON.stringify(carRecord));
            if (window.location.pathname === '/ride/selectcar') {
                window.location.pathname = '/ride/details';
            }
            else if (window.location.pathname === '/edit/ride/car') {
                window.location.pathname ='/edit/ride/details'
            }
        }
    }

    render() {
        const carDetails = this.state.cars.map((carRecord: any, i) => (
            <ButtonBase key={i}>
                <Card className='car-cards'>
                <div className='delete' onClick={() => this.onDelete(carRecord.id)}><DeleteIcon style={{ color: 'white', fontSize: '1.4rem' }} /></div>
                    <div className='cards' onClick={() => this.onSubmit(carRecord)}>    
                     <p className='car-details'>Model : {carRecord.model}</p>
                     <p className='car-details'>Car Number : {carRecord.number}</p>
                     <p className='car-details'>MAX NUMBER OF SEAT: {carRecord.noofSeat}</p>
                    </div>
                    </Card>
            </ButtonBase>
        ))

        return (this.state.serverError?
            <div className='car-selectors'>
                <div className='header'>
                    <p className='head'>Select a car for a ride or add new car</p>
                </div>
                {this.state.deleteStatus ? <p style={{ fontSize: '1.4rem', margin:'auto 1rem' }}>sorry car is not deleted. car is booked for a ride</p> : null}
                <div className='user-cars'>{carDetails}</div>
                {window.location.pathname ==='/ride/selectcar'?
                    <ButtonBase href='/car/addnewcar' >
                        < Card className='car-cards'>
                            <div className='add-car'>+</div>
                        </Card>
                    </ButtonBase>:''}
            </div> : <ServerError/>
        )
    }
}