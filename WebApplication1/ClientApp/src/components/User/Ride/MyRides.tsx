import * as React from 'react';
import { ButtonBase, Card, Avatar, Grid } from '@material-ui/core';
import '../../../css/my-rides.css';
import RideService from '../../../Services/RideService'

export class Rides {
    rides: Array<any>;

    constructor(value: any) {
        this.rides=value.rides
    }
}

export default class MyRides extends React.Component<{}, Rides> {
    constructor(props: Rides) {
        super(props);
        this.state = new Rides({
            rides:[]
        })
    }

    componentDidMount() {
        RideService.AllRides().then((response) => {
            if (response != undefined) {
                this.setState({ rides: response })   
            }
        })
    }

    render() {
        const RidesDetails =this.state.rides.length>0?(
            this.state.rides.map((ride: any, i) => (
            <ButtonBase key={i} style={{ margin:'1rem 4rem' }}>
                <Card className='rides'>
                    <div className='head'>
                        <Grid item md={10}>
                            <h4> </h4>
                        </Grid>
                        <Grid item md={2}>
                            <Avatar></Avatar>
                        </Grid>
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
                        <div className='right'>
                            <span className='label'>Available seats</span><br />
                            <span>{ride.availableSeats}</span>
                        </div>
                    </div>
                </Card>
                </ButtonBase>
            ))) : (<p className='no-bookings'>you have not created any ride offer</p>)
        return (
            <div className='my-ride'>
                <ButtonBase className='head-card'>
                    <Card className='header'>Offered rides</Card>
                </ButtonBase>
                <div className='rides-cards'>{RidesDetails}</div>
            </div>
            )
    }
}