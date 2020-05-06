import UserService from './UserService'

export const BookingService = {
    searchRide,
    myBookings
};

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
        return Promise.reject();
        
    }).catch(error => {
        console.log(error);
    })
}

export default BookingService;