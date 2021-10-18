import * as api from "../../api";

const GET_DAILY_LIMIT = 'fe-react-template/Stats/GET_DAILY_LIMIT';
const GET_PAYMENTS_SHORT_STATS = 'fe-react-template/Stats/GET_PAYMENTS_SHORT_STATS';

const initialState = {
    dailyLimit: null,
    listPaymentsShortStats: [],
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
        default:
            return state;
    }
}

export function getDailyLimit() {
    return async (dispatch, getState) => {
        const dailyLimitResult = await api.getDailyLimit();

        dispatch({type: GET_DAILY_LIMIT, payload: dailyLimitResult.data.dailyLimit})
    }
}

export function getShortPaymentsStats() {
    return async (dispatch, getState) => {
        const shortStatsResult = await api.getShortPaymentsStats();

        dispatch({type: GET_PAYMENTS_SHORT_STATS, payload: shortStatsResult.data})
    }
}