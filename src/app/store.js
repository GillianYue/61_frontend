import { configureStore } from '@reduxjs/toolkit';
import globalReducer from '../reducers/index';

export default configureStore({
  reducer: {
    global: globalReducer,
  },
});
