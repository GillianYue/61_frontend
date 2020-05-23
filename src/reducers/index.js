import { ActionTypes } from '../actions';

const initialState = {
    pad: ''

 };

const globalReducer = (state = initialState, action) => {
    switch(action.type) {
        case ActionTypes.GET_ALL_FLOWERS:
            return Object.assign({}, state, {
              allFlowers: action.payload,
            });
          default: 
            return state;
        }
  };

  export default globalReducer;