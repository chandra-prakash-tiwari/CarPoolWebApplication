
const getCurrentUserId = sessionStorage.getItem('currentUserId');
const getUserToken = sessionStorage.getItem('userToken');
const getCurrentUser = JSON.parse(sessionStorage.getItem('currentUser'));

export const Authentication = {
    login,
    logout,
    currentUserId: getCurrentUserId,
    userToken: getUserToken,
    currentUser:getCurrentUser
};

function login(username, password) {
    console.log(JSON.stringify({ username, password }))
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    };

    return fetch('/api/user/authenticate', requestOptions)
        .then(async response => {
            const data = await response.json();
            if (!response.ok) {
                console.log(response);
                const error = (data && data.message) || response.status;
                return Promise.reject(error);
            }
            console.log(data);
            sessionStorage.setItem('currentUserId', data.id);
            sessionStorage.setItem('userToken', data.userToken);
            sessionStorage.setItem('currentUser', JSON.stringify(data));
                return data;
        }).catch(error => {
            return console.log(error);
        })
}

function logout() {
    sessionStorage.removeItem('currentUser');
}

export default Authentication;