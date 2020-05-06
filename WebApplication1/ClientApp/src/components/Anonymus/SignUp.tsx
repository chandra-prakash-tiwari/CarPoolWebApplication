import * as React from 'react';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import UserService from '../../Services/UserService';
import '../../css/sign-up-form.css'
import VisibilityIcon from '@material-ui/icons/Visibility';
import { InputAdornment } from '@material-ui/core';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

export class CreateUser {
    name: string;
    mobile: string;
    userName: string;
    address: string;
    drivingLicence: string;
    email: string;
    password: string;
    confirmPassword: string;
    nameError: string;
    mobileError: string;
    userNameError: string;
    addressError: string;
    drivingLicenceError: string;
    emailError: string;
    passwordError: string;
    passwordMatchError: string;
    passwordType: boolean;

    constructor() {
        this.name = '';
        this.mobile = '';
        this.userName = '';
        this.address = '';
        this.drivingLicence = '';
        this.email = '';
        this.password = '';
        this.nameError = '';
        this.mobileError = '';
        this.userNameError = '';
        this.addressError = '';
        this.confirmPassword = '';
        this.drivingLicenceError = '';
        this.emailError = '';
        this.passwordError= '';
        this.passwordMatchError = '';
        this.passwordType = true;
    }
}

export default class SignUp extends React.Component<{}, CreateUser> {
    constructor(props: CreateUser) {
        super(props);
        this.state = new CreateUser();
    }

    onChanges = (event:any) => {
        this.setState({
            ...this.state,
            [event.target.name]: event.target.value
        });
    }

    isEmpty(value: string) {
        return !value || (value && value.trim().length===0)
    }

    isValid(value: string, regex: RegExp) {
        return !value.match(regex);
    }

    hasUserName(value: string) {
        return UserService.validUserName(value).then((valid) => { return valid });
    }

    hasEmail(value: string) {
        return UserService.validEmail(value).then((valid) => { return valid })
    }

    isValidName(value: string) {
        let emptyStatus = this.isEmpty(value);
        let isValid = this.isValid(value, /^[a-zA-Z ]*$/);
        this.setState({ nameError: emptyStatus ? "Please enter name" : (isValid ? "Please enter correct name" : "")})
        return emptyStatus && isValid;
    }

