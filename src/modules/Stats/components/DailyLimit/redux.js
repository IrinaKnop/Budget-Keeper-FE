import * as api from "../../../../api";

const GET_DAILY_LIMIT = 'fe-react-template/DailyLimit/GET_DAILY_LIMIT';

const initialState = {
    dailyLimit: null,
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_DAILY_LIMIT:
            return {
                ...state,
                dailyLimit: action.payload,
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