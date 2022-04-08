import {
    CREATE_ESTATE,
} from '../actions/index';

const initialState = {
    oneEstate: [],
    allEstate: [],
    properties: [],
    homeCards: [],
    listCards: [],
    homeDetail:[],
    searchBar: [],
    features: [],
    features2: [],
    maplist: [],
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
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
        case 'GET_LISTCARDS':
            let newListCards = action.payload.sort((a, b) => {
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
                homeCards: newListCards
            }
        case 'GET_DATAIL':
            return {
                ...state,
                homeDetail: action.payload
            }
        case 'GET_FEATURE_LIST':
            return {
                ...state,
                features: action.payload
            }
        case 'GET_MAP_LIST':
            return {
                ...state,
                maplist: state.maplist.concat([action.payload])
            }
        default:
            return ({
                ...state
            });
    }
};

export default rootReducer;