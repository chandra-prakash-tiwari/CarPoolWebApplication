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

    onChanges = (event: any) => {
        this.setState({
            ...this.state,
            user: { ...this.state.user, [event.target.name]: event.target.value }
        });
    }

    isEmpty(value: string) {
        return !value || (value && value.trim().length === 0)
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
        let isValidExp = this.isValid(value, /^[a-zA-Z ]*$/);
        this.setState({ ...this.state, meta: { ...this.state.meta, nameError: emptyStatus ? "Required" : (isValidExp ? "Invalid" : "") } });
        return emptyStatus && !isValidExp;
    }

    isValidEmail(value: string) {
        let emptyStatus = this.isEmpty(value);
        let isValidExp = this.isValid(value, /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
        this.setState({ ...this.state, meta: { ...this.state.meta, emailError: emptyStatus ? "Required" : (isValidExp ? "Invalid" : "") } });
        return emptyStatus && !isValidExp;
    }

    isValidMobileNumber(value: string) {
        let emptyStatus = this.isEmpty(value);
        let isValidExp = this.isValid(value, /^[6789]\d{9}$/);
        this.setState({ ...this.state, meta: { ...this.state.meta, mobileError: emptyStatus ? "Required" : (isValidExp ? "Invalid" : "") } });
        return emptyStatus && !isValidExp;
    }

    isValidPassword(value: string) {
        let emptyStatus = this.isEmpty(value);
        let validStatus = this.isValid(value, /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/);
        this.setState({ ...this.state, meta: { ...this.state.meta, passwordError: emptyStatus ? "Required" : (validStatus ? "Invalid" : "") } });
        return emptyStatus && !validStatus;
    }

    isValidUserName(value: string) {
        let emptyStatus = this.isEmpty(value);
        const isAvailable = this.hasUserName(value);
        this.setState({ ...this.state, meta: { ...this.state.meta, userNameError: emptyStatus ? "Required" : (!isAvailable ? "taken by someone" : "") } });
        return emptyStatus;
    }

    isEqualPassword(value: string) {
        let emptyStatus = this.isEmpty(value);
        let validStatus = (value == this.state.user.password);
        this.setState({ ...this.state, meta: { ...this.state.meta, passwordError: emptyStatus ? "Required" : (validStatus ? "password not matched" : "") } });
        return emptyStatus && !validStatus;
    }

    isValidDrivingLicence(value: string) {
        let emptyStatus = this.isEmpty(value);
        let validStatus = this.isValid(value, /^[0-9a-zA-Z]{4,9}$/);
        this.setState({ ...this.state, meta: { ...this.state.meta, drivingLicenceError: emptyStatus ? "Please enter driving licence" : (validStatus ? "Driving licence is not correct" : "") } })
        return emptyStatus && !validStatus;
    }

    isValidAddress(value: string) {
        let emptyStatus = this.isEmpty(value);
        this.setState({ ...this.state, meta: { ...this.state.meta, addressError: emptyStatus ? "Please enter address" : "" } });
        return emptyStatus;
    }

    onSubmit = (event: any) => {
        event.preventDefault();
        let isValid = this.isValidName(this.state.user.name);
        isValid = isValid && this.isValidAddress(this.state.user.address);
        isValid = isValid && this.isValidMobileNumber(this.state.user.mobile);
        isValid = isValid && this.isValidUserName(this.state.user.userName);
        isValid = isValid && this.isValidPassword(this.state.user.password);
        isValid = isValid && this.isEqualPassword(this.state.user.password);
        isValid = isValid && this.isValidEmail(this.state.user.email);
        isValid = isValid && this.isValidDrivingLicence(this.state.user.drivingLicence);
        if (isValid) {
            UserService.addNewUser(this.state.user).then((response) => {
                if (response == 'Ok')
                    window.location.pathname = '/login';
                else if (response == 'Reject') {

                }
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
                        <Tooltip title='Required' placement='bottom' >
                            <TextField className='input' variant="filled" onChange={(event) => { this.onChanges(event); this.isValidName(event.target.value) }} value={this.state.user.name} label="Name" type='text' name="name" autoFocus />
                        </Tooltip>
                        <span>{this.state.meta.nameError}</span>
                        <Tooltip title='Required' placement='bottom' >
                            <TextField className='input' variant="filled" onChange={(event) => { this.onChanges(event); this.isValidMobileNumber(event.target.value) }} value={this.state.user.mobile} label="Mobile" name="mobile" />
                        </Tooltip>
                        <span>{this.state.meta.mobileError}</span>
                        <Tooltip title='Required' placement='bottom' >
                            <TextField className='input' variant="filled" onChange={(event) => { this.onChanges(event); this.isValidUserName(event.target.value) }} value={this.state.user.userName} label="UserName" name="userName" />
                        </Tooltip>
                        <span>{this.state.meta.userNameError}</span>
                        <Tooltip title='Required' placement='bottom' >
                            <TextField className='input' variant="filled" onChange={(event) => { this.onChanges(event); this.isValidAddress(event.target.value) }} value={this.state.user.address} label="Address" name="address" />
                        </Tooltip>
                        <span>{this.state.meta.addressError}</span>
                        <Tooltip title={this.state.meta.drivingLicenceError} placement='bottom' >
                            <TextField className='input' variant="filled" onChange={(event) => { this.onChanges(event); this.isValidDrivingLicence(event.target.value) }} value={this.state.user.drivingLicence} label="Driving Licenece" name="drivingLicence" />
                        </Tooltip>
                        <span>{this.state.meta.drivingLicenceError}</span>
                        <Tooltip title='Required' placement='bottom' >
                            <TextField className='input' variant="filled" onChange={(event) => { this.onChanges(event); this.isValidEmail(event.target.value) }} value={this.state.user.email} label="Email Address" name="email" type='email' />
                        </Tooltip>
                        <span>{this.state.meta.emailError}</span>
                        <Tooltip title='Password contain 8-15 character and atleast one numberic, upper alphabet, lower alphabet and special character' placement='bottom' >
                            <TextField className='input' variant="filled" onChange={(event) => { this.onChanges(event); this.isValidPassword(event.target.value) }} value={this.state.user.password} name="password" label="Password" type={this.state.meta.passwordType ? 'password' : 'text'}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position='end' onClick={() => { this.setState({ meta: { ...this.state.meta, passwordType: !this.state.meta.passwordType } }) }} >
                                            {this.state.meta.passwordType ? <VisibilityIcon /> : <VisibilityOff />}
                                        </InputAdornment>
                                    )
                                }} />
                        </Tooltip>
                        <span>{this.state.meta.passwordError}</span>
                        <Tooltip title='Required' placement='bottom' >
                            <TextField className='input' variant="filled" onChange={(event) => { this.onChanges(event); this.isEqualPassword(event.target.value) }} value={this.state.user.confirmPassword} name="confirmPassword" label="Confirm Password" type="text" />
                        </Tooltip>
                        <span>{this.state.meta.passwordError}</span>
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
