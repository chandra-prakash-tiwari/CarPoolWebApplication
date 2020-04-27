import * as React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Services from'./Services'
import '../../css/sign-up-form.css'

type signUp= {
    name?: string,
    mobile?: string,
    userName?: string,
    address?: string,
    drivingLicence?: string,
    email?: string,
    password?: string
}

export default class SignUp extends React.Component<{}, signUp> {
    constructor(props: signUp) {
        super(props);
        this.state = {
            name: '',
            mobile: '',
            userName: '',
            address: '',
            drivingLicence: '',
            email: '',
            password: ''
        }
    }

    changes = (event:any) => {
        this.setState({
            ...this.state,
            [event.target.name]: event.target.value
        });
    }

    render() {
        return (
            <Grid item xs={12} sm={8} md={4}>
                <div className='signup' >
                    <div className='header'>
                        <Typography className='head' component="h1" variant="h5" >Sign in</Typography>
                    </div>
                    <form id="form">
                        <TextField className='input' variant="filled" onChange={this.changes} value={this.state.name} required id="Name" label="Name" name="name" autoFocus />
                        <TextField className='input' variant="filled" onChange={this.changes} value={this.state.mobile} required id="Mobile" label="Mobile" name="mobile" />
                        <TextField className='input' variant="filled" onChange={this.changes} value={this.state.userName} required id="UserName" label="UserName" name="userName" />
                        <TextField className='input' variant="filled" onChange={this.changes} value={this.state.address} required id="Address" label="Address" name="address" />
                        <TextField className='input' variant="filled" onChange={this.changes} value={this.state.drivingLicence} required id="DrivingLicenece" label="drivingLicenece" name="DrivingLicence" />
                        <TextField className='input' variant="filled" onChange={this.changes} value={this.state.email} required id="email" label="Email Address" name="email" type='email' />
                        <TextField className='input' variant="filled" onChange={this.changes} value={this.state.password} required name="Password" label="Password" type="password" id="password" />
                        <TextField className='input' variant="filled" required name="confirm-password" label="Confirm Password" type="text" id="confirm-password" />
                        <div className='submit'>
                            <Button type='submit' variant="contained" color="primary" onClick={() => Services.AddNewUser(this.state)}>Submit</Button>
                        </div>
                    </form>
                    <div className='a'>
                        <Typography>Already a member ? <Link href="/login">LOGIN</Link></Typography>                     
                    </div>
                </div>
            </Grid>
        )
    }
}
