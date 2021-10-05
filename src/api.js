import axios from 'axios';

const host = 'http://localhost:8081';
const config = {
    validateStatus: function (status) {
        return true; // default
    }
};

export async function login(login, password) {
    return await _post(host + "/login", {login, password});
}

export async function signup(user) {
    return await _post(host + "/signup", user);
}

async function _get(url) {
    const response = await axios.get(url, config);

    return _checkAndWrapResponse(response);
}

async function _post(url, postData = {}) {
    const response = await axios.post(url, postData, config);

    return _checkAndWrapResponse(response);
}

function _checkAndWrapResponse(response) {
    console.log("response");
    console.log(response);
    if (!response) {
        return {
            success: false,
            errorMessage: 'Unable to get response from server',
        }
    }

    if (response.status === 200) {
        return {
            success: true,
            data: response.data,
        }
    }

    if (response.status === 401) {
        window.location.href = window.location.href.host + '/login';
    }

    if (response.status === 400) {
        return {
            success: false,
            errorMessage: response.data.message || 'Client-side error',
        }
    }

    if (response.status === 500) {
        return {
            success: false,
            errorMessage: response.data.message || 'Server-side error',
        }
    }

    return {
        success: false,
        errorMessage: 'Unexpected error ocurred',
    }
}