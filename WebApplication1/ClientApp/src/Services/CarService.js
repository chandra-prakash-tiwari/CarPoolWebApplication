import userServices from './UserService'

export const CarService = {
    AddNewCar,
    GetCars,
};

function AddNewCar(CarDetails) {
    var token = userServices.userToken;
    var details = {
        number: CarDetails.carNumber,
        noofseat: parseInt(CarDetails.noofSeats),
        model: CarDetails.carModel
    }
    if (token) {
        fetch(`/api/car/create?ownerid=${userServices.currentUserId}`, {
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
    return fetch(`/api/car/getbyownerid?ownerId=${userServices.currentUserId}`, {
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

export default CarService;