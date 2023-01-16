import axios from 'axios';

const API_URL = "pg4-production.up.railway.app"
export function getSearchbar(input, body) {
    console.log(body)
    return async (dispatch) => {
        try {
            const response = await axios.post(`${API_URLL}/Properties?` + input, body)
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
        let json = await axios.post(`${API_URL}/Properties`);
        return dispatch({
            type: 'GET_HOMECARDS',
            payload: json.data
        })
    }
}

export function getListCards() {
    return async (dispatch) => {
        let json = await axios.post(`${API_URL}/Properties`);
        return dispatch({
            type: 'GET_LISTCARDS',
            payload: json.data
        })
    }
}

export function getHomeDetail(input) {
    return async (dispatch) => {
        let json = await axios.post(`${API_URL}/Properties?id=` + input);
        return dispatch({
            type: 'GET_DATAIL',
            payload: json.data
        })
    }
}

export function getDetailCalendar(input) {
    return async (dispatch) => {
        let json = await axios.get(`${API_URL}/calendar/` + input);
        return dispatch({
            type: 'GET_DETAIL_CALENDAR',
            payload: json.data
        })
    }
}

export function addAgenda(data){
    return axios.post(`${API_URL}/agenda`, data)
    .then((res) => {
        console.log(res);
    }).catch((err) => console.error(err))

}

export function getFeatureList() {
    return async (dispatch) => {
        let json = await axios.get(`${API_URL}/feature`);
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
        let json = await axios.post(`${API_URL}/Properties?city=` + city);
        return dispatch({
            type: 'GET_MAP_LIST',
            payload: json.data
        })
    }
}
export function updateInfo(values) {
            return axios.put(`${API_URL}/optionUser/updateData`, values)
            .then((res)=>{
                console.log(res)
            })
            .catch((err) => console.error(err));
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
        return axios.get(`${API_URL}/favorite/${id}`)
            .then((response) => {
                dispatch({
                    type: 'GET_FAVOURITES',
                    payload: response.data,
                })
            })
    }
}
export function getFavouritesUpdate(id) {
    return function (dispatch) {
        return axios.get(`${API_URL}/favorite/${id}`)
            .then((response) => {
                dispatch({
                    type: 'GET_FAVOURITESUPDATE',
                    payload: response.data,
                })
            })
    }
}


export function deleteFavourites(id,userId,propertyId) {

            return(axios.delete(`${API_URL}/favorite?propertyId=${propertyId}&userId=${userId}&favoriteId=${id}`))
            .then((res)=>{
                
                console.log(res)
            })
            .catch((err) => console.error(err));
    
}

export function deleteProperties(id, adminEmail) {
  return axios.delete(`${API_URL}/admin/delete-prop?id=${id}&adminEmail=${adminEmail}`)
  .then((res)=>{
      console.log(res)
  })
  .catch((err) => console.error(err));

}

export function addFavourites(data) {
    return axios.post(`${API_URL}/favorite`, data)   
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

export function getTransactions(adminEmail) {
  return function (dispatch) {
    return axios
      .get(
        `${API_URL}/admin/transactions?userEmail=${adminEmail}&start_date=&end_date=&page_size=&page=1&transaction_id=&transaction_type=&transaction_status&payment_instrument_type=CREDITCARD&fields=all`
      )
      .then((response) => {
        dispatch({
          type: "GET_TRANSACTIONS",
          payload: response.data,
        });
      });
  };
}

