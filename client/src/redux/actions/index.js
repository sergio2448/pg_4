import axios from 'axios';
export const CREATE_ESTATE = 'CREATE_POKEMON';

export const createEstate = (estateToCreate) => dispatch => {
    return axios.post(`http://localhost:3001/Properties/pro`, estateToCreate)
        .then(data => data.data)
        .then(data => dispatch({
            type: CREATE_ESTATE,
            payload: data
        }))
};

export function getSearchbar(input){
    return async (dispatch) => {
        let json = await axios.get('http://localhost:3001/Properties?' + input);
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