import * as api from "../../api";

const GET_AVAILABLE_CATEGORIES = 'fe-react-template/Operations/GET_AVAILABLE_CATEGORIES';
const GET_ALL_PAYMENTS = 'fe-react-template/Operations/GET_ALL_PAYMENTS';
const GET_LAST_PAYMENTS = 'fe-react-template/Operations/GET_LAST_PAYMENTS';
const ADD_PAYMENT_START = 'fe-react-template/Operations/ADD_PAYMENT_START';
const ADD_PAYMENT_FAIL = 'fe-react-template/Operations/ADD_PAYMENT_FAIL';
const ADD_PAYMENT_SUCCESS = 'fe-react-template/Operations/ADD_PAYMENT_SUCCESS';
const DELETE_PAYMENT_FAIL = 'fe-react-template/Operations/DELETE_PAYMENT_FAIL';
const DELETE_PAYMENT_SUCCESS = 'fe-react-template/Operations/DELETE_PAYMENT_SUCCESS';
const ADD_CATEGORY_FAIL = 'fe-react-template/Operations/ADD_CATEGORY_FAIL';
const ADD_CATEGORY_SUCCESS = 'fe-react-template/Operations/ADD_CATEGORY_SUCCESS';
const ADD_SUBCATEGORY_FAIL = 'fe-react-template/Operations/ADD_SUBCATEGORY_FAIL';
const ADD_SUBCATEGORY_SUCCESS = 'fe-react-template/Operations/ADD_SUBCATEGORY_SUCCESS';

const initialState = {
    listCategories: null,
    newCategory: null,
    newSubcategory: null,
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
            };
        case DELETE_PAYMENT_FAIL:
            return {
                ...state
            };
        case DELETE_PAYMENT_SUCCESS:
            return {
                ...state,
                listPayments: action.payload,
            };
        case ADD_CATEGORY_FAIL:
            return {
                ...state,
            }
        case ADD_CATEGORY_SUCCESS:
            return {
                ...state,
                newCategory: action.payload
            }
        case ADD_SUBCATEGORY_FAIL:
            return {
                ...state,
            }
        case ADD_SUBCATEGORY_SUCCESS:
            return {
                ...state,
                newSubcategory: action.payload
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
    return async (dispatch, getState) => {
        dispatch({type: ADD_PAYMENT_START});

        const paymentResult = await api.addPayment(payment)

        if (paymentResult.success) {
            dispatch({
                type: ADD_PAYMENT_SUCCESS,
                payload: [paymentResult.data, ...getState().payments.listPayments],
            });
        } else {
            dispatch({type: ADD_PAYMENT_FAIL});
        }
    }
}

export function deletePayment(payment) {
    return async (dispatch, getState) => {
        const paymentDeleteResult = await api.deletePayment(payment);

        if (paymentDeleteResult.success) {
            dispatch({
                type: DELETE_PAYMENT_SUCCESS,
                payload: [...getState().payments.listPayments.filter(item => item.id !== payment.id)],
            });
        } else {
            dispatch({type: DELETE_PAYMENT_FAIL});
        }
    }
}

export function addNewCategory(categoryDto) {
    return async (dispatch, getState) => {
        const categoryResult = await api.addCategory(categoryDto);
        if (categoryResult.success) {
            dispatch({
                type: ADD_CATEGORY_SUCCESS,
                payload: categoryResult.data
            });
        } else {
            dispatch({type: ADD_CATEGORY_FAIL});
        }
    }
}

export function addNewSubcategory(subcategoryDto) {
    return async (dispatch, getState) => {
        const subcategoryResult = await api.addSubcategory(subcategoryDto);
        if (subcategoryResult.success) {
            dispatch({
                type: ADD_SUBCATEGORY_SUCCESS,
                payload: subcategoryResult.data
            });
        } else {
            dispatch({type: ADD_SUBCATEGORY_FAIL});
        }
    }
}

function _extractCategories(categoriesResponseData) {
    return {
        incomeList: categoriesResponseData.incomeList,
        expensesList: categoriesResponseData.expensesList,
    }
}