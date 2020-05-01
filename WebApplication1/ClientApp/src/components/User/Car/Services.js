import userServices from '../../Anonymus/Services'

export const Services = {
    AddNewCar,
    GetCars,
};

function AddNewCar(CarDetails) {
    var token = userServices.userToken;
    console.log(CarDetails);
    var details = {
        number: CarDetails.carNumber,
        noofseat: parseInt(CarDetails.noofSeats),
        model: CarDetails.carModel
    }
    console.log(JSON.stringify( details ),);
    if (token) {
        fetch(`/api/car/addnewcar?ownerid=${userServices.currentUserId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(details),
        })
            .then(async response => {
                const data = await response.json();
                if (!response.ok) {
                    console.log(response);
                    const error = (data && data.message) || response.status;
                    return Promise.reject(error);
                }

                window.location.pathname = '/car'
                return data;
            }).catch(error => {
                return console.log(error);
            })
    }
}

function GetCars() {
    return fetch(`/api/car/cars?ownerId=${userServices.currentUserId}`, {
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
        alert("Your session has been expired please login again");
        sessionStorage.clear();
        window.location.pathname = '/login';
    })
}

export default Services;