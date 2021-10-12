import * as api from '../../api';

const INITIAL_BALANCE_START = 'fe-react-template/InitialBalance/INITIAL_BALANCE_START';
const INITIAL_BALANCE_FAIL = 'fe-react-template/InitialBalance/INITIAL_BALANCE_FAIL';
const INITIAL_BALANCE_SUCCESS = 'fe-react-template/InitialBalance/INITIAL_BALANCE_SUCCESS';

const initialState = {
    isInitialized : false,
    initializeProcessing: false,
    initialBalanceValue: null,
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case INITIAL_BALANCE_START:
            return {
                ...state,
                initializeProcessing: true,
            };
        case INITIAL_BALANCE_FAIL:
            return {
                ...state,
                initializeProcessing: false,
            };
        case INITIAL_BALANCE_SUCCESS:
            return {
                ...state,
                initializeProcessing: false,
                isInitialized : true,
                initialBalanceValue: action.payload,
            };
        default:
            return state;
    }
}

export function initialBalance(initialBalanceValue) {
    return async (dispatch, getState) => {
        dispatch({ type: INITIAL_BALANCE_START });

        const initialBalanceResult = await api.initialBalance(initialBalanceValue);

        if (initialBalanceResult.success) {
            dispatch({
                type: INITIAL_BALANCE_SUCCESS,
                payload: initialBalanceResult.initialBalanceValue,
            });
        }
        else {
            dispatch({ type: INITIAL_BALANCE_FAIL });
        }
    }
}