import axios from 'axios';
import { getSession } from './utils/auth_utils';

const host = 'http://localhost:8081';
const config = {
    validateStatus: function (_) {
        return true; // default
    }
};

export async function login(login, password) {
    return await _post(host + "/login", {login, password}, false);
}

export async function signup(user) {
    return await _post(host + "/signup", user, false);
}

export async function checkAuth() {
    return await _post(host + "/checkAuth");
}

async function _get(url) {
    const response = await axios.get(url, config);

    return _checkAndWrapResponse(response);
}

async function _post(url, postData = {}, withAuth = true) {
    const requestData = withAuth ? { ...postData, userId: getSession() } : postData;

    const response = await axios.post(url, requestData, config);

    return _checkAndWrapResponse(response);
}

function _checkAndWrapResponse(response) {
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

    if (response.status === 400) {
        return {
            success: false,
            errorMessage: response.data.message || 'Client-side error',
        }
    }

    if (response.status === 401) {
        return {
            success: false,
            authFail: true,
            errorMessage: 'Not Authorized',
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