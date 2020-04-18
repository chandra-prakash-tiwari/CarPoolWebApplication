import Authentication from './authentication'

export const Cars = {
    AddNewCar,
};

function AddNewCar(Number, Model, abc) {
    var token = Authentication.userToken;
    var NoofSeat = parseInt(abc)
    if (token) {
        return fetch(`/api/car/addnewcar?ownerid=${Authentication.currentUserId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept:'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ Number, Model, NoofSeat }),
        })
        .then(async response => {
            const data = await response.json();
            if (!response.ok) {
                console.log(response);
                const error = (data && data.message) || response.status;
                return Promise.reject(error);
            }

            window.location.pathname='/car'

            return data;
        }).catch(error => {
            return console.log(error);
        })
    }
}

export default Cars;