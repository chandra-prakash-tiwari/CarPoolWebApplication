import * as React from 'react';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import '../../css/login-form.css';
import UserService from '../../Services/UserService'
import VisibilityIcon from '@material-ui/icons/Visibility';
import { InputAdornment } from '@material-ui/core';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

export class LoginProps{
    userName: string;
    password: string;
    userNameError: string;
    passwordError: string;
    passwordType: boolean;
    constructor(value: any) {
        this.userName = value.userName;
        this.password = value.password;
        this.userNameError = value.userNameError;
        this.passwordError = value.passwordError;
        this.passwordType = value.passwordType;
    }
} 

export default class Login extends React.Component<{}, LoginProps> {
    constructor(props: LoginProps) {
        super(props);
        this.state = new LoginProps({
            userName: '',
            password: '',
            userNameError: '',
            passwordError:'',
            passwordType: true,
        });
    }

    onChanges = (event: any) => {
        this.setState({
            ...this.state,
            [event.target.name]: event.target.value
        });
    }

    IsEmpty(value: string) {
        return !value || (value && value.trim().length === 0);
    }

    UserNameValidator(value: string) {
        let inValid = this.IsEmpty(value);
        this.setState({ userNameError: inValid ? "Please enter username or email address" : "" });
        return inValid;
    }

    PasswordValidator(value: string) {
        let inValid = this.IsEmpty(value);
        this.setState({ passwordError: inValid ? "Please enter password" : "" })
        return inValid;
    }

    onSubmit = (event:any) => {
        event.preventDefault();
        if (!this.UserNameValidator(this.state.userName) && !this.PasswordValidator(this.state.password)) {
            UserService.Login(this.state).then((value) => {
                console.log(value);
                if (value == 'ok')
                    window.location.pathname = '/home';
                else
                    alert("Wrong userid or password");  
            });
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
                        <TextField variant="filled" className='input' value={this.state.userName} onChange={(event) => { this.onChanges(event); this.UserNameValidator(event.target.value) }} name="userName" type='text' label="Enter Email or UserName Id " helperText={this.state.userNameError} autoFocus />
                        <TextField variant="filled" className='input' value={this.state.password} onChange={(event) => { this.onChanges(event); this.PasswordValidator(event.target.value) }} name="password" type={this.state.passwordType ? 'password' : 'text'} label="Enter Password" helperText={this.state.passwordError}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position='end' onClick={() => (this.setState({ passwordType: !this.state.passwordType }))} >
                                        {this.state.passwordType ? <VisibilityIcon /> : <VisibilityOff />}
                                    </InputAdornment>
                                )
                            }} />
                        <div className='submit'>
                            <button type="submit" onClick={this.onSubmit}><span> Submit </span></button>
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