import * as api from "../../api";

const GET_AVAILABLE_CATEGORIES = 'fe-react-template/Operations/GET_AVAILABLE_CATEGORIES';
const GET_ALL_PAYMENTS = 'fe-react-template/Operations/GET_ALL_PAYMENTS';
const ADD_PAYMENT_START = 'fe-react-template/Operations/ADD_PAYMENT_START';
const ADD_PAYMENT_FAIL = 'fe-react-template/Operations/ADD_PAYMENT_FAIL';
const ADD_PAYMENT_SUCCESS = 'fe-react-template/Operations/ADD_PAYMENT_SUCCESS';


const initialState = {
    listCategories: null,
    listPayments: [],
    payment: null,
    addingProcessing: false,
    isAddedPayment: false,
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
                isAddedPayment: true,
                payment: action.payload,
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

export function getAllPayments(incomeLabel) {
    console.log("Это getAllPayments");
    return async (dispatch, getState) => {
        const allPaymentsResult = await api.getAllPaymentsWithIncomeLabel(incomeLabel);
        console.log(allPaymentsResult);
        dispatch({
            type: GET_ALL_PAYMENTS,
            payload: allPaymentsResult.data,
        });
    }
}

export function addNewPayment(payment) {
    console.log("redux addNewPayment");
    return async (dispatch, getState) => {
        dispatch({ type: ADD_PAYMENT_START });

        const paymentResult = api.addPayment(payment)

        if ((await paymentResult).success) {
            dispatch({
                type: ADD_PAYMENT_SUCCESS,
                payload: paymentResult.data,
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