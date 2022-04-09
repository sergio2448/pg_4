import axios from 'axios';

export const createEstate = (estateToCreate) => dispatch => {
    return axios.post(`http://localhost:3001/Properties/pro`, estateToCreate)
        .then(data => data.data)
        .then(data => dispatch({
            type: CREATE_ESTATE,
            payload: data
        }))
};

export function getSearchbar(input, body){
    return async (dispatch) => {
        let json = await axios.get('http://localhost:3001/Properties?' + input, body);
        return dispatch({
            type: 'GET_SEARCHBAR',
            payload: json.data
        })
    }
}

export function getHomeCards(){
    return async (dispatch) => {
        let json = await axios.get('http://localhost:3001/Properties');
        return dispatch({
            type: 'GET_HOMECARDS',
            payload: json.data
        })
    }
}

export function getListCards(){
    return async (dispatch) => {
        let json = await axios.get('http://localhost:3001/Properties');
        return dispatch({
            type: 'GET_LISTCARDS',
            payload: json.data
        })
    }
}

export function getHomeDetail(input){
    return async (dispatch) => {
        let json = await axios.get('http://localhost:3001/Properties?id=' + input);
        return dispatch({
            type: 'GET_DATAIL',
            payload: json.data
        })
    }
}

export function getFeatureList(){
    return async (dispatch) => {
        let json = await axios.get('http://localhost:3001/feature');
        return dispatch({
            type: 'GET_FEATURE_LIST',
            payload: json.data
        })
    }
}

export function loadUser(user) {
    return async (dispatch) => {
        return dispatch({
            type: 'LOAD_USER',
            payload: user
        })
    }
}

export function getMapList(city){
    return async (dispatch) => {
        let json = await axios.get('http://localhost:3001/Properties?city=' + city );
        return dispatch({
            type: 'GET_MAP_LIST',
            payload: json.data
        })
    }
}