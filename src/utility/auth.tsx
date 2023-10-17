import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthState } from './reduxTypes';
const initialState: AuthState = {
    user_id: "empty",
    name: "no name yet",
    username: "no username yet",
    token: null,
};
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUserInfo: (state, action: PayloadAction<AuthState>) => {
      return { ...state, ...action.payload };
    },
  }
});

export const { setUserInfo} = authSlice.actions;

export default authSlice.reducer;

// export const rootReducer = combineReducers({
//   auth: authSlice.reducer
// });

// export type RootState = ReturnType<typeof rootReducer>
