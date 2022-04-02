import {
    CREATE_ESTATE,
} from '../actions/index';

const initialState = {
    oneEstate: [],
    allEstate: [],
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_ESTATE:
            return ({});
        default:
            return ({
                ...state
            });
    }
};

export default rootReducer;