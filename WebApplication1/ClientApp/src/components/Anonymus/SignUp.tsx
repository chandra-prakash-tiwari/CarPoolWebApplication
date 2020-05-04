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

type SignUpDetails= {
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

export default class SignUp extends React.Component<{}, SignUpDetails> {
    constructor(props: SignUpDetails) {
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
    }

    changes = (event:any) => {
        this.setState({
            ...this.state,
            [event.target.name]: event.target.value
        });

        this.Validator(event.target.name, event)
    }

    submit =(event: any)=> {
        event.preventDefault();
        if (this.Validator('name', this.state.name) && this.Validator('mobile', this.state.mobile) && this.Validator('userName', this.state.userName) &&
            this.Validator('address', this.state.address) && this.Validator('drivingLicence', this.state.drivingLicence) && this.Validator('userName', this.state.userName) &&
            this.Validator('password', this.state.password) && this.Validator('confirmPassword', this.state.confirmPassword)) {
            var data = {
                username: this.state.userName,
                password: this.state.password,
                name: this.state.name,
                mobile: this.state.mobile,
                email: this.state.email,
                address: this.state.address,
                drivingLicence: this.state.drivingLicence
            }
            UserService.AddNewUser(data);
            window.location.pathname = '/login';
        }
            
    }

    IsNull(value:any) {
        return (value===null||value.length===0)
    }

    IsValidPassword(value: any) {
        return (!value.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/))
    }

    IsString(value: any) {
        return (!value.match(/^[a-zA-Z]+(\s[a-zA-Z]+)?$/))
    }

    IsValidEmail(value: any) {
        return (!value.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/));
    }

    IsValidMobile(value: any) {
        return (!value.match(/^[789]\d{9}$/));
    }

    MatchPassword(value: any) {
        return this.state.password === value;
    }

    Validator(name:any, value:any) {
        switch (name) {
            case 'userName':
                this.IsNull(value) ? this.setState({ invalidUserName: "Please enter username" }) : this.setState({ invalidUserName: "" });
                return this.IsNull(value);
  
            case 'password':
                this.IsNull(value) ? this.setState({ invalidPassword: "Please enter password" }) :
                    (this.IsValidPassword ? this.setState({ invalidPassword: "Password contain 8-15 character and atleast one numberic, upper alphabet, lower alphabet and special character" }) : this.setState({ invalidPassword: "" }));
                return this.IsNull(value);
            case 'name':
                this.IsNull(value) ? this.setState({ invalidName: "Please enter name" }) : (this.IsString ? this.setState({ invalidName: "Please enter correct name" }) : this.setState({ invalidName: '' }))
                
                break;
            case 'mobile':
                this.IsNull(value) ? this.setState({ invalidMobile: "Please enter mobile number" }) : (this.IsValidMobile ? this.setState({ invalidMobile: "Enter correct mobile number" }) : this.setState({ invalidMobile: "" }));
                return this.IsNull(value) && !this.IsValidMobile(value);
                break;

            case 'email':
                this.IsNull(value) ? this.setState({ invalidEmail: "Please enter email" }) : (this.IsValidEmail ? this.setState({ invalidEmail: "Enter correct format" }) : this.setState({ invalidEmail: "" }))
                return this.IsNull(value) && !this.IsValidEmail(value);

            case 'address':
                this.IsNull(value) ? this.setState({ invalidAddress: "Please enter address" }) : this.setState({ invalidAddress: "" });
                return this.IsNull(value);

            case 'drivingLicence':
                this.IsNull(value) ? this.setState({ invalidDrivingLicence: "Please enter driving licence" }) : this.setState({ invalidDrivingLicence: "" });
                return this.IsNull(value);

            case 'confirmPassword':
                this.IsNull(value) ? this.setState({ invalidConfirmPassword: "Re-enter password" }) : (this.MatchPassword ? this.setState({ invalidConfirmPassword: "password-can't matched" }) : this.setState({ invalidConfirmPassword: "" }))
                return this.IsNull(value) && this.MatchPassword(value);
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
