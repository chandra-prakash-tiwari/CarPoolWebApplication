import * as React from 'react';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import '../../css/login-form.css';
import Services from './Services';
import VisibilityIcon from '@material-ui/icons/Visibility';
import { InputAdornment } from '@material-ui/core';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

type login = {
    userName: string,
    password: string,
    validUserName: string,
    validPassword: string,
    passwordVisibilty: 'text'|'password'
}; 

export default class Login extends React.Component<{}, login> {
    constructor(props: login) {
        super(props);
        this.state = {
            userName: '',
            password: '',
            validUserName: '',
            validPassword: '',
            passwordVisibilty: 'password'
        }
    }

    changes = (event: any) => {
        this.setState({
            ...this.state,
            [event.target.name]: event.target.value
        });

        switch (event.target.name) {
            case 'userName':
                this.userNameValidator(event.target.value);
                break;

            case 'password':
                this.passwordValidator(event.target.value);
                break;
        }

    }

    userNameValidator(userName: any) {
        if (userName == null || userName.length==0) {
            this.setState({ validUserName: "Please enter username or email address" });
            return false;
        }
        else {
            this.setState({ validUserName: "" });
            return true;
        }
    }

    passwordValidator(password: any) {
        if (password == null || password.length == 0) {
            this.setState({ validPassword: "Please enter password" })
            return false;
        }
        else {
            this.setState({ validPassword: "" })
            return true;
        }
    }

    visibity = () => {
        this.state.passwordVisibilty == 'password'?
            this.setState({ passwordVisibilty: 'text' }) :
            this.setState({ passwordVisibilty:'password' })
    }

    handleAuthentication = (event:any) => {
        event.preventDefault();
        if (this.userNameValidator(this.state.userName) && this.passwordValidator(this.state.password)) {
            var data = {
                userName: this.state.userName,
                password: this.state.password
            }
            Services.Login(data);
            window.location.pathname = '/home';
        }
    }

    render() {
        return (
            <Grid item xs={12} sm={8} md={4}>
                <div className='login' >
                    <div className='header'>
                        <Typography component="h1" variant="h5" className='head'>Log In</Typography>
                        <div className='header-underline'></div>
                    </div>
                    <form className='form'>
                        <TextField variant="filled" className='input' value={this.state.userName} onChange={this.changes} id="userName" label="Enter Email or UserName Id " helperText={this.state.validUserName} name="userName" autoFocus />
                        <TextField variant="filled" className='input' value={this.state.password} onChange={this.changes} name="password" label="Enter Password" type={this.state.passwordVisibilty} helperText={this.state.validPassword} id="password"
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position='end' onClick={this.visibity} >
                                        {this.state.passwordVisibilty == 'password' ? <VisibilityIcon /> : <VisibilityOff />}
                                    </InputAdornment>
                                )
                            }} />
                        <div className='submit'>
                            <button type="submit" onClick={this.handleAuthentication}><span> Submit </span></button>
                        </div>
                    </form>
                    <div className='footer'>
                        <Typography>Not a member yet ? <Link href="/signup">SIGN UP</Link></Typography>
                        <div className='footer-underline'></div>
                    </div>
                </div>
            </Grid>
        )
    }
}

