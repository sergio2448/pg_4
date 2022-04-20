import axios from 'axios';




export function getSearchbar(input, body) {
    console.log(body)
    return async (dispatch) => {
        try {
            const response = await axios.post('https://app-inmuebles.herokuapp.com/Properties?' + input, body)
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
    let json = await axios.post("https://app-inmuebles.herokuapp.com/Properties");
    return dispatch({
      type: "GET_HOMECARDS",
      payload: json.data,
    });
  };
}

export function getListCards() {
  return async (dispatch) => {
    let json = await axios.post("https://app-inmuebles.herokuapp.com/Properties");
    return dispatch({
      type: "GET_LISTCARDS",
      payload: json.data,
    });
  };
}

export function getHomeDetail(input) {
  return async (dispatch) => {
    let json = await axios.post("https://app-inmuebles.herokuapp.com/Properties?id=" + input);
    return dispatch({
      type: "GET_DATAIL",
      payload: json.data,
    });
  };
}

export function getDetailCalendar(input) {
  return async (dispatch) => {
    let json = await axios.get("https://app-inmuebles.herokuapp.com/calendar/" + input);
    return dispatch({
      type: "GET_DETAIL_CALENDAR",
      payload: json.data,
    });
  };
}


export function getFeatureList() {
  return async (dispatch) => {
    let json = await axios.get("https://app-inmuebles.herokuapp.com/feature");
    return dispatch({
      type: "GET_FEATURE_LIST",
      payload: json.data,
    });
  };
}

export function loadUser(user) {
  return async (dispatch) => {
    return dispatch({
      type: "LOAD_USER",
      payload: user,
    });
  };
}

export function getMapList(city) {
  return async (dispatch) => {
    let json = await axios.post(
      "https://app-inmuebles.herokuapp.com/Properties?city=" + city
    );
    return dispatch({
      type: "GET_MAP_LIST",
      payload: json.data,
    });
  };
}
export function updateInfo(value) {
    return async () => {
        await axios('https://app-inmuebles.herokuapp.com/optionUser', {
            method: 'PUT',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(value),
        })
    }
}
export function dropPosition(position) {
  return async (dispatch) => {
    return dispatch({
      type: "DROPDOWN",
      payload: position,
    });
  };
}
export function getFavourites(id) {
  return function (dispatch) {
    return axios
      .get(`https://app-inmuebles.herokuapp.com/favorite/${id}`)
      .then((response) => {
        dispatch({
          type: "GET_FAVOURITES",
          payload: response.data,
        });
      });
  };
}

export function deleteFavourites(id,userId,propertyId) {
            return function(){axios.delete(`https://app-inmuebles.herokuapp.com/favorite?${propertyId}&${userId}&${favoriteId}`)}
            .then((res)=>{
                console.log(res)
            })
            .catch((err) => console.error(err));
    
}

export function addFavourites(data) {
  return axios
    .post("https://app-inmuebles.herokuapp.com/favorite", data)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => console.error(err));
}

export function updateTypeUser(typeUser) {
  return async (dispatch) => {
    return dispatch({
      type: "UPDATE_TYPE_USER",
      payload: typeUser,
    });
  };
}

export function getTransactions(adminEmail) {
  return function (dispatch) {
    return axios
      .get(
        `https://app-inmuebles.herokuapp.com/admin/transactions?userEmail=${adminEmail}&start_date=04/06/2022&end_date=04/18/2022&page_size=&page=1&transaction_id=&transaction_type=&transaction_status&payment_instrument_type=CREDITCARD&fields=all`
      )
      .then((response) => {
        dispatch({
          type: "GET_TRANSACTIONS",
          payload: response.data,
        });
      });
  };
}
