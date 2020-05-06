﻿import UserService from './UserService';

export const RideService = {
    allRides,
    addRides,
}

function allRides() {
    return fetch(`/api/ride/getallrides?ownerId=${UserService.currentUser.id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            Authorization: `Bearer ${UserService.currentUser.userToken}`
        }
    }).then(async response => {
        if (response.status === 200) {
            const data = await response.json();
            return Promise.resolve(data);
        }
        else if (response.status === 401) {
            UserService.sessionExpired();
            return Promise.reject();
        }
        else
            return Promise.reject();
        
    }).catch(error => {
        console.log(error);
    })
}

function addRides(viaPointProps) {
    var carDetails = JSON.parse(sessionStorage.getItem('carDetails'));
    var rideDetails = JSON.parse(sessionStorage.getItem('rideDetails'))
    if (carDetails === null || rideDetails === null)
        return;
    return fetch('/api/ride/create', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `Bearer ${UserService.currentUser.userToken}`,
        },
        body: JSON.stringify({
            From: rideDetails.from,
            To: rideDetails.to,
            TravelDate: rideDetails.date.toString(),
            AvailableSeats: parseInt(viaPointProps.availableSeats),
            RatePerKM: parseInt(viaPointProps.ratePerKM),
            ViaPoints: (JSON.stringify(viaPointProps.cities)).toString(),
            OwnerId: carDetails.ownerId,
            CarId: carDetails.id,
        }),
    }).then(async response => {
        if (response.status === 200) {
            localStorage.removeItem('carSetails');
            localStorage.removeItem('rideDetails');
            return Promise.resolve("Ok");
        }
        else if (response === 401) {
            UserService.sessionExpired();
            return Promise.reject();
        }

        return Promise.reject();
        }).catch(error => {
            return console.log(error);
        })
}

export default RideService;