export class LoginMeta {
    userNameError: string;
    passwordError: string;
    passwordType: boolean;
    errorDisaplyOnSubmit: boolean;
    displaySpan: string;
    wrongPasswordError: boolean;
    serverError: boolean;

    constructor() {
        this.userNameError = 'Required';
        this.passwordError = 'Required';
        this.displaySpan = 'none';
        this.passwordType = true;
        this.errorDisaplyOnSubmit = true;
        this.wrongPasswordError = false;
        this.serverError = false;
    }
}

export class SignUpMeta {
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
        this.nameError = '';
        this.mobileError = '';
        this.userNameError = '';
        this.addressError = '';
        this.drivingLicenceError = '';
        this.emailError = '';
        this.passwordError = '';
        this.passwordMatchError = '';
        this.passwordType = true;
    }
}