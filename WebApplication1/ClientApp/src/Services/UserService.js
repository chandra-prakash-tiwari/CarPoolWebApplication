const getCurrentUser = JSON.parse(localStorage.getItem('currentUser'));

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
            if (response.status == 200) {
                const data = await response.json();
                localStorage.setItem('currentUser', JSON.stringify(data));
                return Promise.resolve("ok");
            }
            else if (response.status == 204) 
                return Promise.reject("reject");
       
            return Promise.reject();
        }).catch(error => {
            return error;
        })
}

function Logout() {
    localStorage.removeItem('currentUser');
}

function AddNewUser(userData) {
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
            else {
                return Promise.reject('Reject');
            }
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
    }).then(async response => {
        return await response.json();
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
        if (response.status == 200) {
            const data = await response.json();
            return Promise.resolve(data.name);
        }
        else {
            return Promise.reject();
        }
        
    }).catch(error => {
        console.log(error);
    })
}

function checkExpiration() {
    var values = JSON.parse(localStorage.getItem('storedData'));
    if (values[1] < new Date()) {
        localStorage.removeItem("storedData")
    }
}

function myFunction() {
    var myinterval = 15 * 60 * 1000; 
    setInterval(function () { checkExpiration(); }, myinterval);
}

myFunction();

export default UserService;