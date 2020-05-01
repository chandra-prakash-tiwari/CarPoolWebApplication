import * as React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import '../../css/login-form.css';
import Services from './Services';

type login = {
    userName: string,
    password: string
}; 

export default class Login extends React.Component<{}, login> {
    constructor(props: login) {
        super(props);
        this.state = {
            userName: '',
            password: ''
        }
    }

    changes = (event: any) => {
        this.setState({
            ...this.state,
            [event.target.name]: event.target.value
        });
    }

    handleAuthentication = (event:any) => {
        event.preventDefault();
        Services.Login(this.state);
        window.location.pathname = '/home';
    }

    render() {
        return (
            <Grid item xs={12} sm={8} md={4}>
                <div className='login' >
                    <div className='header'>
                        <Typography component="h1" variant="h5" className='head'>Log In</Typography>
                    </div>
                    <form className='form'>
                        <TextField variant="filled" className='input' value={this.state.userName} onChange={this.changes} required id="userName" label="Email Address" name="userName" autoFocus />
                        <TextField variant="filled" className='input' value={this.state.password} onChange={this.changes} required name="password" label="Password" type="password" id="password" margin='normal' />
                        <div className='submit'>
                            <Button type="submit" onClick={this.handleAuthentication}> Submit </Button>
                        </div>
                    </form>
                    <div className='a'>
                        <Typography>Not a member yet? <Link href="/signup">SIGN UP</Link></Typography>
                    </div>
                </div>
            </Grid>
        )
    }
}

