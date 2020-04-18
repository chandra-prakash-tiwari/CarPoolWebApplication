import React, { Component } from 'react'
import { Card, ButtonBase } from '@material-ui/core';
import Authentication from '../Helper/authentication'
import Ride from '../Helper/Ride'
import '../css/car-selector.css'
import { connect } from 'react-redux';

class CarSelector extends Component {
    constructor() {
        super();
        this.state = {
            cars: []
        }
    }

    componentDidMount() {
        fetch(`/api/car/cars?ownerId=${Authentication.currentUserId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                Authorization: `Bearer ${Authentication.userToken}`
            }
        }).then(async response => {
            const data = await response.json();
            if (!response.ok) {
                return Promise.reject();
            }

            this.setState({ cars: data })
        }).catch(error => {
            alert("Your session has been expired please login again");
            sessionStorage.removeItem('currentUserId');
            sessionStorage.removeItem('userToken');
            sessionStorage.removeItem('currentUser');
            window.location.pathname = '/login';
        })
    }

    handleclick = (carRecord) => {
        localStorage.setItem('carSetails', JSON.stringify(carRecord));
        window.location.pathname = '/createride';
    }

    render() {

        const carDetails = this.state.cars.map((carRecord, i) => (
            <ButtonBase key={i} onClick={() => this.handleclick(carRecord)} >
                < Card className='car-cards' key>
                    <div>
                        <p>Model : {carRecord.model}</p>
                    </div>
                    <div>
                        <p>Car Number : {carRecord.number}</p>
                    </div>
                    <div>
                        <p>MAX NUMBER OF SEAT: {carRecord.noofSeat}</p>
                    </div>
                </Card>
            </ButtonBase>
        ))

        return (
            <div className='car-selectors'>
                <div className='header'>
                    <h3>Select one car if not present then add that car</h3>
                </div>
                <div className='user-cars'>{carDetails}</div>
                <ButtonBase href='/car/addnewcar' >
                    < Card className='car-cards'>
                        <div className='add-new-car'>+</div>
                    </Card>
                </ButtonBase>
            </div>
        )
    }
}

export default connect()(CarSelector);