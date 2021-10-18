// This is for local usage without BE
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
    return new Promise((resolve, reject) => {
        resolve({
            success: true,
            data: {
                user: {
                    id: 444,
                    name: 'Ketty',
                    lasName: 'Perry',
                    email: 'ssfg@ff.ru',
                }
            },
        });
    });
    // return await _post(host + "/checkAuth");
}

export async function initialBalance(initialBalanceValue) {
    return await _post(host + "/initialBalance", initialBalanceValue);
}

export async function getCurrentBalance() {
    return await _get(host + `/getCurrentBalance?userId=${getSession()}`);
}

export async function getDailyLimit() {
    return await _get(host + `/getDailyLimit?userId=${getSession()}`)
}

export async function getAvailableCategories() {
    return new Promise((resolve, reject) => {
        resolve({
            success: true,
            data: {
                incomeList: [
                    {
                        id: 0,
                        name: 'Заначка',
                        uselessType: false,
                        incomeLabel: true,
                        listSubcategories: [
                            {
                                id: 0,
                                name: 'Под холодосом',
                                uselessType: false,
                                incomeLabel: true,
                            },
                            {
                                id: 0,
                                name: 'В бачке унитаза',
                                uselessType: false,
                                incomeLabel: true,
                            },
                            {
                                id: 0,
                                name: 'В матрасе',
                                uselessType: false,
                                incomeLabel: true,
                            },
                            {
                                id: 0,
                                name: 'У Бобика в анусе',
                                uselessType: false,
                                incomeLabel: true,
                            },
                        ]
                    },
                ],

                expensesList: [
                    {
                        id: 0,
                        name: 'На бухло',
                        uselessType: false,
                        incomeLabel: true,
                        listSubcategories: [
                            {
                                id: 0,
                                name: 'На пиво',
                                uselessType: false,
                                incomeLabel: true,
                            },
                            {
                                id: 1,
                                name: 'Еще на пиво',
                                uselessType: false,
                                incomeLabel: true,
                            },
                            {
                                id: 2,
                                name: 'На самогон',
                                uselessType: false,
                                incomeLabel: true,
                            },
                            {
                                id: 3,
                                name: 'На антифриз',
                                uselessType: false,
                                incomeLabel: true,
                            },
                        ]
                    },
                ],
            },
        });
    });
    // return await _get(host + `/getAvailableCategories?userId=${getSession()}`);
}

export async function getAllPaymentsForUser() {
    return new Promise((resolve, reject) => {
        resolve({
            success: true,
            data: [
                {
                    userId: 444,
                    incomeLabel: true,
                    date: '12/10/2021',
                    categoryName: 'Заначка',
                    subcategoryName: 'В старом борще',
                    value: 100,
                },
                {
                    userId: 444,
                    incomeLabel: false,
                    date: '12/10/2021',
                    categoryName: 'На бухло',
                    subcategoryName: 'Другу на опохмел',
                    value: 100,
                },
            ],
        });
    });

    // return await _get(host + `/getAllPayments?userId=${getSession()}`);
}

export async function getLastPaymentsForUser(limit) {
    return await _get(host + `/getLastPayments?userId=${getSession()}&limit=${limit}`);
}

export async function addPayment(payment) {
    return await _post(host + "/addPayment", payment);
}

async function _get(url) {
    //host + `?userId=${getSession()}`
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