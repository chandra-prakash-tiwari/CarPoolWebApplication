import React from 'react';
import Grid from '@material-ui/core/Grid';
import { BrowserRouter as Router ,Route, Switch} from 'react-router-dom'
import './index.css'
import Login from './components/Login';
import SignUp from './components/SignUp';
import Home from './components/Home';
import BookaRide from './components/BookaRide';
import BookingSearch from './components/BookingSearch';

export default function App() {

  return (
      <Router>
          <Switch>
              <Route path='/login'>
                  <Grid container className='abc'>
                      <Grid item xs={false} sm={4} md={8} className='image' />
                      <Login />
                      </Grid>
              </Route>
              <Route exact path='/signup'>
                  <Grid container className='abc'>
                      <Grid item xs={false} sm={4} md={8} className='image' />
                      <SignUp />
                  </Grid>
              </Route>
              <Route exact path='/home'>
                  <Grid container className='abc'>
                      <Home />
                  </Grid>
              </Route>
              <Route exact path='/ride'>
                  <Grid container className='abc'>
                      <Grid item md={4}>
                          <BookaRide />
                      </Grid>
                  </Grid>
              </Route>
              <Route exact path='/bookingsearch'>
                  <Grid container className='abc'>
                      <Grid item md={4}>
                          <BookaRide/>
                      </Grid>
                      <Grid item md={7}>
                          <BookingSearch/>
                      </Grid>
                  </Grid>
              </Route>
      </Switch>
    </Router>
  );
}

