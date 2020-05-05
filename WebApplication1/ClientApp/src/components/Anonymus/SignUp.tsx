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

    constructor(value: any) {
        this.name = value.name;
        this.mobile = value.mobile;
        this.userName = value.userName;
        this.address = value.address;
        this.drivingLicence = value.drivingLicence;
        this.email = value.email;
        this.password = value.pasword;
        this.nameError = value.nameError;
        this.mobileError = value.mobileError;
        this.userNameError = value.userNameError;
        this.addressError = value.addressError;
        this.confirmPassword = value.confirmPassword;
        this.drivingLicenceError = value.drivingLicenceError;
        this.emailError = value.emailError;
        this.passwordError= value.passwordError;
        this.passwordMatchError = value.passwordMatchError;
        this.passwordType = value.passwordType;
    }
}

export default class SignUp extends React.Component<{}, CreateUser> {
    constructor(props: CreateUser) {
        super(props);
        this.state = new CreateUser({
            name: '',
            mobile: '',
            userName: '',
            address: '',
            drivingLicence: '',
            email: '',
            password: '',
            confirmPassword:'',
            nameError: '',
            mobileError: '',
            userNameError: '',
            addressError: '',
            drivingLicenceError: '',
            emailError: '',
            passwordError: '',
            passwordMatchError: '',
            passwordType:true
        })
    }

    onChanges = (event:any) => {
        this.setState({
            ...this.state,
            [event.target.name]: event.target.value
        });
    }

    IsEmpty(value: string) {
        return !value || (value && value.trim().length===0)
    }

    IsValid(value: string, regex: RegExp) {
        return !value.match(regex);
    }

    NameValidator(value: string) {
        let isEmpty = this.IsEmpty(value);
        let isValid = this.IsValid(value, /^[a-zA-Z ]*$/);
        this.setState({ nameError: isEmpty ? "Please enter name" : (isValid ? "Please enter correct name" : "")})
        return isEmpty && isValid;
    }

    EmailValidator(value: string) {
        let isEmpty = this.IsEmpty(value);
        let isValid = this.IsValid(value, /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
        this.setState({ emailError : isEmpty ? "Please enter email" : (isValid ? "Please enter correct email" : "")})
        return isEmpty && isValid;
    }

    MobileNumberValidator(value: string) {
        let isEmpty = this.IsEmpty(value);
        let isValid = this.IsValid(value, /^[789]\d{9}$/);
        this.setState({ mobileError : isEmpty ? "Please enter mobile number" : (isValid ? "Enter correct mobile number" : "")})
        return isEmpty && isValid;
    }

    PasswordValidator(value: string) {
        let isEmpty = this.IsEmpty(value);
        let isValid = this.IsValid(value, /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/);
        this.setState({ passwordError: isEmpty ? "Please enter password" : (isValid ? "Password contain 8-15 character and atleast one numberic, upper alphabet, lower alphabet and special character" : "") });
        return isEmpty && isValid;
    }

    UserNameValidator(value: string) {
        let isEmpty = this.IsEmpty(value);
        this.setState({ userNameError: isEmpty ? "Please enter username" : "" });
        return isEmpty;
    }

    RePasswordValidator(value: string) {
        let isEmpty = this.IsEmpty(value);
        let isEqual = (value == this.state.password);
        this.setState({ passwordError: isEmpty ? "Please re enter your password" : (isEqual ? "password can not matched" : "") });
        return isEmpty && isEqual;
    }

    DrivingLicenecValidator(value: string) {
        let isEmpty = this.IsEmpty(value);
        let isValid = this.IsValid(value, /^[0-9a-zA-Z]{4,9}$/);
        this.setState({drivingLicenceError: isEmpty ? "Please enter driving licence" : (isValid ? "Driving licence is not correct" : "")})
        return isEmpty && isValid;
    }

    AddressValidator(value: string) {
        let isEmpty = this.IsEmpty(value);
        this.setState({ addressError: isEmpty ? "Please enter address" : "" });
        return isEmpty;
    }


    onSubmit = (event: any) => {
        event.preventDefault();
        if (!this.NameValidator(this.state.name) && !this.MobileNumberValidator(this.state.mobile) && !this.UserNameValidator(this.state.userName) &&
            !this.PasswordValidator(this.state.password) && !this.RePasswordValidator(this.state.password) && !this.EmailValidator(this.state.email) &&
            !this.DrivingLicenecValidator(this.state.drivingLicence) && !this.AddressValidator(this.state.address)) {
            var data = {
                userName: this.state.userName,
                password: this.state.password,
                mobile: this.state.mobile,
                name: this.state.name,
                email: this.state.email,
                address: this.state.address,
                drivingLicence: this.state.drivingLicence
            }
            UserService.AddNewUser(data);
            window.location.pathname = '/login';
        }
    }

    DuplicacyUserName(value: any) {
        return UserService.ValidUserName(value).then((valid) => { return valid} )
    }

    DuplicacyEmail(value: any) {
        return UserService.ValidEmail(value).then((valid) => { return valid })
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
                        <TextField className='input' variant="filled" onChange={(event) => { this.onChanges(event); this.NameValidator(event.target.value) }} value={this.state.name} label="Name" name="name" helperText={this.state.nameError} autoFocus />
                        <TextField className='input' variant="filled" onChange={(event) => { this.onChanges(event); this.MobileNumberValidator(event.target.value) }} value={this.state.mobile} label="Mobile" name="mobile" helperText={this.state.mobileError} />
                        <TextField className='input' variant="filled" onChange={(event) => { this.onChanges(event); this.UserNameValidator(event.target.value) }} value={this.state.userName} label="UserName" name="userName" helperText={this.state.userNameError} />
                        <TextField className='input' variant="filled" onChange={(event) => { this.onChanges(event); this.AddressValidator(event.target.value) }} value={this.state.address} label="Address" name="address" helperText={this.state.addressError} />
                        <TextField className='input' variant="filled" onChange={(event) => { this.onChanges(event); this.DrivingLicenecValidator(event.target.value) }} value={this.state.drivingLicence} label="Driving Licenece" name="drivingLicence" helperText={this.state.drivingLicenceError} />
                        <TextField className='input' variant="filled" onChange={(event) => { this.onChanges(event); this.EmailValidator(event.target.value) }} value={this.state.email} label="Email Address" name="email" type='email' helperText={this.state.emailError} />
                        <TextField className='input' variant="filled" onChange={(event) => { this.onChanges(event); this.PasswordValidator(event.target.value) }} value={this.state.password} name="password" label="Password" type={this.state.passwordType ? 'password' : 'text'} helperText={this.state.passwordError}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position='end' onClick={() => { this.setState({ passwordType: !this.state.password }) }} >
                                        {this.state.passwordType ? <VisibilityIcon /> : <VisibilityOff />}
                                    </InputAdornment>
                                )
                            }} />
                        <TextField className='input' variant="filled" onChange={(event) => { this.onChanges(event); this.RePasswordValidator(event.target.value) }} value={this.state.confirmPassword} name="confirmPassword" label="Confirm Password" type="text" id="confirm-password" helperText={this.state.passwordMatchError} />
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
