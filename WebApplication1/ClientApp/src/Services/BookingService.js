import UserService from './UserService'

export const BookingService = {
    searchRide,
    myBookings,
    addBookings
};

function addBookings(booking) {
    var data = {
        rideId: booking.id,
        from: booking.from,
        to: booking.to,
        travelDate: booking.travelDate,
        bookingDate: booking.travelDate,
        status:3
    }
    console.log(data);
    return fetch(`/api/booking/create?bookerId=${UserService.currentUser.id}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `Bearer ${UserService.currentUser.userToken}`,
        },
        body: JSON.stringify(data),
    }).then(async response => {
        console.log(response)
        if (response.status === 204) {
            return Promise.resolve("Ok");
        }
        else if (response.status === 500) {
            alert("Internal server can't working please contact to administrator");
            return Promise.reject();
        }
    }).catch(error => {
        return error;
    })
}

function searchRide(bookingSearch) {
    var data = {
        From: bookingSearch.from,
        To: bookingSearch.to,
        TravelDate: bookingSearch.date
    }
    return fetch('/api/ride/offers', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `Bearer ${UserService.currentUser.userToken}`,
        },
        body: JSON.stringify(data),
    }).then(async response => {

        if (response.status == 200) {
            const data = await response.json();
            return Promise.resolve(data);
        }
        else if (response.status == 401) {
            UserService.sessionExpired();
            return Promise.reject();
        }
        else if (response.status === 500) {
            alert("Internal server can't working please contact to administrator");
            return Promise.reject();
        }
        else
            return Promise.reject();
        }).catch(error => {
            return console.log(error);
        })
}

function myBookings() {
    return fetch(`/api/booking/getbyuserid?userid=${UserService.currentUser.id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            Authorization: `Bearer ${UserService.currentUser.userToken}`
        }
    }).then(async response => {
        if (response.status == 200) {
            const data = await response.json();
            return Promise.resolve(data);
        }
        else if (response.status == 401) {
            UserService.sessionExpired();
            return Promise.reject();
        }
        else if (response.status === 500) {
            alert("Internal server can't working please contact to administrator");
            return Promise.reject();
        }
        return Promise.reject();
        
    }).catch(error => {
        console.log(error);
    })
}

export default BookingService;