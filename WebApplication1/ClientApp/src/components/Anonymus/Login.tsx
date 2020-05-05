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

type LoginProps = {
    userName: string,
    password: string,
    validUserName: string,
    validPassword: string,
    passwordVisibilty: 'text'|'password'
}; 

export default class Login extends React.Component<{}, LoginProps> {
    constructor(props: LoginProps) {
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

        this.validator(event.target.name, event.target.value);
    }


    isNull(value:any){
        return (value===null||value.length===0)
    }

    validator(name:any, value:any) {
        switch (name) {
            case 'userName':
                this.isNull(value) ? this.setState({ validUserName: "Please enter username or email address" }) : this.setState({ validUserName: "" });
                return this.isNull(value);

            case 'password':
                this.isNull(value) ? this.setState({ validPassword: "Please enter password" }) : this.setState({ validPassword: "" });
                return this.isNull(value);
        }
    }

    visibity = () => {
        this.state.passwordVisibilty == 'password'?
            this.setState({ passwordVisibilty: 'text' }) :
            this.setState({ passwordVisibilty:'password' })
    }

    handleAuthentication = (event:any) => {
        event.preventDefault();
        if (!this.validator('userName', this.state.userName) && !this.validator('password',this.state.password)) {
            var data = {
                userName: this.state.userName,
                password: this.state.password
            }
            UserService.Login(data);
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

