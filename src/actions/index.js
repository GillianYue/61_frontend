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


export function getPlayer(param) {
  return (dispatch) => {

    const data = param ? {
      FirstName: 'FirstName' in param ? param.FirstName: '',
      LastName: 'LastName' in param ? param.LastName: '',
    } : {}

    const jwt = localStorage.getItem('token')
    
    const config = {
      headers: {
      Authorization: `Bearer ${jwt}`
    }}

    axios.get(`${ROOT_URL}/players`, data, config)
      .then((response) => {
        console.log("getting player: "+JSON.stringify(response));
        dispatch({ type: ActionTypes.GET_PLAYER, payload: response.data });

      })
      .catch((error) => {
        console.log(error.message);
      });
  };
}

export function login(param) {
  return (dispatch) => {
    const data = {
      login_username: 'username' in param ? param.username: '',
      login_password: 'password' in param ? param.password: '',
    }

    axios.post(`${ROOT_URL}/login`, data)
      .then((response) => {
        //verify the token
        console.log("login success");
        localStorage.setItem('token', response.data.response);
        dispatch({ type: ActionTypes.MANAGER_SIGNIN, payload: 'success' });
      })
      .catch((error) => {
        console.log("login failed: "+error.message);
      });
  };
}

export function logout(){
  console.log("logging out, clearing cookie")
  localStorage.clear();
}

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