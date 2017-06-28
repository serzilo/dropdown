import * as types from '../constants/actionTypes';
import { MAX_SUGGEST_LENGTH } from '../constants/common';

import fakeData from '../data/fakeData';

export function getResultsList(query) {
    let results = [];

    if (query.length > 0) {
        results = fakeData.countries.filter((item) => {
            return item.name.toLowerCase().indexOf(query.toLowerCase()) === 0;
        });
    } else {
        results = fakeData.countries;
    }

    results = results.slice(0, MAX_SUGGEST_LENGTH);

    return {
        type: types.GET_RESULTS_LIST,
        results
    };
}

export function clearResultsList() {
    return {
        type: types.CLEAR_RESULTS_LIST
    };
}
