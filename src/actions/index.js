import axios from 'axios/index';

export const ActionTypes = {

    FETCH_USER: 'FETCH_USER',

    GET_PLAYER: 'GET_PLAYER',
    CREATE_PLAYER: 'CREATE_PLAYER',
    EDIT_PLAYER: 'EDIT_PLAYER',
    DELETE_PLAYER: 'DELETE_PLAYER',

    CREATE_PACKAGE: 'CREATE_PACKAGE',
    GET_TRANSFERS: 'GET_TRANSFERS',

    GET_TEAM: 'GET_TEAM',

    SEARCH_TEAM: 'SEARCH_TEAM',
    SEARCH_PLAYER: 'SEARCH_PLAYER',

    MANAGER_SIGNIN: 'MANAGER_SIGNIN',
    MANAGER_SIGNOUT: 'MANAGER_SIGNOUT',

  };


export const ROOT_URL = 'http://localhost:3000/api';


export function createOrder(order) {
    return (dispatch) => {
      axios.post(`${ROOT_URL}/order`, order)
        .then((response) => {
          dispatch({ type: ActionTypes.CREATE_ORDER, payload: "" });
        })
        .catch((error) => {
          console.log(error.message);
        });
    };
}


export function updateUser(userId, params) {
    return (dispatch) => {
      axios.put(`${ROOT_URL}/user/${userId}`, params)
        .then((response) => {
          console.log("in update user"+response);
          dispatch({ type: ActionTypes.UPDATE_USER, payload: response.data });
        })
        .catch((error) => {
          console.log(error.message);
        });
    }
}