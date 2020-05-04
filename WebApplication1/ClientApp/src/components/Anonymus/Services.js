
const getCurrentUserId = sessionStorage.getItem('currentUserId');
const getUserToken = sessionStorage.getItem('userToken');
const getCurrentUser = JSON.parse(sessionStorage.getItem('currentUser'));

export const Services = {
    Login,
    Logout,
    AddNewUser,
    currentUserId: getCurrentUserId,
    userToken: getUserToken,
    currentUser: getCurrentUser
};

function Login(loginDetails) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginDetails)
    };

    return fetch('/api/user/login', requestOptions)
        .then(async response => {
            const data = await response.json();
            if (response.ok) {
                sessionStorage.setItem('currentUserId', data.id);
                sessionStorage.setItem('userToken', data.userToken);
                sessionStorage.setItem('currentUser', JSON.stringify(data));
                return data;
            }

            alert("Wrong userid or password")
            return Promise.reject();
            
        }).catch(error => {
            return console.log(error);
        })
}

function Logout() {
    sessionStorage.removeItem('currentUser');
}

function AddNewUser(userData) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
    };

    return fetch('/api/user/addnewuser', requestOptions)
        .then(async response => {
            const data = await response.json();
            if (!response.ok) {
                alert(JSON.stringify(data.errors));
                const error = (data && data.message) || response.status;
                return Promise.reject(error);
            }
            window.location.pathname = '/login';
            return data;
        }).catch(error => {
            return console.log(error);
        })
}

function ValidUserName(userName) {
    return fetch(`/api/user?usernameavailability=${userName}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
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

function ValidEmail(email) {
    return fetch(`/api/user?emailavailabilty=${email}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
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