import * as React from 'react';
import { ButtonBase, Card, Avatar, Grid } from '@material-ui/core';
import '../../../css/my-rides.css';
import RideService from '../../../Services/RideService'
import { ServerError } from '../Response';
import { Dialog } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import BookingService from '../../../Services/BookingService';

export class Rides {
    rides: Array<any>;
    bookers: Array<any>;
    noofSeat: number;
    serverError: boolean;
    dialogDisplay: boolean;
    dialog1Display: boolean;

    constructor() {
        this.rides = [];
        this.noofSeat = 0;
        this.serverError = false;
        this.bookers = [];
        this.dialogDisplay = false;
        this.dialog1Display = false;
    }
}
 enum Time {
    '5am - 9am' = 1,
    '9am - 12pm',
    '12pm - 3pm',
    '3pm - 6pm',
    '6pm - 9pm'
}

export default class MyRides extends React.Component<{}, Rides, Time> {
    constructor(props: Rides) {
        super(props);
        this.state = new Rides()
    }

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

    onChoice = (ride: any) => {
        this.setState({ dialogDisplay:true })
        RideService.getAllBookers(ride.id).then((response) => {
            if (response !== undefined) {
                this.setState({ bookers: response })
            }
        })
    }

    onResponse = (rideId: string, bookingId:string, status:number) => {
        BookingService.bookingResponse(rideId, bookingId, status).then((response) => {
            window.location.reload();
        })
    }

    onDialogClose = () => {
        this.setState({ dialogDisplay: false })
    }

    render() {
        const Bookers = this.state.bookers.length > 0 ? (this.state.bookers.map((booker: any, i: any) => (
            <div key={i} className='ride-booking'>
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
                        <span>{booker.from}</span>
                    </div>
                    <div className='right'>
                        <span className='label'>To</span><br />
                        <span>{booker.to}</span>
                    </div>
                </div>
                <div className='ride-line'>
                    <div className='left'>
                        <span className='label'>Date</span><br />
                        <span>{booker.travelDate.split('T')[0]}</span>
                    </div>
                    <div className='right'>
                        <span className='label'>Status</span><br />
                        <span>{booker.status === 1 ? 'Confirm' : booker.status === 2 ? 'Reject' : 'Pending'}</span>
                    </div>
                </div>            
                <button className='confirm' disabled={booker.status !== 3 ? true : false} onClick={() => this.onResponse(booker.rideId, booker.id, 1)}>Confirm</button>
                <button className='cancel' disabled={booker.status !== 3 ? true : false} onClick={() => this.onResponse(booker.rideId, booker.id, 2)}>Cancel</button>
            </div>)
        )) : <div style={{ textAlignLast: 'center', fontSize:'2rem' }}>No booker is available</div>;

        const dialog = (this.state.dialogDisplay) ?(
            <Dialog fullScreen open={this.state.dialogDisplay} className='ride-dialog'>
                <ButtonBase onClick={this.onDialogClose} className='close'><CloseIcon className='icon' /></ButtonBase>
                {Bookers}
            </Dialog>

        ): null;

        const RidesDetails =this.state.rides.length>0?(
            this.state.rides.map((ride: any, i) => (
                <ButtonBase key={i} style={{ margin: '1rem 4rem' }}>
                    <Card className='rides' onClick={()=>this.onChoice(ride)}>
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
                                <span>{Time[ride.time]}</span>
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
                <div className='head-card'>
                    <Card className='header'>Offered rides</Card>
                </div>
                <div className='rides-cards'>{RidesDetails}</div>
                {dialog}
            </div> : <ServerError />
            )
    }
}