import * as api from '../../api';

const LOGIN_START = 'fe-react-template/Auth/LOGIN_START';
const LOGIN_FAIL = 'fe-react-template/Auth/LOGIN_FAIL';
const LOGIN_SUCCESS = 'fe-react-template/Auth/LOGIN_SUCCESS';

const SIGNUP_START = 'fe-react-template/Auth/SIGNUP_START';
const SIGNUP_FAIL = 'fe-react-template/Auth/SIGNUP_FAIL';
const SIGNUP_SUCCESS = 'fe-react-template/Auth/SIGNUP_SUCCESS';

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
        default:
            return state;
    }
}

export function login(login, password) {
    return async (dispatch, getState) => {
        dispatch({ type: LOGIN_START });

        const loginResult = await api.login(login, password);

        if (loginResult.success) {
            dispatch({ type: LOGIN_SUCCESS, payload: {
                    name: loginResult.data.user.name,
                    lastName: loginResult.data.user.lastName,
                    login: loginResult.data.user.login
                }
            });
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
            dispatch({ type: SIGNUP_SUCCESS, payload: {
                    name: signupResult.data.user.name,
                    lastName: signupResult.data.user.lastName,
                    login: signupResult.data.user.login
                }
            });
        } else {
            dispatch({ type: SIGNUP_FAIL, payload: signupResult.errorMessage });
        }
    };
}
