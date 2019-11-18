import { SEARCH_FLIGHT } from './ActionTypes';

export function searchFlight(data) {
    return {
        type: SEARCH_FLIGHT,
        data
    }
}