import * as React from 'react';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Services from'./Services'
import '../../css/sign-up-form.css'
import VisibilityIcon from '@material-ui/icons/Visibility';
import { InputAdornment } from '@material-ui/core';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

type signUp= {
    name?: string,
    mobile?: string,
    userName?: string,
    address?: string,
    drivingLicence?: string,
    email?: string,
    password?: string,
    confirmPassword?: string,
    invalidName?: string,
    invalidMobile?: string,
    invalidUserName?: string,
    invalidAddress?: string,
    invalidDrivingLicence?: string,
    invalidEmail?: string,
    invalidPassword?: string,
    invalidConfirmPassword?: string,
    passwordVisibilty: 'text' | 'password'
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
            password: '',
            confirmPassword: '',
            invalidName: '',
            invalidMobile: '',
            invalidUserName: '',
            invalidAddress: '',
            invalidDrivingLicence: '',
            invalidEmail: '',
            invalidPassword: '',
            invalidConfirmPassword: '',
            passwordVisibilty: 'password'
        }
        this.emailValidator = this.emailValidator.bind(this);
    }

    changes = (event:any) => {
        this.setState({
            ...this.state,
            [event.target.name]: event.target.value
        });

        switch (event.target.name) {
            case 'name':
                this.nameValidator(event.target.value);
                break;

            case 'mobile':
                this.mobileNumberValidator(event.target.value);
                break;

            case 'userName':
                this.userNamevalidator(event.target.value);
                break;

            case 'address':
                this.addressValidator(event.target.value);
                break;

            case 'drivingLicence':
                this.drivingLicenceValidator(event.target.value);
                break;

            case 'email':
                this.emailValidator(event.target.value);
                break;

            case 'password':
                this.passwordValidator(event.target.value);
                break;

            case 'confirmPassword':
                this.confirmPasswordValidator(event.target.value);
                break;
        }
    }

    submit =(event: any)=> {
        event.preventDefault();
        if (this.nameValidator(this.state.name) && this.mobileNumberValidator(this.state.mobile) && this.userNamevalidator(this.state.userName) &&
            this.addressValidator(this.state.address) && this.drivingLicenceValidator(this.state.drivingLicence) && this.emailValidator(this.state.email) &&
            this.passwordValidator(this.state.password) && this.confirmPasswordValidator(this.state.confirmPassword)) {
            var data = {
                username: this.state.userName,
                password: this.state.password,
                name: this.state.name,
                mobile: this.state.mobile,
                email: this.state.email,
                address: this.state.address,
                drivingLicence: this.state.drivingLicence
            }
            Services.AddNewUser(data);
            window.location.pathname = '/login';
        }
            
    }

    nameValidator(inputName: any): boolean{
        var name = /^[a-zA-Z]+(\s[a-zA-Z]+)?$/;
        if (inputName === null || inputName.length === 0) {
            this.setState({ invalidName: "Please enter name" });
            return false;
        }
        else if (!inputName?.match(name)) {
            this.setState({ invalidName: "Please enter correct name" });
            return false;
        }
        else {
            this.setState({ invalidName: '' });
            return true;
        }
    }

    passwordValidator(inputPassword: any): boolean{
        if (inputPassword === null || inputPassword.length === 0) {
            this.setState({ invalidPassword: "Please enter password" });
            return false;
        }
        else {
            this.setState({ invalidPassword: "" });
            return true;
        }
    }

    userNamevalidator(userName: any): boolean{
        if (userName === null || userName.length === 0) {
            this.setState({ invalidUserName: "Please enter username" });
            return false;
        }
        else {
            this.setState({ invalidUserName: "" });
            return true;
        }
    }

    emailValidator(inputEmail: any): boolean{
        var syntax = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (inputEmail === null || inputEmail.length === 0) {
            this.setState({ invalidEmail: "Please enter email" });
            return false;
        }
        else if (!inputEmail.match(syntax)) {
            this.setState({ invalidEmail: "Enter correct format" });
            return false;
        }
        else {
            this.setState({ invalidEmail: "" })
            return true;
        }
    }

    confirmPasswordValidator(rePassword: any): boolean {
        var password = this.state.password;
        if (rePassword == null || rePassword.length == 0) {
            this.setState({ invalidConfirmPassword: "Re-enter password" });
            return false;
        }
        else if (password != rePassword) {
            this.setState({ invalidConfirmPassword: "password-can't matched" });
            return false;
        }
        else {
            this.setState({ invalidConfirmPassword: "" });
            return true;
        }
    }

    drivingLicenceValidator(drivingLicence: any): boolean {
        return true
    }

    addressValidator(address: any): boolean {
        if (address == null || address.length == 0) {
            this.setState({ invalidAddress: "Please enter address" });
            return false;
        }
        else {
            this.setState({ invalidAddress: "" });
            return true;
        }
    }

    mobileNumberValidator(mobile: any): boolean {
        var syntax = /^[789]\d{9}$/;
        if (mobile == null || mobile.length == 0) {
            this.setState({ invalidMobile: "Please enter mobile number" });
            return false;
        }
        else if (!mobile.match(syntax)) {
            this.setState({ invalidMobile: "Enter correct mobile number" });
            return false;
        }
        else {
            this.setState({ invalidMobile: "" });
            return true;
        }
    }

    visibity = () => {
        this.state.passwordVisibilty == 'password' ?
            this.setState({ passwordVisibilty: 'text' }) :
            this.setState({ passwordVisibilty: 'password' })
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
                        <TextField className='input' variant="filled" onChange={(event) => this.changes(event)} value={this.state.name} id="Name" label="Name" name="name" helperText={this.state.invalidName} autoFocus />
                        <TextField className='input' variant="filled" onChange={(event) => this.changes(event)} value={this.state.mobile} id="Mobile" label="Mobile" name="mobile" helperText={this.state.invalidMobile} />
                        <TextField className='input' variant="filled" onChange={(event) => this.changes(event)} value={this.state.userName} id="UserName" label="UserName" name="userName" helperText={this.state.invalidUserName} />
                        <TextField className='input' variant="filled" onChange={(event) => this.changes(event)} value={this.state.address} id="Address" label="Address" name="address" helperText={this.state.invalidAddress} />
                        <TextField className='input' variant="filled" onChange={(event) => this.changes(event)} value={this.state.drivingLicence} id="DrivingLicenece" label="Driving Licenece" name="drivingLicence" helperText={this.state.invalidDrivingLicence} />
                        <TextField className='input' variant="filled" onChange={(event) => this.changes(event)} value={this.state.email} id="email" label="Email Address" name="email" type='email' helperText={this.state.invalidEmail} />
                        <TextField className='input' variant="filled" onChange={(event) => this.changes(event)} value={this.state.password} name="password" label="Password" type={this.state.passwordVisibilty} id="password" helperText={this.state.invalidPassword}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position='end' onClick={this.visibity} >
                                        {this.state.passwordVisibilty == 'password' ? <VisibilityIcon /> : <VisibilityOff />}
                                    </InputAdornment>
                                )
                            }}/>
                        <TextField className='input' variant="filled" onChange={(event) => this.changes(event)} value={this.state.confirmPassword} name="confirmPassword" label="Confirm Password" type="text" id="confirm-password" helperText={this.state.invalidConfirmPassword} />
                        <div className='submit'>
                            <button type='submit' onClick={this.submit}><span>Submit</span></button>
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
