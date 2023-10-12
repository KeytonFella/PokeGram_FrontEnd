import { Action, ThunkAction, configureStore } from '@reduxjs/toolkit';
import authReducer from './auth'; // Import your auth reducer
import { RootState } from './reduxTypes'; // Import your RootState type

const store = configureStore({
  reducer: {
    auth: authReducer,
    // Add other reducers if any...
  },
});

export default store;

export type AppDispatch = typeof store.dispatch;
export type AppThunk = ThunkAction<void, RootState, null, Action<string>>;