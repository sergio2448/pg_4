import axios from 'axios';


export function getSearchbar(input, body) {
    console.log(body)
    return async (dispatch) => {
        try {
            const response = await axios.post('http://localhost:3001/Properties?' + input, body)
            return dispatch({
                type: 'GET_SEARCHBAR',
                payload: response.data

            })
        } catch (error) {
            return dispatch({
                type: 'GET_SEARCHBAR',
                payload: 'error'
            })
        }

    }
}

export function getHomeCards() {
    return async (dispatch) => {
        let json = await axios.post('http://localhost:3001/Properties');
        return dispatch({
            type: 'GET_HOMECARDS',
            payload: json.data
        })
    }
}

export function getListCards() {
    return async (dispatch) => {
        let json = await axios.post('http://localhost:3001/Properties');
        return dispatch({
            type: 'GET_LISTCARDS',
            payload: json.data
        })
    }
}

export function getHomeDetail(input) {
    return async (dispatch) => {
        let json = await axios.post('http://localhost:3001/Properties?id=' + input);
        return dispatch({
            type: 'GET_DATAIL',
            payload: json.data
        })
    }
}

export function getFeatureList() {
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

export function getMapList(city) {
    return async (dispatch) => {
        let json = await axios.post('http://localhost:3001/Properties?city=' + city);
        return dispatch({
            type: 'GET_MAP_LIST',
            payload: json.data
        })
    }
}
export function updateInfo(value) {
    return async () => {
        await axios('http://localhost:3001/optionUser', {
            method: 'PUT',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(value),
        })
    }
}
export function dropPosition(position) {
    return async (dispatch) => {
        return dispatch({
            type: 'DROPDOWN',
            payload: position
        })
    }
}
export function getFavourites(id) {
    return function (dispatch) {
        return axios.get(`http://localhost:3001/favorite/${id}`)
            .then((response) => {
                dispatch({
                    type: 'GET_FAVOURITES',
                    payload: response.data,
                })
            })
    }
}

export function deleteFavourites(id,userId,propertyId) {
            return axios.delete(`http://localhost:3001/favorite?${propertyId}&${userId}&${favoriteId}`)
            .then((response) => {
                response.json().then((resp)=>{
                    console.warn(resp)
                })
            })
    
}

export function addFavourites(data) {
    return axios.post("http://localhost:3001/favorite", data)
    .then((res)=>{
        console.log(res)
    })
    .catch((err) => console.error(err));
  }

  
  export function updateTypeUser(typeUser) {
    return async (dispatch) => {
        return dispatch({
            type: 'UPDATE_TYPE_USER',
            payload: typeUser
        })
    }
}

