import axios from 'axios/index';

export const ActionTypes = {

    FETCH_USER: 'FETCH_USER',

    GET_PLAYER: 'GET_PLAYER',
    CREATE_PLAYER: 'CREATE_PLAYER',
    EDIT_PLAYER: 'EDIT_PLAYER',
    DELETE_PLAYER: 'DELETE_PLAYER',
    GET_POSITION: 'GET_POSITION',
    GET_ALL_POSITIONS: 'GET_ALL_POSITIONS',
    GET_LIST_POSITIONS: 'GET_LIST_POSITIONS',

    CREATE_PACKAGE: 'CREATE_PACKAGE',
    SIGN_PACKAGE: 'SIGN_PACKAGE',
    GET_PACKAGES: 'GET_PACKAGES',
    GET_PACKAGE: 'GET_PACKAGE',
    GET_TRANSFERS: 'GET_TRANSFERS',

    GET_TEAM: 'GET_TEAM',
    GET_TEAM_PLAYERS: 'GET_TEAM_PLAYERS',
    GET_OWN_TEAM: 'GET_OWN_TEAM',
    GET_OWN_TEAM_PLAYERS: 'GET_OWN_TEAM_PLAYERS',

    SEARCH_TEAMS: 'SEARCH_TEAMS',
    SEARCH_PLAYERS: 'SEARCH_PLAYERS',

    MANAGER_SIGNIN: 'MANAGER_SIGNIN',
    MANAGER_SIGNOUT: 'MANAGER_SIGNOUT',

    GET_GLOBAL_TRANSFERS: 'GET_GLOBAL_TRANSFERS',
    GET_MY_TRANSFERS: 'GET_MY_TRANSFERS',

    FETCH_REQUESTS_FIELDS: 'FETCH_REQUESTS_FIELDS',
    FETCH_GLOBAL_TRANSFERS: 'FETCH_GLOBAL_TRANSFERS'
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
        // console.log("getting player: "+JSON.stringify(response));
        dispatch({ type: ActionTypes.GET_PLAYER, payload: response.data });

      })
      .catch((error) => {
        console.log("get player failed: "+ JSON.stringify(error));
        console.log(error.message);
      });
  };
}

export function getPosition(id) {
  return (dispatch) => {

    axios.get(`${ROOT_URL}/player_positions/${id}`)
      .then((response) => {
        dispatch({ type: ActionTypes.GET_POSITION, payload: response.data });

      })
      .catch((error) => {
        console.log(error.message);
      });
  };
}

export function getListPositions(listID){
  return (dispatch) => {
    var posRes = [];

    Promise.all(listID.map((id, index) => 
      axios.get(`${ROOT_URL}/player_positions/${id}`).then(pos => {
       posRes.push(pos.data.response);
   
}))).then(results => {

    dispatch({ type: ActionTypes.GET_LIST_POSITIONS, payload: posRes });
}).catch(err => {
    console.log(err);
});

  }
}

export function getAllPositions() {
  return (dispatch) => {

    axios.get(`${ROOT_URL}/positions`)
      .then((response) => {
        dispatch({ type: ActionTypes.GET_ALL_POSITIONS, payload: response.data });

      })
      .catch((error) => {
        console.log(error.message);
      });
  };
}

