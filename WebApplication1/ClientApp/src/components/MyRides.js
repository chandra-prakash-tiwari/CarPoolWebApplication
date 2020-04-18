import React, { Component} from 'react';
import Authentication from '../Helper/authentication';
import { ButtonBase, Card, Avatar } from '@material-ui/core';
import '../css/my-rides.css';

export default class MyRides extends Component {
    constructor() {
        super();
        this.state = {
            rides:[]
        }
    }

    componentDidMount() {
        fetch(`/api/ride/yourride?ownerId=${Authentication.currentUserId}`, {
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
            console.log(data)
            this.setState({ rides: data })
        }).catch(error => {
            console.log(error);
        })
        }

    render() {

        const RidesDetails = this.state.rides.map((ride, i) => (
            <ButtonBase key={i} style={{ margin:'1rem 4rem' }}>
                <Card className='rides'>
                    <div>
                        <h4></h4>
                        <Avatar></Avatar>
                    </div>
                    <div className='ride-line'>
                        <div className='left'>
                            <span className='label'>From</span><br />
                            <span>{ride.from}</span>
                        </div>
                        <div className='right'>
                            <span className='label'>To</span><br />
                            <span>{ride.to}</span>
                        </div>
                    </div>
                    <div className='ride-line'>
                        <div className='left'>
                            <span className='label'>Date</span><br />
                            <span>{ride.travelDate.split('T')[0]}</span>
                        </div>
                        <div className='right'>
                            <span className='label'>Time</span><br/>
                            <span>{ride.travelDate.split('T')[1]}</span>
                        </div>
                    </div>
                    <div className='ride-line'>
                        <div className='left'>
                            <span className='label'>Price</span><br />
                            <span>{ride.ratePerKM}</span>
                        </div>
                    </div>
                </Card>
            </ButtonBase>
            ))
        return (
            <div className='my-ride'>
                <ButtonBase>
                    <Card className='header'>Offered Ride</Card>
                </ButtonBase>
                <div>{RidesDetails}</div>
            </div>
            )
    }
}