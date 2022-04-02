import axios from 'axios';
export const CREATE_ESTATE = 'CREATE_POKEMON';

export const createEstate = (estateToCreate) => dispatch => {
    return axios.post(`http://localhost:3001/pokemons`, estateToCreate)
        .then(data => data.data)
        .then(data => dispatch({
            type: CREATE_ESTATE,
            payload: data
        }))
};