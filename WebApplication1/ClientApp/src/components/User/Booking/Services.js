import userServices from '../../Anonymus/Services'

export const Services = {
    SearchRide,
    MyBookings
};

function SearchRide(BookingSearch) {
    var token = userServices.userToken;
    return fetch(`/api/ride/searchride`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
            From: BookingSearch.from,
            To: BookingSearch.to,
            TravelDate: BookingSearch.date
        }),
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
    return fetch(`/api/booking/userbooking?ownerId=${userServices.currentUserId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            Authorization: `Bearer ${userServices.userToken}`
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

export default Services;