import { GET_RESULTS_LIST, CLEAR_RESULTS_LIST } from '../constants/actionTypes';

export default function dropdownReducer(state = [], action) {
    let newState;

    switch (action.type) {
        case GET_RESULTS_LIST:
            newState = action.results;

            return newState;
        case CLEAR_RESULTS_LIST:
            return [];
        default:
            return state;
    }
}
