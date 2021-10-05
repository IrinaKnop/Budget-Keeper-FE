const UPDATE_COUNT = 'fe-react-template/UselessButton/UPDATE_COUNT';

const initialState = {
    currentCount: 0,
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case UPDATE_COUNT:
            return {
                ...state,
                currentCount: action.payload,
            };
        default:
            return state;
    }
}

export function count() {
    return async (dispatch, getState) => {
        const updatedCount = getState().uselessButton.currentCount + 1;

        dispatch({ type: UPDATE_COUNT, payload: updatedCount});
    };
}


