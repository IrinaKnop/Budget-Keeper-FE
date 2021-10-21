import * as api from "../../api";

const GET_DAILY_LIMIT = 'fe-react-template/Stats/GET_DAILY_LIMIT';
const GET_PAYMENTS_SHORT_STATS = 'fe-react-template/Stats/GET_PAYMENTS_SHORT_STATS';
const GET_ALL_PLANS = 'fe-react-template/Stats/GET_ALL_PLANS';
const ADD_PLAN_FAIL = 'fe-react-template/Stats/ADD_PLAN_FAIL';
const ADD_PLAN_SUCCESS = 'fe-react-template/Stats/ADD_PLAN_SUCCESS';

const initialState = {
    dailyLimit: null,
    listPaymentsShortStats: [],
    listAllPlans: [],
    addingPlanErrorMessage: null,
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_DAILY_LIMIT:
            return {
                ...state,
                dailyLimit: action.payload,
            };
        case GET_PAYMENTS_SHORT_STATS:
            return {
                ...state,
                listPaymentsShortStats: action.payload,
            };
        case GET_ALL_PLANS:
            return {
                ...state,
                listAllPlans: action.payload,
            };
        case ADD_PLAN_FAIL:
            return {
                ...state,
                addingPlanErrorMessage: "Произошла ошибка при добавлении. Проверьте правильность введенных данных.",
            }
        case ADD_PLAN_SUCCESS:
            return {
                ...state,
                listAllPlans: action.payload,
            }
        default:
            return state;
    }
}

export function getDailyLimit() {
    return async (dispatch, getState) => {
        const dailyLimitResult = await api.getDailyLimit();
        dispatch({
            type: GET_DAILY_LIMIT,
            payload: dailyLimitResult.data.dailyLimit
        });
    }
}

export function getShortPaymentsStats() {
    return async (dispatch, getState) => {
        const shortStatsResult = await api.getShortPaymentsStats();
        dispatch({
            type: GET_PAYMENTS_SHORT_STATS,
            payload: shortStatsResult.data
        });
    }
}

export function getAllPlans() {
    return async (dispatch, getState) => {
        const listAllPlansResult = await api.getAllPlans();
        dispatch({
            type: GET_ALL_PLANS,
            payload: listAllPlansResult.data
        })
    }
}

export function addPlan(plan) {
    return async (dispatch, getState) => {
        const addingPlanResult = await api.addPlan(plan);
        if (addingPlanResult.success) {
            dispatch({
                type: ADD_PLAN_SUCCESS,
                payload: [...getState().shortStats.listAllPlans, addingPlanResult.data],
            })
        }
        else {
            dispatch({
                type: ADD_PLAN_FAIL,
            })
        }
    }
}
