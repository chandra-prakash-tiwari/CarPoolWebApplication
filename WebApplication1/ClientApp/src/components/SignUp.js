import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import '../css/sign-up-form.css'

export default class SignUp extends Component {
    constructor() {
        super();
        this.state = {
            Name: '',
            Mobile: '',
            UserName: '',
            Address: '',
            DrivingLicence: '',
            Email: '',
            Password: ''
        }
    }

    changes = (event) => {
        this.setState({
            ...this.state,
            [event.target.name]: event.target.value
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        console.log(this.state);
    
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(this.state)
        };

        return fetch('/api/user/addnewuser', requestOptions)
            .then(async response => {
                const data = await response.json();
                console.log(response);
                console.log(data);
                if (!response.ok) {
                    console.log(response);
                    const error = (data && data.message) || response.status;
                    return Promise.reject(error);
                }
                window.location.pathname = '/login';
                return data;
            }).catch(error => {
                return console.log(error);
            })
    }

    render() {
        return (
            <Grid item xs={12} sm={8} md={4} elevation={6}>
                <div className='signup' >
                    <div className='header'>
                        <Typography className='head' component="h1" variant="h5" >Sign in</Typography>
                    </div>
                    <form onSubmit={this.handleSubmit}>
                        <TextField className='input' variant="filled" onChange={this.changes} value={this.state.Name} required id="Name" label="Name" name="Name" autoFocus />
                        <TextField className='input' variant="filled" onChange={this.changes} value={this.state.Mobile} required id="Mobile" label="Mobile" name="Mobile" />
                        <TextField className='input' variant="filled" onChange={this.changes} value={this.state.UserName} required id="UserName" label="UserName" name="UserName" />
                        <TextField className='input' variant="filled" onChange={this.changes} value={this.state.Address} required id="Address" label="Address" name="Address" />
                        <TextField className='input' variant="filled" onChange={this.changes} value={this.state.DrivingLicence} required id="DrivingLicenece" label="DrivingLicenece" name="DrivingLicence" />
                        <TextField className='input' variant="filled" onChange={this.changes} value={this.state.Email} required id="email" label="Email Address" name="Email" type='email' />
                        <TextField className='input' variant="filled" onChange={this.changes} value={this.state.Password} required name="Password" label="Password" type="password" id="password" />
                        <TextField className='input' variant="filled" required name="confirm-password" label="Confirm Password" type="text" id="confirm-password" />
                        <div className='submit'>
                            <Button type='submit' variant="contained" color="primary">Submit</Button>
                        </div>
                    </form>
                    <div className='a'>
                        <Link href="/login" variant="body2" > {"Already a member ? "}<u><b>LOGIN</b></u></Link>
                    </div>
                </div>
            </Grid>
        )
    }
}
