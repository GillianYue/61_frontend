import axios from 'axios/index';

export const ActionTypes = {

    FETCH_USER: 'FETCH_USER',

    GET_PLAYER: 'GET_PLAYER',
    CREATE_PLAYER: 'CREATE_PLAYER',
    EDIT_PLAYER: 'EDIT_PLAYER',
    DELETE_PLAYER: 'DELETE_PLAYER',

    CREATE_PACKAGE: 'CREATE_PACKAGE',
    GET_PACKAGES: 'GET_PACKAGES',
    GET_TRANSFERS: 'GET_TRANSFERS',

    GET_TEAM: 'GET_TEAM',
    GET_TEAM_PLAYERS: 'GET_TEAM_PLAYERS',
    GET_OWN_TEAM: 'GET_OWN_TEAM',
    GET_OWN_TEAM_PLAYERS: 'GET_OWN_TEAM_PLAYERS',

    SEARCH_TEAMS: 'SEARCH_TEAMS',
    SEARCH_PLAYERS: 'SEARCH_PLAYERS',

    MANAGER_SIGNIN: 'MANAGER_SIGNIN',
    MANAGER_SIGNOUT: 'MANAGER_SIGNOUT',

  };


export const ROOT_URL = 'http://localhost:3000/api';

axios.interceptors.request.use(
  config => {
    config.headers.authorization = 'JWT ' + localStorage.getItem("token");
    return config;
  },
  error => Promise.reject(error)
);

export function getPlayer(id) {
  return (dispatch) => {

    axios.get(`${ROOT_URL}/players/${id}`)
      .then((response) => {
        console.log("getting player: "+JSON.stringify(response));
        dispatch({ type: ActionTypes.GET_PLAYER, payload: response.data });

      })
      .catch((error) => {
        console.log("get player failed: "+ JSON.stringify(error));
        console.log(error.message);
      });
  };
}

export function getTeam(id, isOwnTeam) {
  return (dispatch) => {

    const teamID = (isOwnTeam) ? localStorage.getItem('myClubId') : id;
    axios.get(`${ROOT_URL}/clubs/${teamID}`)
      .then((response) => {
        console.log("getting club: "+JSON.stringify(response));

        dispatch({ type: isOwnTeam? ActionTypes.GET_OWN_TEAM: ActionTypes.GET_TEAM, 
          payload: response.data });

      })
      .catch((error) => {
        console.log("get club failed: "+ JSON.stringify(error));
        console.log(error.message);
      });
  };
}

export function getPlayersOfTeam(id, isOwnTeam) {
  return (dispatch) => {

    const config = {
      params: {
        club_id: (isOwnTeam) ? localStorage.getItem('myClubId') : id
    }
    };

    axios.get(`${ROOT_URL}/players`, config)
      .then((response) => {
        console.log("getting club players: "+JSON.stringify(response));

        dispatch({ type: isOwnTeam? ActionTypes.GET_OWN_TEAM_PLAYERS: 
          ActionTypes.GET_TEAM_PLAYERS, 
          payload: response.data });

      })
      .catch((error) => {
        console.log("get club failed: "+ JSON.stringify(error));
        console.log(error.message);
      });
  };
}

//will get the pending packages of the manager's team
export function getPackages() {
  return (dispatch) => {

    axios.get(`${ROOT_URL}/trade`)
      .then((response) => {
        console.log("getting packages: "+JSON.stringify(response));
        dispatch({ type: ActionTypes.GET_PACKAGES, payload: response.data });

      })
      .catch((error) => {
        console.log("get packages failed: "+ JSON.stringify(error));
        console.log(error.message);
      });
  };
}

//will get the pending packages of the manager's team
export function getPackage(id) {
  return (dispatch) => {

    axios.get(`${ROOT_URL}/trade/${id}`)
      .then((response) => {
        console.log("getting packages: "+JSON.stringify(response));
        dispatch({ type: ActionTypes.GET_PACKAGES, payload: response.data });

      })
      .catch((error) => {
        console.log("get packages failed: "+ JSON.stringify(error));
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
        localStorage.setItem('token', response.data.response);
        localStorage.setItem('myClubId', response.data.clubId);

        axios.defaults.headers.common['Authorization'] = 'JWT ' + response.data.response
        dispatch({ type: ActionTypes.MANAGER_SIGNIN, payload: {
          clubId: response.data.clubId,
          signinStatus: 'success'} });
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

export function searchPlayers(param) {
  return (dispatch) => {

    let config = {
      params: {
        search_terms: param.search_terms
      },
}

    axios.get(`${ROOT_URL}/search_player`, config)
      .then((response) => {
        console.log("search player result: "+JSON.stringify(response));
        dispatch({ type: ActionTypes.SEARCH_PLAYERS, payload: response.data });

      })
      .catch((error) => {
        console.log("get packages failed: "+ JSON.stringify(error));
        console.log(error.message);
      });
  };
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