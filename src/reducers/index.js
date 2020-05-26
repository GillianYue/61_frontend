import { ActionTypes } from '../actions';

const initialState = {
    playerGot: null,
    signin_success: null,
 };

const globalReducer = (state = initialState, action) => {
    switch(action.type) {
        case ActionTypes.GET_PLAYER:
            return Object.assign({}, state, {
              playerGot: action.payload,
            });
        case ActionTypes.MANAGER_SIGNIN:
              return Object.assign({}, state, {
              signin_success: action.payload,
              });
          default: 
            return state;
        }

  };

  export default globalReducer;