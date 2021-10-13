import * as api from '../../../../api';

const GET_CURRENT_BALANCE = 'fe-react-template/CurrentBalance/GET_CURRENT_BALANCE';

const initialState = {
    //isInitialized : false,
    finalBalance: null,
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_CURRENT_BALANCE:
            return {
                ...state,
                finalBalance: action.payload,
            };
        default:
            return state;
    }
}

export function getCurrentBalance() {
    console.log("Это getCurrentBalance");
    return async (dispatch, getState) => {
        const balanceResult = await api.getCurrentBalance();

        dispatch({type: GET_CURRENT_BALANCE, payload: balanceResult.data.finalBalance})
    }
}