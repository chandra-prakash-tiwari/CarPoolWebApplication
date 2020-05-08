import * as React from 'react';
import { ButtonBase, Card, Avatar, Grid } from '@material-ui/core';
import '../../../css/my-rides.css';
import RideService from '../../../Services/RideService'
import { ServerError } from '../Response';

export class Rides {
    rides: Array<any>;
    noofSeat: number;
    serverError: boolean;

    constructor() {
        this.rides = [];
        this.noofSeat = 0;
        this.serverError = false;
    }
}

export enum Time {
    '5am - 9am' = 1,
    '9am - 12pm',
    '12pm - 3pm',
    '3pm - 6pm',
    '6pm - 9pm'
}

export default class MyRides extends React.Component<{}, Rides> {
    constructor(props: Rides) {
        super(props);
        this.state = new Rides()
    }

    timeEnum = { 1:'5am - 9am', 2:'9am - 12pm', 3:'12pm - 3pm', 4:'3pm - 6pm', 5:'6pm - 9pm' };

    componentDidMount() {
        RideService.allRides().then((response) => {
            if (response !== undefined && response !== 'serverError') {
                this.setState({ rides: response })
            }
            else if (response === 'serverError') {
                this.setState({ serverError:true })
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
                                <span className='label'>Time</span><br />
                                <span>{ride.time}</span>
                        </div>
                      </div>
                    <div className='ride-line'>
                        <div className='left'>
                            <span className='label'>Price(Per KM)</span><br />
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
        return (!this.state.serverError?
            <div className='my-ride'>
                <ButtonBase className='head-card'>
                    <Card className='header'>Offered rides</Card>
                </ButtonBase>
                <div className='rides-cards'>{RidesDetails}</div>
            </div> : <ServerError />
            )
    }
}