import { ActionTypes } from '../actions';

const initialState = {
  
    playerById: null,
    clubById: null,
    clubByIdPlayers: null,

    signin_success: null,
    pending_packages: null,

    myClubId: null,
    myClubPlayers: null,
    myClub: null,

    playersSearch: null,
    clubsSearch: null,

    myUsername: null,
 };

const globalReducer = (state = initialState, action) => {
  switch(action.type) {
      case ActionTypes.GET_PLAYER:
        return Object.assign({}, state, {
         playerById: action.payload,
});
      case ActionTypes.MANAGER_SIGNIN:
        return Object.assign({}, state, {
        signin_success: action.payload.signinStatus,
        myClubId: action.payload.clubId,
        myUsername: action.payload.username,
});
      case ActionTypes.GET_TEAM:
        return Object.assign({}, state, {
        clubById: action.payload,
});
      case ActionTypes.GET_OWN_TEAM:
        console.log("my club fetched: "+JSON.stringify(action.payload))
              return Object.assign({}, state, {
              myClub: action.payload.response[0],
      });
      case ActionTypes.GET_OWN_TEAM_PLAYERS:
              return Object.assign({}, state, {
              myClubPlayers: action.payload,
      });
      case ActionTypes.GET_TEAM_PLAYERS:
        return Object.assign({}, state, {
        clubByIdPlayers: action.payload,
});
      case ActionTypes.GET_PACKAGES:
        return Object.assign({}, state, {
        pending_packages: action.payload,
    });
    case ActionTypes.SEARCH_PLAYERS:
      return Object.assign({}, state, {
      playersSearch: action.payload,
  });
  case ActionTypes.SEARCH_TEAMS:
    return Object.assign({}, state, {
    clubsSearch: action.payload,
});
          default: 
            return state;
        }

  };

  export default globalReducer;