import * as api from "../../api";

const GET_ALL_CATEGORIES_BY_PERIOD = 'fe-react-template/Analytics/GET_ALL_CATEGORIES_BY_PERIOD';
const GET_PAYMENTS_STATS_BY_PERIOD = 'fe-react-template/Analytics/GET_PAYMENTS_STATS_BY_PERIOD';
const GET_SUBCATEGORY_STATS_BY_PERIOD = 'fe-react-template/Analytics/GET_SUBCATEGORY_STATS_BY_PERIOD';
const GET_GRAPH_STATS_BY_PERIOD = 'fe-react-template/Analytics/GET_GRAPH_STATS_BY_PERIOD';

const initialState = {
    listCategories: [],
    listPaymentsAnalytics: [],
    listGraphAnalytics: [],
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_ALL_CATEGORIES_BY_PERIOD:
            return {
                ...state,
                listCategories: action.payload,
            };
        case GET_PAYMENTS_STATS_BY_PERIOD:
            return {
                ...state,
                listPaymentsAnalytics: action.payload,
            };
        case GET_SUBCATEGORY_STATS_BY_PERIOD:
            return {
                ...state,
                listPaymentsAnalytics: action.payload,
            };
        case GET_GRAPH_STATS_BY_PERIOD:
            return {
                ...state,
                listGraphAnalytics: action.payload,
            };
        default:
            return state;
    }

}

export function getAllCategoriesByPeriod(dateStart, dateEnd) {
    return async (dispatch, getState) => {
        const listCategoriesResult = await api.getAllCategoriesByPeriod(dateStart, dateEnd);
        dispatch({
            type: GET_ALL_CATEGORIES_BY_PERIOD,
            payload: listCategoriesResult.data,
        })
    }
}

export function getStatsByIncomeLabel(analyticStatsDto) {
    return async (dispatch, getState) => {
        const statsByIncomeLabelResult = await api.getPaymentsStatsByPeriod(analyticStatsDto);
        dispatch({
            type: GET_PAYMENTS_STATS_BY_PERIOD,
            payload: statsByIncomeLabelResult.data,
        })
    }
}

export function getStatsBySubcategory(analyticStatsByCategoryDto) {
    return async (dispatch, getState) => {
        const statsByCategoryResult = await api.getSubcategoryStatsByPeriod(analyticStatsByCategoryDto);
        dispatch({
            type: GET_SUBCATEGORY_STATS_BY_PERIOD,
            payload: statsByCategoryResult.data,
        })
    }
}

export function getGraphStatsByPeriod(dateStart, dateEnd) {
    return async (dispatch, getState) => {
        const graphStatsResult = await api.getGraphStats(dateStart, dateEnd);
        dispatch({
            type: GET_GRAPH_STATS_BY_PERIOD,
            payload: graphStatsResult.data,
        })
    }
}