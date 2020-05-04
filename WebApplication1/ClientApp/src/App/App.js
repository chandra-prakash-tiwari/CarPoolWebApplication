import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import '../index.css';
import Login from '../components/Anonymus/Login';
import SignUp from '../components/Anonymus/SignUp';
import userServices from '../components/Anonymus/Services';
import Profile from '../components/User/User/Profile.tsx';
import Home from '../components/Home';
import BookaRide from '../components/User/Booking/BookaRide';
import BookingSearch from '../components/User/Booking/BookingSearch';
import CarSelector from '../components/User/Car/CarSelector';
import AddNewCar from '../components/User/Car/AddNewCar';
import CreateRide from '../components/User/Ride/CreateRide';
import MyBookings from '../components/User/Booking/MyBooking';
import MyRides from '../components/User/Ride/MyRides';

export default class App extends Component {

    render() {
        return (
            <Router>
                {
                    userServices.currentUser !== null ?
                        <Grid className='cointainer'>
                            <Profile/>
                            <Switch>
                                <Route exact path='/home'>
                                        <Home />
                                </Route>
                                <Route exact path='/booking'>
                                        <Grid item md={4}>
                                            <BookaRide />
                                        </Grid>
                                </Route>
                                <Route exact path='/booking/search'>
                                    <Grid container className='booking'>
                                        <Grid item md={4}>
                                            <BookaRide />
                                        </Grid>
                                        <Grid item md={8}>
                                            <BookingSearch />
                                        </Grid>
                                    </Grid>
                                </Route>
                                <Route exact path='/car' >
                                    <CarSelector />
                                </Route>
                                <Route exact path='/car/addnewcar'>
                                    <Grid item md={4}>
                                        <AddNewCar />
                                    </Grid>
                                </Route>
                                <Route exact path='/createride'>
                                    <Grid item md={12}>
                                        <CreateRide />
                                    </Grid>
                                </Route>
                                <Route exact path='/myride'>
                                    <Grid container className='rides'>
                                        <Grid item md={4}>
                                            <MyBookings />
                                        </Grid>
                                        <Grid item md={4}>
                                            <MyRides />
                                        </Grid>
                                    </Grid>
                                </Route>
                                <Route path='/'>
                                    <Redirect to='/home' />
                                 </Route>
                            </Switch>
                        </Grid>
                    :
                        <Switch>
                            <Route exact path='/login'>
                                <Grid container className='cointainer'>
                                    <Grid item xs={false} sm={4} md={8} className='image' />
                                    <Login />
                                </Grid>
                            </Route>
                            <Route exact path='/signup'>
                                <Grid container className='cointainer'>
                                    <Grid item xs={false} sm={4} md={8} className='image' />
                                    <SignUp />
                                </Grid>
                            </Route>
                            <Route path='/'>
                                <Redirect to='/login'/>
                            </Route>
                        </Switch>
                    }
            </Router>
        )
    }
}