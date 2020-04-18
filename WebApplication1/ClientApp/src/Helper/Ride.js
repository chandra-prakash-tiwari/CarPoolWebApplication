var getcar;
var getride;

export const Ride = {
    CarDetails: getcar,
    RideDetails: getride,
    TotalDetails,
    CarRecord,
    RideRecord
};

function CarRecord(abc) {
    Ride.getcar = abc;
    console.log(Ride.getcar)
    return abc;
}

function RideRecord(def) {
    Ride.getride = def
    console.log(Ride.getride);
    return def;
}

function TotalDetails() {
    console.log(Ride.getcar, Ride.getride)
}

export default Ride;