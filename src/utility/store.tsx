import { Action, ThunkAction, configureStore } from '@reduxjs/toolkit';
import authReducer from './auth'; 
import { RootState } from './reduxTypes'; 
const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});
export default store;
export type AppDispatch = typeof store.dispatch;
export type AppThunk = ThunkAction<void, RootState, null, Action<string>>;