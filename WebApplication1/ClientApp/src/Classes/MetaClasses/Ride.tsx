export class ViaPointsMeta {
    switch: boolean;
    viaCityNameError: Array<ViaCityMeta>;
    availableSeatError: string;
    ratePerKMError: string;

    constructor() {
        this.switch = true;
        this.viaCityNameError = [new ViaCityMeta()];
        this.availableSeatError = '';
        this.ratePerKMError = '';
    }
}

export class ViaCityMeta {
    cityNameError: string;

    constructor() {
        this.cityNameError = '';
    }
}

export class CreateRideMeta {
    viaPointComponent: boolean;
    switch: boolean;
    fromError: string;
    toError: string;
    dateError: string;

    constructor() {
        this.viaPointComponent = false;
        this.switch = true;
        this.fromError = '';
        this.toError = '';
        this.dateError = '';
    }
}
