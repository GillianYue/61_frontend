import { ActionTypes } from '../actions';

const initialState = {

    playerById: null,
    clubById: null,
    clubByIdPlayers: null,

    signin_success: null,
    pending_packages: null,
    packageById: null,

    myClubId: null,
    myClubPlayers: null,
    refetchPlayers: false,
    myClub: null,

    playersSearch: null,
    clubsSearch: null,

    myUsername: null,

    requestsFields: null,
    globalTransfers: null,
    refetchPackages: false,
 };

const globalReducer = (state = initialState, action) => {
  switch(action.type) {
      case ActionTypes.GET_PLAYER: //
        return Object.assign({}, state, {
         playerById: action.payload.response[0],
});
      case ActionTypes.MANAGER_SIGNIN: //
        return Object.assign({}, state, {
        signin_success: action.payload.signinStatus,
        myClubId: action.payload.clubId,
        myUsername: action.payload.username,
});
      case ActionTypes.GET_TEAM: //
        return Object.assign({}, state, {
        clubById: action.payload.response[0],
});
      case ActionTypes.GET_OWN_TEAM: //
              return Object.assign({}, state, {
              myClub: action.payload.response[0],
      });
      case ActionTypes.GET_OWN_TEAM_PLAYERS:
              return Object.assign({}, state, {
                myClubPlayers: action.payload.response,
              refetchPlayers: false,
      });
      case ActionTypes.GET_TEAM_PLAYERS: //
        return Object.assign({}, state, {
          clubByIdPlayers: action.payload.response,
  });
      case ActionTypes.GET_PACKAGES:
        return Object.assign({}, state, {
        pending_packages: action.payload.response,
        refetchPackages: false,
    });
    case ActionTypes.GET_PACKAGE:
      return Object.assign({}, state, {
      packageById: action.payload.response,
  });
    case ActionTypes.SEARCH_PLAYERS: //
      return Object.assign({}, state, {
      playersSearch: action.payload.response,
  });
    case ActionTypes.SEARCH_TEAMS: //
      return Object.assign({}, state, {
      clubsSearch: action.payload.response,
  });
    case ActionTypes.CREATE_PACKAGE: //
    console.log("package create result: "+ JSON.stringify(action.payload))
    return Object.assign({}, state, {
     refetchPackages: true,
  });
  case ActionTypes.SIGN_PACKAGE: //
    return Object.assign({}, state, {
    refetchPackages: true,
    refetchPlayers: action.payload.response[3] === 1,
  });

    case ActionTypes.EDIT_PLAYER:
      return Object.assign({}, state, {
        refetchPlayers: (action.payload === 200),
     });
   case ActionTypes.DELETE_PLAYER:
      return Object.assign({}, state, {
        refetchPlayers: (action.payload === 200),
     });
   case ActionTypes.CREATE_PLAYER:
      return Object.assign({}, state, {
        refetchPlayers: (action.payload === 200),
     });

  case ActionTypes.FETCH_REQUESTS_FIELDS:
    return Object.assign({}, state, {
      requestsFields: action.payload,
   });

   case ActionTypes.FETCH_GLOBAL_TRANSFERS:
    return Object.assign({}, state, {
      globalTransfers: action.payload.response,
   });
    default: 
     return state;
   }

  };

  export default globalReducer;