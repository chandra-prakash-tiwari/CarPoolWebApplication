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
    }).then(async response => {
        if (response.status == 200) {
            const data = await response.json();
            return Promise.resolve(data);
        }
        else if (response.status == 401) {
            alert("Your session is expired please login again");
            sessionStorage.clear();
            return Promise.reject();
        }
        else
            return Promise.reject();
        }).catch(error => {
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
        if (response.status == 200) {
            const data = await response.json();
            return Promise.resolve(data);
        }
        else if (response.status == 401) {
            alert("Your session is expired please login again");
            sessionStorage.clear();
            return Promise.reject();
        }
        return Promise.reject();
        
    }).catch(error => {
        console.log(error);
    })
}

export default BookingService;