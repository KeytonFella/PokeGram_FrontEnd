import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthState } from './reduxTypes'; // Import your AuthState type

const initialState: AuthState = {
    name: "JOSH",
    user_id: "1237283usd-1-sdf--sd-qw-das",
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
// export const rootReducer = combineReducers({
//   auth: authSlice.reducer
// });

// export type RootState = ReturnType<typeof rootReducer>

export const { setUserInfo } = authSlice.actions;

export default authSlice.reducer;