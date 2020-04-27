
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
            if (!response.ok) {
                alert(JSON.stringify(data.errors))
                const error = (data && data.message) || response.status;
                return Promise.reject(error);
            }

            sessionStorage.setItem('currentUserId', data.id);
            sessionStorage.setItem('userToken', data.userToken);
            sessionStorage.setItem('currentUser', JSON.stringify(data));
            return data;
        }).catch(error => {
            return console.log(error);
        })
}

function Logout() {
    sessionStorage.removeItem('currentUser');
}

function AddNewUser(userData) {
    console.log(this.state);

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

export default Services;