import {
    CREATE_ESTATE,
} from '../actions/index';

const initialState = {
    oneEstate: [],
    allEstate: [],
    properties: []
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_ESTATE:
            return ({});
        case 'GET_SEARCHBAR':
            return {
                ...state,
                searchBar: action.payload
            }
        default:
            return ({
                ...state
            });
    }
};

export default rootReducer;