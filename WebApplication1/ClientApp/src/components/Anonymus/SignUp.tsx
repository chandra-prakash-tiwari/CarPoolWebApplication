import * as React from 'react';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import UserService from '../../Services/UserService';
import '../../css/sign-up-form.css'
import VisibilityIcon from '@material-ui/icons/Visibility';
import { InputAdornment, Tooltip } from '@material-ui/core';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { User } from '../../Classes/DataClasses/User';
import { SignUpMeta } from '../../Classes/MetaClasses/User';

export class SignUpProps {
    user: User;
    meta: SignUpMeta;

    constructor() {
        this.user = new User();
        this.meta = new SignUpMeta();
    }
}

export default class SignUp extends React.Component<{}, SignUpProps> {
    constructor(props: SignUpProps) {
        super(props);
        this.state = new SignUpProps();
    }

    onChanges = (event:any) => {
        this.setState({
            ...this.state,
            user: { ...this.state.user, [event.target.name]: event.target.value}
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
        this.setState({ meta: { ...this.state.meta, nameError: emptyStatus ? "Please enter name" : (isValid ? "Please enter correct name" : "") } })
        return emptyStatus && isValid;
    }

    isValidEmail(value: string) {
        let emptyStatus = this.isEmpty(value);
        let isValid = this.isValid(value, /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
        this.setState({ meta: { ...this.state.meta, emailError: emptyStatus ? "Please enter email" : (isValid ? "Please enter correct email" : "") }})
        return emptyStatus && isValid;
    }

    isValidMobileNumber(value: string) {
        let emptyStatus = this.isEmpty(value);
        let validStatus = this.isValid(value, /^[6789]\d{9}$/);
        this.setState({ meta: { ...this.state.meta, mobileError: emptyStatus ? "Please enter mobile number" : (validStatus ? "Enter correct mobile number" : "") } })
        return emptyStatus && validStatus;
    }

    isValidPassword(value: string) {
        let emptyStatus = this.isEmpty(value);
        let validStatus = this.isValid(value, /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/);
        this.setState({ meta: { ...this.state.meta, passwordError: emptyStatus ? "Please enter password" : (validStatus ? "Password contain 8-15 character and atleast one numberic, upper alphabet, lower alphabet and special character" : "") } });
        return emptyStatus && validStatus;
    }

    isValidUserName(value: string) {
        let emptyStatus = this.isEmpty(value);
        const isAvailable = this.hasUserName(value);
        this.setState({ meta: { ...this.state.meta, userNameError: emptyStatus ? "Please enter username" : (!isAvailable ? "taken by someone" : "")}});
        return emptyStatus;
    }

    isEqualPassword(value: string) {
        let emptyStatus = this.isEmpty(value);
        let validStatus = (value == this.state.user.password);
        this.setState({ meta: { ...this.state.meta, passwordError: emptyStatus ? "Please re enter your password" : (validStatus ? "password can not matched" : "") } });
        return emptyStatus && validStatus;
    }

    isValidDrivingLicence(value: string) {
        let emptyStatus = this.isEmpty(value);
        let validStatus = this.isValid(value, /^[0-9a-zA-Z]{4,9}$/);
        this.setState({ meta: { ...this.state.meta, drivingLicenceError: emptyStatus ? "Please enter driving licence" : (validStatus ? "Driving licence is not correct" : "") } })
        return emptyStatus && validStatus;
    }

    isValidAddress(value: string) {
        let emptyStatus = this.isEmpty(value);
        this.setState({ meta: { ...this.state.meta,addressError: emptyStatus? "Please enter address": "" }});
        return emptyStatus;
    }


    onSubmit = (event: any) => {
        event.preventDefault();
        if (!this.isValidName(this.state.user.name) && !this.isValidMobileNumber(this.state.user.mobile) && !this.isValidUserName(this.state.user.userName) &&
            !this.isValidPassword(this.state.user.password) && !this.isEqualPassword(this.state.user.password) && !this.isValidEmail(this.state.user.email) &&
            !this.isValidDrivingLicence(this.state.user.drivingLicence) && !this.isValidAddress(this.state.user.address)) {
            UserService.addNewUser(this.state.user).then((response) => {
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
                        <Typography className='head' component="h1" variant="h5" >Sign Up</Typography>
                        <div className='header-underline'></div>
                    </div>
                    <form className="form">
                        <Tooltip title={this.state.meta.nameError} placement='left' >
                            <TextField className='input' variant="filled" onChange={(event) => { this.onChanges(event); this.isValidName(event.target.value) }} value={this.state.user.name} label="Name" name="name" autoFocus />
                        </Tooltip>
                        <Tooltip title={this.state.meta.mobileError} placement='left' >
                            <TextField className='input' variant="filled" onChange={(event) => { this.onChanges(event); this.isValidMobileNumber(event.target.value) }} value={this.state.user.mobile} label="Mobile" name="mobile" />
                        </Tooltip>
                        <Tooltip title={this.state.meta.userNameError} placement='left' >
                            <TextField className='input' variant="filled" onChange={(event) => { this.onChanges(event); this.isValidUserName(event.target.value) }} value={this.state.user.userName} label="UserName" name="userName" />
                        </Tooltip>
                        <Tooltip title={this.state.meta.addressError} placement='left' >
                            <TextField className='input' variant="filled" onChange={(event) => { this.onChanges(event); this.isValidAddress(event.target.value) }} value={this.state.user.address} label="Address" name="address" />
                        </Tooltip>
                        <Tooltip title={this.state.meta.drivingLicenceError} placement='left' >
                            <TextField className='input' variant="filled" onChange={(event) => { this.onChanges(event); this.isValidDrivingLicence(event.target.value) }} value={this.state.user.drivingLicence} label="Driving Licenece" name="drivingLicence" />
                        </Tooltip>
                        <Tooltip title={this.state.meta.emailError} placement='left' >
                            <TextField className='input' variant="filled" onChange={(event) => { this.onChanges(event); this.isValidEmail(event.target.value) }} value={this.state.user.email} label="Email Address" name="email" type='email' />
                        </Tooltip>
                        <Tooltip title={this.state.meta.passwordError} placement='left' >
                            <TextField className='input' variant="filled" onChange={(event) => { this.onChanges(event); this.isValidPassword(event.target.value) }} value={this.state.user.password} name="password" label="Password" type={this.state.meta.passwordType ? 'password' : 'text'}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position='end' onClick={() => { this.setState({ meta: { ...this.state.meta, passwordType: !this.state.meta.passwordType } }) }} >
                                            {this.state.meta.passwordType ? <VisibilityIcon /> : <VisibilityOff />}
                                        </InputAdornment>
                                    )
                                    }} />
                        </Tooltip>
                        <Tooltip title={this.state.meta.passwordMatchError} placement='left' >
                            <TextField className='input' variant="filled" onChange={(event) => { this.onChanges(event); this.isEqualPassword(event.target.value) }} value={this.state.user.confirmPassword} name="confirmPassword" label="Confirm Password" type="text" />
                        </Tooltip>
                        <div className='submit'>
                            <button type='submit' onClick={this.onSubmit}><span>Submit</span></button>
                        </div>
                    </form>
                    <div className='footer'>
                        <p>Already a member ? </p>
                        <div className='link'>
                            <Link href="/login"> LOGIN</Link>
                            <div className='footer-underline'></div>
                        </div>
                    </div>
                </div>
            </Grid>
        )
    }
}
