import { SEARCH_FLIGHT } from '../Actions/ActionTypes';
const initialState = {
    SearchCriteria : {
        Origin: '',
        Destination: '',
        DepartureDate: '',
        ReturnDate: '',
        NumberOfPax: 0,
        CurrentTab: 'oneWay'
    }
}

export default function (state = initialState, action) {
    let newState = JSON.parse(JSON.stringify(state));
    switch (action.type) {
        case SEARCH_FLIGHT:
            newState.SearchCriteria = action.data
            break;
        default:
            return newState;
    }
    return newState;
}