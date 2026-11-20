import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import eventsReducer from './eventsSlice';
import pinsReducer from './pinsSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    events: eventsReducer,
    pins: pinsReducer,
  },
});

export default store;
