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

export function getDetailCalendar(input) {
    return async (dispatch) => {
        let json = await axios.get('http://localhost:3001/calendar/' + input);
        return dispatch({
            type: 'GET_DETAIL_CALENDAR',
            payload: json.data
        })
    }
}

export function addAgenda(data){
    return axios.post('http://localhost:3001/agenda', data)
    .then((res) => {
        console.log(res);
    }).catch((err) => console.error(err))

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
export function updateInfo(values) {
            return axios.put("http://localhost:3001/optionUser/updateData", values)
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
        return axios.get(`http://localhost:3001/favorite/${id}`)
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
        return axios.get(`http://localhost:3001/favorite/${id}`)
            .then((response) => {
                dispatch({
                    type: 'GET_FAVOURITESUPDATE',
                    payload: response.data,
                })
            })
    }
}


export function deleteFavourites(id,userId,propertyId) {

            return(axios.delete(`http://localhost:3001/favorite?propertyId=${propertyId}&userId=${userId}&favoriteId=${id}`))
            .then((res)=>{
                
                console.log(res)
            })
            .catch((err) => console.error(err));
    
}

export function deleteProperties(id, adminEmail) {
  return axios.delete(`http://localhost:3001/admin/delete-prop?id=${id}&adminEmail=${adminEmail}`)
  .then((res)=>{
      console.log(res)
  })
  .catch((err) => console.error(err));

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

export function getTransactions(adminEmail) {
  return function (dispatch) {
    return axios
      .get(
        `http://localhost:3001/admin/transactions?userEmail=${adminEmail}&start_date=&end_date=&page_size=&page=1&transaction_id=&transaction_type=&transaction_status&payment_instrument_type=CREDITCARD&fields=all`
      )
      .then((response) => {
        dispatch({
          type: "GET_TRANSACTIONS",
          payload: response.data,
        });
      });
  };
}

