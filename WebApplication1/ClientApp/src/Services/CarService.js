import UserService from './UserService'

export const CarService = {
    AddNewCar,
    GetCars,
};

function AddNewCar(carDetails) {
    carDetails.noofseat = parseInt(carDetails.noofseat);
    return fetch(`/api/car/create?ownerid=${UserService.currentUser.id}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `Bearer ${UserService.currentUser.userToken}`,
        },
        body: JSON.stringify(carDetails),
    }).then(async response => {
        if (response.status === 200) {
            return Promise.resolve('Ok')
        }
        else if (response === 401) {
            alert("Your session is expired please login again");
            sessionStorage.clear();
            return Promise.reject();
        }
        else if (response.status === 404) {
            return Promise.reject('Server error');
        }
        else
            return Promise.reject();
    }).catch(error => {
        return error;
    })
}

function GetCars() {
    return fetch(`/api/car/getbyownerid?ownerId=${UserService.currentUser.id}`, {
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
            alert("Your session is expired please login again");
            sessionStorage.clear();
            return Promise.reject();
        }

        else
            return Promise.reject();
    }).catch(error => {
        return error;
    })
}

export default CarService;