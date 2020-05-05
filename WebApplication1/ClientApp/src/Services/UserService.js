const getCurrentUser = JSON.parse(sessionStorage.getItem('currentUser'));

export const UserService = {
    GetUser,
    Login,
    Logout,
    AddNewUser,
    ValidEmail,
    ValidUserName,
    currentUser: getCurrentUser
}

function Login(loginDetails) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginDetails)
    };
    return fetch('/api/user/authenticate', requestOptions)
        .then(async response => {
            const data = await response.json();
            if (!response.ok) {
                alert("Wrong userid or password")
                return Promise.reject();
            }
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
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
    };

    return fetch('/api/user/create', requestOptions)
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
    return fetch(`/api/user/hasusername?userName=${userName}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    }).then(async response => {
        return await response.json();
    })
}

function ValidEmail(email) {
    return fetch(`/api/user/hasemail?email=${email}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    }).then(response => {
        return response;
    })
}

function GetUser(id) {
    return fetch(`/api/user/getbyid?id=${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            Authorization: `Bearer ${this.currentUser.userToken}`
        }
    }).then(async response => {
        const data = await response.json();
        if (!response.ok) {
            return Promise.reject();
        }
        return Promise.resolve(data.name);
    }).catch(error => {
        console.log(error);
    })
}

export default UserService;