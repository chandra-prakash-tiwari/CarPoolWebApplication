import * as React from 'react';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import '../../css/login-form.css';
import UserService from '../../Services/UserService'
import VisibilityIcon from '@material-ui/icons/Visibility';
import { InputAdornment, Tooltip, FormHelperText } from '@material-ui/core';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { LoginRequest } from '../../Classes/DataClasses/User';
import { LoginMeta } from '../../Classes/MetaClasses/User';

export class LoginProps{
    credentials: LoginRequest;
    meta: LoginMeta;

    constructor() {
        this.credentials = new LoginRequest();
        this.meta = new LoginMeta();
    }
} 

export default class Login extends React.Component<{}, LoginProps> {
    constructor(props: LoginProps) {
        super(props);
        this.state = new LoginProps();
    }

    onChanges = (event: any) => {
        this.setState({
            ...this.state,
            credentials: { ...this.state.credentials, [event.target.name]: event.target.value }
        });
    }

    isEmpty(value: string) {
        return !value || (value && value.trim().length === 0);
    }

    isValidUserName(value: string) {
        let emptyStatus = this.isEmpty(value);
        this.setState({ meta: { ...this.state.meta, userNameError: emptyStatus ? "Please enter username or email address" : "" } });
        return emptyStatus;
    }

    isValidPassword(value: string) {
        let emptyStatus = this.isEmpty(value);
        this.setState({ meta: { ...this.state.meta, passwordError: emptyStatus ? "Please enter password" : "" } })
        this.setState({ })
        return emptyStatus;
    }

    onSubmit = (event:any) => {
        event.preventDefault();
        if (!this.isValidUserName(this.state.credentials.userName) && !this.isValidPassword(this.state.credentials.password)) {
            UserService.login(this.state.credentials).then((value) => {
                console.log(this.state.credentials);
                if (value == 'ok')
                    window.location.pathname = '/home';
                else
                    alert("Wrong userid or password");
            });
        }
    }

    onChangePasswordType = () => {
        this.state.meta.passwordType = !this.state.meta.passwordType;
        this.setState({ meta: this.state.meta })
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
                        <Tooltip title={this.state.meta.userNameError} placement='left' >
                            <TextField variant="filled" className='input' value={this.state.credentials.userName} onChange={(event) => { this.onChanges(event); this.isValidUserName(event.target.value) }} name="userName" type='text' label="Enter Email or UserName Id "/>
                        </Tooltip>
                        <span>{this.state.meta.userNameError}</span>
                        <Tooltip title={this.state.meta.passwordError} placement='left' >
                            <TextField variant="filled" className='input' value={this.state.credentials.password} onChange={(event) => { this.onChanges(event); this.isValidPassword(event.target.value) }} name="password" type={this.state.meta.passwordType ? 'password' : 'text'} label="Enter Password"
                                InputProps={{
                                endAdornment: (
                                    <InputAdornment position='end' onClick={this.onChangePasswordType} >
                                        {this.state.meta.passwordType ? <VisibilityIcon /> : <VisibilityOff />}
                                    </InputAdornment>
                                )
                                }} />
                        </Tooltip>
                        <span>{this.state.meta.passwordError}</span>
                        <div className='submit'>
                            <button type="submit" onClick={this.onSubmit}><span> Submit </span></button>
                        </div>
                    </form>
                    <div className='footer'>
                        <p>Not a member yet ? </p>
                        <div className='link'>
                            <Link href="/signup"> SIGN UP</Link>
                            <div className='footer-underline'></div>
                        </div>
                    </div>
                </div>
            </Grid>
        )
    }
}