export function getTeam(id, isOwnTeam) {
  return (dispatch) => {

    const teamID = (isOwnTeam) ? localStorage.getItem('myClubId') : id;
    axios.get(`${ROOT_URL}/clubs/${teamID}`)
      .then((response) => {
        // console.log("getting club: "+JSON.stringify(response));
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
        // console.log("getting club players: "+JSON.stringify(response));

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
        // console.log("getting packages: "+JSON.stringify(response));
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
        dispatch({ type: ActionTypes.GET_PACKAGE, payload: response.data });

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

        axios.defaults.headers.common['authorization'] = 'JWT ' + response.data.response
        dispatch({ type: ActionTypes.MANAGER_SIGNIN, payload: {
          username: param.username,
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
        dispatch({ type: ActionTypes.SEARCH_PLAYERS, payload: response.data });

      })
      .catch((error) => {
        console.log("search players failed: "+ JSON.stringify(error));
        console.log(error.message);
      });
  };
}

export function searchTeams(param) {
  return (dispatch) => {

    let config = {
      params: {
        search_terms: param.search_terms
      },
}

    axios.get(`${ROOT_URL}/search_club`, config)
      .then((response) => {
        dispatch({ type: ActionTypes.SEARCH_TEAMS, payload: response.data });

      })
      .catch((error) => {
        console.log("search teams failed: "+ JSON.stringify(error));
        console.log(error.message);
      });
  };
}

//TODO
export function createPackage(requests) {
  return (dispatch) => {
    const body = {
      requests: requests,
    }
    console.log("before send: "+JSON.stringify(body))
    axios.post(`${ROOT_URL}/trade`, body)
      .then((response) => {
        dispatch({ type: ActionTypes.CREATE_PACKAGE, payload: response.data });
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
}

export function signPackage(id, accept){
  return (dispatch) => {

    const body = {
      status: accept? 1: 0,
    }

    axios.put(`${ROOT_URL}/sign/${id}`, body)
      .then((response) => {
        console.log("sign package "+id+" result"+ JSON.stringify(response));
        dispatch({ type: ActionTypes.SIGN_PACKAGE, payload: response.data });
      })
      .catch((error) => {
        console.log(error.message);
      });
  }

}

//////////


export function updatePlayer(id, params) {
    return (dispatch) => {

      axios.put(`${ROOT_URL}/players/${id}`, params)
        .then((response) => {
          dispatch({ type: ActionTypes.EDIT_PLAYER, payload: response.data.status });
        })
        .catch((error) => {
          console.log(error.message);
        });
    }
}

export function createPlayer(params) {
  return (dispatch) => {

    axios.post(`${ROOT_URL}/players`, params)
      .then((response) => {
        console.log("in create player"+ JSON.stringify(response));
        dispatch({ type: ActionTypes.CREATE_PLAYER, payload: response.data.status });
      })
      .catch((error) => {
        console.log(error.message);
      });
  }
}

export function deletePlayer(id) {
  return (dispatch) => {

    axios.delete(`${ROOT_URL}/players/${id}`)
      .then((response) => {
        dispatch({ type: ActionTypes.DELETE_PLAYER, payload: response.data.status });
      })
      .catch((error) => {
        console.log(error.message);
      });
  }
}

export function fetchGlobalTransfers(){
  return (dispatch) => {
  axios.get(`${ROOT_URL}/transfers`)
  .then((response) => {
    dispatch({ type: ActionTypes.FETCH_GLOBAL_TRANSFERS, payload: response.data });

  })
  .catch((error) => {
    console.log(error.message);
  });
  }
}


export function fetchAllRequestsFields(requests){
  return (dispatch) => {

    var FromNames = [], ToNames = [], PlayerNames = [];

    Promise.all(requests.map((r, index) => 
      axios.get(`${ROOT_URL}/clubs/${r.From}`).then(fromTeam => {
        FromNames[index] = fromTeam.data.response[0].ClubName;
    return axios.get(`${ROOT_URL}/clubs/${r.To}`).then(toTeam => {
      ToNames[index] = toTeam.data.response[0].ClubName;
      return axios.get(`${ROOT_URL}/players/${r.PlayerID}`).then(player => {
        const ply = player.data.response[0];
        PlayerNames[index] = `${ply.FirstName} ${ply.LastName}`
      })
    });
}))).then(results => {
    const fields = {
      FromNames: FromNames,
      ToNames: ToNames,
      PlayerNames: PlayerNames,
    }
    dispatch({ type: ActionTypes.FETCH_REQUESTS_FIELDS, payload: fields });
}).catch(err => {
    console.log(err);
});
  }
}