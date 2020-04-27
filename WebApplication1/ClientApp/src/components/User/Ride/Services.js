import UserServices from '../../Anonymus/Services'

export const Services = {
    AllRides,
    AddRides,
}

function AllRides() {
    fetch(`/api/ride/yourride?ownerId=${UserServices.currentUserId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            Authorization: `Bearer ${UserServices.userToken}`
        }
    }).then(async response => {
        const data = await response.json();
        if (!response.ok) {
            return Promise.reject();
        }
        console.log(data)
        this.setState({ rides: data })
        return data;
    }).catch(error => {
        console.log(error);
    })
}

function AddRides(viaPoints) {
    var token = UserServices.userToken;
    var carDetailsStr = localStorage.getItem('carDetails');
    var rideDetailsStr = localStorage.getItem('rideDetails')
    if (carDetailsStr === null || rideDetailsStr === null)
        return;
    var RideDetails = JSON.parse(rideDetailsStr);
    var cardetails = JSON.parse(carDetailsStr);
    if (token) {
        return fetch(`/api/ride/createride`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                From: RideDetails.from,
                To: RideDetails.to,
                TravelDate: RideDetails.date,
                AvailableSeats: viaPoints.availableSeats,
                RatePerKM: viaPoints.ratePerKM,
                ViaPoints: (JSON.stringify(viaPoints.viaPoints)).toString(),
                OwnerId: cardetails.ownerId,
                CarId: cardetails.id,
            }),
        })
            .then(async response => {
                const data = await response.json();
                if (!response.ok) {
                    console.log(response);
                    const error = (data && data.message) || response.status;
                    return Promise.reject(error);
                }

                localStorage.removeItem('carSetails');
                localStorage.removeItem('rideDetails');
                return data;
            }).catch(error => {
                sessionStorage.clear();
                return console.log(error);
            })
    }
}

export default Services;