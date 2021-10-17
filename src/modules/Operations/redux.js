import * as api from "../../api";

const GET_AVAILABLE_CATEGORIES = 'fe-react-template/Operations/GET_AVAILABLE_CATEGORIES';
const GET_ALL_PAYMENTS = 'fe-react-template/Operations/GET_ALL_PAYMENTS';
const GET_LAST_PAYMENTS = 'fe-react-template/Operations/GET_LAST_PAYMENTS';
const ADD_PAYMENT_START = 'fe-react-template/Operations/ADD_PAYMENT_START';
const ADD_PAYMENT_FAIL = 'fe-react-template/Operations/ADD_PAYMENT_FAIL';
const ADD_PAYMENT_SUCCESS = 'fe-react-template/Operations/ADD_PAYMENT_SUCCESS';


const initialState = {
    listCategories: null,
    listPayments: [],
    listLastPayments: [],
    addingProcessing: false,
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_AVAILABLE_CATEGORIES:
            return {
                ...state,
                listCategories: action.payload,
            };
        case GET_ALL_PAYMENTS:
            return {
                ...state,
                listPayments: action.payload,
            };
        case GET_LAST_PAYMENTS:
            return {
                ...state,
                listLastPayments: action.payload,
            }
        case ADD_PAYMENT_START:
            return {
                ...state,
                addingProcessing: true,
            };
        case ADD_PAYMENT_FAIL:
            return {
                ...state,
                addingProcessing: false,
            };
        case ADD_PAYMENT_SUCCESS:
            return {
                ...state,
                addingProcessing: false,
                listPayments: action.payload,
            }
        default:
            return state;
    }
}

export function getCategories() {
    return async (dispatch, getState) => {
        const categoriesResult = await api.getAvailableCategories();
        dispatch({
            type: GET_AVAILABLE_CATEGORIES,
            payload: _extractCategories(categoriesResult.data),
        });
    }
}

export function getAllPayments() {
    console.log("Это getAllPayments");
    return async (dispatch, getState) => {
        const allPaymentsResult = await api.getAllPaymentsForUser();
        console.log(allPaymentsResult);
        dispatch({
            type: GET_ALL_PAYMENTS,
            payload: allPaymentsResult.data,
        });
    }
}

export function getLastPayments(limit) {
    return async (dispatch, getState) => {
        const lastPaymentsResult = await api.getLastPaymentsForUser(limit);
        dispatch({
            type: GET_LAST_PAYMENTS,
            payload: lastPaymentsResult.data,
        })
    }
}

export function addNewPayment(payment) {
    console.log("redux addNewPayment");
    return async (dispatch, getState) => {
        dispatch({ type: ADD_PAYMENT_START });

        const paymentResult = await api.addPayment(payment)

        if (paymentResult.success) {
            dispatch({
                type: ADD_PAYMENT_SUCCESS,
                payload: [paymentResult.data, ...getState().payments.listPayments],
            });
        }
        else {
            dispatch({ type: ADD_PAYMENT_FAIL });
        }
    }
}

function _extractCategories(categoriesResponseData) {
    return {
        incomeList: categoriesResponseData.incomeList,
        expensesList: categoriesResponseData.expensesList,
    }
}