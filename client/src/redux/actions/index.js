import axios from 'axios';

export const createEstate = (estateToCreate) => dispatch => {
    return axios
      .post(`/Properties/pro`, estateToCreate)
      .then((data) => data.data)
      .then((data) =>
        dispatch({
          type: CREATE_ESTATE,
          payload: data,
        })
      );
};

export function getSearchbar(input, body){
    return (dispatch) => {
        axios
          .get("/Properties?" + input, body)
          .then((response) => {
            return dispatch({
              type: "GET_SEARCHBAR",
              payload: response.data,
            });
          })
          .catch((error) => {
            return dispatch({
              type: "GET_SEARCHBAR",
              payload: "error",
            });
          });
    }
}

export function getHomeCards(){
    return async (dispatch) => {
        let json = await axios.get("/Properties");
        return dispatch({
            type: 'GET_HOMECARDS',
            payload: json.data
        })
    }
}

export function getListCards(){
    return async (dispatch) => {
        let json = await axios.get("/Properties");
        return dispatch({
            type: 'GET_LISTCARDS',
            payload: json.data
        })
    }
}

export function getHomeDetail(input){
    return async (dispatch) => {
        let json = await axios.get("/Properties?id=" + input);
        return dispatch({
            type: 'GET_DATAIL',
            payload: json.data
        })
    }
}

export function getFeatureList(){
    return async (dispatch) => {
        let json = await axios.get("/feature");
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
        let json = await axios.get("/Properties?city=" + city);
        return dispatch({
            type: 'GET_MAP_LIST',
            payload: json.data
        })
    }
}
export function updateInfo(value) {
    return async ()=>{
        await axios.get("/optionUser", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(value),
        });
        
    }
}
