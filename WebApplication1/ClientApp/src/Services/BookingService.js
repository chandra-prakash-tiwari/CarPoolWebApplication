import UserService from './UserService'

export const BookingService = {
    SearchRide,
    MyBookings
};

function SearchRide(BookingSearch) {
    var data = {
        From: BookingSearch.from,
        To: BookingSearch.to,
        TravelDate: BookingSearch.date
    }
    return fetch('/api/ride/offers', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `Bearer ${UserService.currentUser.userToken}`,
        },
        body: JSON.stringify(data),
    })
        .then(async response => {
            const data = await response.json();
            if (!response.ok) {
                return Promise.reject();
            }
            return Promise.resolve(data);
        }).catch(error => {
            alert("Your session has been expired please login again");
            sessionStorage.clear();
            return console.log(error);
        })
}

function MyBookings() {
    return fetch(`/api/booking/getbyuserid?userid=${UserService.currentUser.id}`, {
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

export default BookingService;