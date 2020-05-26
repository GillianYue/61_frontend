import { ActionTypes } from '../actions';

const initialState = {
    playerGot: null,
    clubGot: null,
    signin_success: null,
    pending_packages: null,
    myClubId: null,
    myClub: null,
 };

const globalReducer = (state = initialState, action) => {
  switch(action.type) {
      case ActionTypes.GET_PLAYER:
        return Object.assign({}, state, {
         playerGot: action.payload,
});
      case ActionTypes.MANAGER_SIGNIN:
        return Object.assign({}, state, {
        signin_success: action.payload.signinStatus,
        myClubId: action.payload.clubId,
});
      case ActionTypes.GET_TEAM:
        return Object.assign({}, state, {
        clubGot: action.payload,
});
      case ActionTypes.GET_OWN_TEAM:
        console.log("my club fetched: "+JSON.stringify(action.payload))
              return Object.assign({}, state, {
              myClub: action.payload,
      });
      case ActionTypes.GET_PACKAGES:
        return Object.assign({}, state, {
        pending_packages: action.payload,
    });
          default: 
            return state;
        }

  };

  export default globalReducer;