    isValidEmail(value: string) {
        let emptyStatus = this.isEmpty(value);
        let isValid = this.isValid(value, /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
        this.setState({ emailError: emptyStatus ? "Please enter email" : (isValid ? "Please enter correct email" : "")})
        return emptyStatus && isValid;
    }

    isValidMobileNumber(value: string) {
        let emptyStatus = this.isEmpty(value);
        let validStatus = this.isValid(value, /^[789]\d{9}$/);
        this.setState({ mobileError: emptyStatus ? "Please enter mobile number" : (validStatus ? "Enter correct mobile number" : "")})
        return emptyStatus && validStatus;
    }

    isValidPassword(value: string) {
        let emptyStatus = this.isEmpty(value);
        let validStatus = this.isValid(value, /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/);
        this.setState({ passwordError: validStatus ? "Please enter password" : (validStatus ? "Password contain 8-15 character and atleast one numberic, upper alphabet, lower alphabet and special character" : "") });
        return emptyStatus && validStatus;
    }

    isValidUserName(value: string) {
        let emptyStatus = this.isEmpty(value);
        const isAvailable = this.hasUserName(value);
        console.log(isAvailable)
        this.setState({ userNameError: emptyStatus ? "Please enter username" : (isAvailable?"taken by someone":"")
    });
        return emptyStatus;
    }

    isEqualPassword(value: string) {
        let emptyStatus = this.isEmpty(value);
        let validStatus = (value == this.state.password);
        this.setState({ passwordError: emptyStatus ? "Please re enter your password" : (validStatus ? "password can not matched" : "") });
        return emptyStatus && validStatus;
    }

    isValidDrivingLicence(value: string) {
        let emptyStatus = this.isEmpty(value);
        let validStatus = this.isValid(value, /^[0-9a-zA-Z]{4,9}$/);
        this.setState({ drivingLicenceError: emptyStatus ? "Please enter driving licence" : (validStatus ? "Driving licence is not correct" : "")})
        return emptyStatus && validStatus;
    }

    isValidAddress(value: string) {
        let emptyStatus = this.isEmpty(value);
        this.setState({ addressError: emptyStatus ? "Please enter address" : "" });
        return emptyStatus;
    }


    onSubmit = (event: any) => {
        event.preventDefault();
        if (!this.isValidName(this.state.name) && !this.isValidMobileNumber(this.state.mobile) && !this.isValidUserName(this.state.userName) &&
            !this.isValidPassword(this.state.password) && !this.isEqualPassword(this.state.password) && !this.isValidEmail(this.state.email) &&
            !this.isValidDrivingLicence(this.state.drivingLicence) && !this.isValidAddress(this.state.address)) {
            var data = {
                userName: this.state.userName,
                password: this.state.password,
                mobile: this.state.mobile,
                name: this.state.name,
                email: this.state.email,
                address: this.state.address,
                drivingLicence: this.state.drivingLicence
            }
            UserService.addNewUser(data).then((response) => {
                if (response == 'Ok')
                    window.location.pathname = '/login';
                else if (response == 'Reject')
                    alert("Cannot added right now try once")
            })
            
        }
    }

    render() {
        return (
            <Grid item xs={12} sm={8} md={4}>
                <div className='signup' >
                    <div className='header'>
                        <Typography className='head' component="h1" variant="h5" >Sign in</Typography>
                        <div className='header-underline'></div>
                    </div>
                    <form className="form">
                        <TextField className='input' variant="filled" onChange={(event) => { this.onChanges(event); this.isValidName(event.target.value) }} value={this.state.name} label="Name" name="name" helperText={this.state.nameError} autoFocus />
                        <TextField className='input' variant="filled" onChange={(event) => { this.onChanges(event); this.isValidMobileNumber(event.target.value) }} value={this.state.mobile} label="Mobile" name="mobile" helperText={this.state.mobileError} />
                        <TextField className='input' variant="filled" onChange={(event) => { this.onChanges(event); this.isValidUserName(event.target.value) }} value={this.state.userName} label="UserName" name="userName" helperText={this.state.userNameError} />
                        <TextField className='input' variant="filled" onChange={(event) => { this.onChanges(event); this.isValidAddress(event.target.value) }} value={this.state.address} label="Address" name="address" helperText={this.state.addressError} />
                        <TextField className='input' variant="filled" onChange={(event) => { this.onChanges(event); this.isValidDrivingLicence(event.target.value) }} value={this.state.drivingLicence} label="Driving Licenece" name="drivingLicence" helperText={this.state.drivingLicenceError} />
                        <TextField className='input' variant="filled" onChange={(event) => { this.onChanges(event); this.isValidEmail(event.target.value) }} value={this.state.email} label="Email Address" name="email" type='email' helperText={this.state.emailError} />
                        <TextField className='input' variant="filled" onChange={(event) => { this.onChanges(event); this.isValidPassword(event.target.value) }} value={this.state.password} name="password" label="Password" type={this.state.passwordType ? 'password' : 'text'} helperText={this.state.passwordError}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position='end' onClick={() => { this.setState({ passwordType: !this.state.password }) }} >
                                        {this.state.passwordType ? <VisibilityIcon /> : <VisibilityOff />}
                                    </InputAdornment>
                                )
                            }} />
                        <TextField className='input' variant="filled" onChange={(event) => { this.onChanges(event); this.isEqualPassword(event.target.value) }} value={this.state.confirmPassword} name="confirmPassword" label="Confirm Password" type="text" id="confirm-password" helperText={this.state.passwordMatchError} />
                        <div className='submit'>
                            <button type='submit' onClick={this.onSubmit}><span>Submit</span></button>
                        </div>
                    </form>
                    <div className='footer'>
                        <h5>Already a member ?
                                <Link href="/login"> LOGIN</Link>
                                <div className='footer-underline'></div>
                        </h5>                      
                    </div>
                </div>
            </Grid>
        )
    }
}
