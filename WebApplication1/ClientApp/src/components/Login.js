import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import '../css/login-form.css';
import Authentication from '../Helper/authentication';

export default class Login extends Component {
    constructor() {
        super();
        this.state = {
            userName: '',
            password:''
        }
    }

    changes = (event) => {
        this.setState({
            ...this.state,
            [event.target.name]: event.target.value
        });
    }

    handleAuthentication = (e) => {
        e.preventDefault();
        if (this.state.userName !== '' || this.state.password !== '') {
            Authentication.login(this.state.userName, this.state.password);
            window.location.pathname = '/home';
        }
        else {
            if (this.state.userName === '') {
                console.log("UserName Required");
            }
            if (this.state.password === '') {
                console.log("Password Required");
            }
        }
    }

    render() {
        return (
            <Grid item xs={12} sm={8} md={4} elevation={6}>
                <div className='login' >
                    <div className='header'>
                        <Typography component="h1" variant="h5" className='head'>Log In</Typography>
                    </div>
                    <form onSubmit={this.handleAuthentication} className='form'>
                        <TextField variant="filled" className='input' value={this.state.userName} onChange={this.changes} required id="userName" label="Email Address" name="userName" autoFocus />
                        <TextField variant="filled" className='input' value={this.state.password} onChange={this.changes} required name="password" label="Password" type="password" id="password" margin='normal' />
                        <div className='submit'>
                            <Button type="submit"> Submit </Button>
                        </div>
                    </form>
                    <div className='a'>
                        <Link href="/signup" variant="body2" > {"Not a member yet? SIGN UP"} </Link>
                    </div>
                </div>
            </Grid>
        )
    }
}

