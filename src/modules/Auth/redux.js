import * as api from '../../api';
import { setSession } from '../../utils/auth_utils';

const LOGIN_START = 'fe-react-template/Auth/LOGIN_START';
const LOGIN_FAIL = 'fe-react-template/Auth/LOGIN_FAIL';
const LOGIN_SUCCESS = 'fe-react-template/Auth/LOGIN_SUCCESS';

const SIGNUP_START = 'fe-react-template/Auth/SIGNUP_START';
const SIGNUP_FAIL = 'fe-react-template/Auth/SIGNUP_FAIL';
const SIGNUP_SUCCESS = 'fe-react-template/Auth/SIGNUP_SUCCESS';

const CHECK_AUTH_START = 'fe-react-template/Auth/CHECK_AUTH_START';
const CHECK_AUTH_FAIL = 'fe-react-template/Auth/CHECK_AUTH_FAIL';
const CHECK_AUTH_SUCCESS = 'fe-react-template/Auth/CHECK_AUTH_SUCCESS';

const initialState = {
    isLoggedIn: false,
    requestProcessing: false,
    requestErrorMessage: null,
    user: null,
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case LOGIN_START:
            return {
                ...state,
                requestProcessing: true,
                requestErrorMessage: null,
            };
        case LOGIN_FAIL:
            return {
                ...state,
                requestProcessing: false,
                requestErrorMessage: action.payload,
            };
        case LOGIN_SUCCESS:
            return {
                ...state,
                requestProcessing: false,
                isLoggedIn: true,
                user: action.payload,
            };

        case SIGNUP_START:
            return {
                ...state,
                requestProcessing: true,
                requestErrorMessage: null,
            };
        case SIGNUP_FAIL:
            return {
                ...state,
                requestProcessing: false,
                requestErrorMessage: action.payload,
            };
        case SIGNUP_SUCCESS:
            return {
                ...state,
                requestProcessing: false,
                isLoggedIn: true,
                user: action.payload,
            };

        case CHECK_AUTH_START:
            return {
                ...state,
                requestProcessing: true,
                requestErrorMessage: null,
            };
        case CHECK_AUTH_FAIL:
            return {
                ...state,
                isLoggedIn: false,
                requestProcessing: false,
            };
        case CHECK_AUTH_SUCCESS:
            return {
                ...state,
                requestProcessing: false,
                isLoggedIn: true,
                user: action.payload,
            };
        default:
            return state;
    }
}

export function login(login, password) {
    return async (dispatch, getState) => {
        dispatch({ type: LOGIN_START });

        const loginResult = await api.login(login, password);

        if (loginResult.success) {
            dispatch({ 
                type: LOGIN_SUCCESS,
                payload: _extractUser(loginResult.data.user),
            });

            setSession(loginResult.data.user.id);
        } else {
            dispatch({ type: LOGIN_FAIL, payload: loginResult.errorMessage });
        }
    };
}

export function signup(user) {
    return async (dispatch, getState) => {
        dispatch({ type: SIGNUP_START });

        const signupResult = await api.signup(user);

        if (signupResult.success) {
            dispatch({
                type: SIGNUP_SUCCESS, 
                payload: _extractUser(signupResult.data.user)
            });

            setSession(signupResult.data.user.id);
        } else {
            dispatch({ type: SIGNUP_FAIL, payload: signupResult.errorMessage });
        }
    };
}

export function checkAuth() {
    console.log('CHECK AUTH CALLED');
    return async (dispatch, getState) => {
        dispatch({ type: CHECK_AUTH_START });

        const checkAuthResult = await api.checkAuth();

        if (checkAuthResult.success) {
            dispatch({
                type: CHECK_AUTH_SUCCESS,
                payload: _extractUser(checkAuthResult.data.user)
            });

            setSession(checkAuthResult.data.user.id);
        } else {
            dispatch({ type: CHECK_AUTH_FAIL, payload: checkAuthResult.errorMessage });
        }
    };
}

function _extractUser(userResponseData) {
    return {
        name: userResponseData.name,
        lastName: userResponseData.lastName,
        login: userResponseData.login,
    };
};