import UserService from './UserService';

export const RideService = {
    AllRides,
    AddRides,
}

function AllRides() {
    return fetch(`/api/ride/getallrides?ownerId=${UserService.currentUser.id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            Authorization: `Bearer ${UserService.currentUser.userToken}`
        }
    }).then(async response => {
        const data = await response.json();
        if (!response.ok) {
            return Promise.reject();
        }
        return Promise.resolve(data);
    }).catch(error => {
        console.log(error);
    })
}

function AddRides(viaPoints) {
    var carDetailsStr = localStorage.getItem('carDetails');
    var rideDetailsStr = localStorage.getItem('rideDetails')
    if (carDetailsStr === null || rideDetailsStr === null)
        return;
    var RideDetails = JSON.parse(rideDetailsStr);
    var cardetails = JSON.parse(carDetailsStr);
    return fetch('/api/ride/create', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `Bearer ${UserService.currentUser.userToken}`,
        },
        body: JSON.stringify({
            From: RideDetails.from,
            To: RideDetails.to,
            TravelDate: RideDetails.date.toString(),
            AvailableSeats: parseInt(viaPoints.availableSeats),
            RatePerKM: parseInt(viaPoints.ratePerKM),
            ViaPoints: (JSON.stringify(viaPoints.viaPoints)).toString(),
            OwnerId: cardetails.ownerId,
            CarId: cardetails.id,
        }),
    })
        .then(async response => {
            const data = await response.json();
            if (!response.ok) {
                return Promise.reject();
            }

            localStorage.removeItem('carSetails');
            localStorage.removeItem('rideDetails');
            return Promise.resolve(data);
        }).catch(error => {
            return console.log(error);
        })
}

export default RideService;