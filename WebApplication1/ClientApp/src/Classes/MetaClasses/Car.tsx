export class AddNewCarMeta {
    switch: boolean;
    carNumberError: string;
    carModelError: string;
    seatError: string

    constructor() {
        this.switch = true;
        this.carNumberError = '';
        this.carModelError = '';
        this.seatError = '';
    }
}

