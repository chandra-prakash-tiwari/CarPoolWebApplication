const getCurrentUser = JSON.parse(localStorage.getItem('currentUser'));

export const UserService = {
    getUser,
    login,
    logout,
    sessionExpired,
    addNewUser,
    validEmail,
    validUserName,
    currentUser: getCurrentUser
}

function login(loginDetails) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginDetails)
    };
    return fetch('/api/user/authenticate', requestOptions)
        .then(async response => {
            if (response.status == 200) {
                const data = await response.json();
                localStorage.setItem('currentUser', JSON.stringify(data));
                return Promise.resolve("ok");
            }
            else if (response.status == 204) 
                return Promise.reject("wrong");

            else if (response.status === 500) {
                return Promise.reject("servererror");
            }

            return Promise.reject();
        }).catch(error => {
            return error;
        })
}

function logout() {
    localStorage.removeItem('currentUser');
}

function addNewUser(userData) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
    };
    return fetch('/api/user/create', requestOptions)
        .then(async response => {
            if (response.status == 200) {
                window.location.pathname = '/login';
                return Promise.resolve('Ok');
            }
            else if (response.status === 500) {
                alert("Internal server can't working please contact to administrator");
                return Promise.reject();
            }
            else {
                return Promise.reject('Reject');
            }
        }).catch(error => {
            return console.log(error);
        })
}

function validUserName(userName) {
    return fetch(`/api/user/hasusername?userName=${userName}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    }).then(async response => {
        return await response.json();
    })
}

function validEmail(email) {
    return fetch(`/api/user/hasemail?email=${email}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    }).then(async response => {
        return await response.json();
    })
}

function sessionExpired() {
    alert("Your session is expired please login again");
    window.location.pathname = '/home';
    localStorage.clear();
}

function getUser(id) {
    return fetch(`/api/user/getbyid?id=${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            Authorization: `Bearer ${this.currentUser.userToken}`
        }
    }).then(async response => {
        if (response.status == 200) {
            const data = await response.json();
            return Promise.resolve(data.name);
        }
        else if (response.status === 500) {
            alert("Internal server can't working please contact to administrator");
            return Promise.reject();
        }
        else {
            return Promise.reject();
        }
        
    }).catch(error => {
        console.log(error);
    })
}

export default UserService;