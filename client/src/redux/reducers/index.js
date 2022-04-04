import {
    CREATE_ESTATE,
} from '../actions/index';

const initialState = {
    oneEstate: [],
    allEstate: [],
    properties: [],
    homeCards: []
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
        case 'GET_HOMECARDS':
            let newHomeCards = action.payload.sort((a,b) => {
                if(a.order < b.order){
                    return -1
                }else if(a.order > b.order){
                    return 1
                }else{
                    return 0
                }
            })
            return {
                ...state,
                homeCards: newHomeCards
            }
        default:
            return ({
                ...state
            });
    }
};

export default rootReducer;