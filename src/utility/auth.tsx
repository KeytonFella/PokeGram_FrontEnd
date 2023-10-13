import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthState } from './reduxTypes'; // Import your AuthState type

const initialState: AuthState = {
    user_id: "empty",
    name: "noname",
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
    setToken: (state:any, action: PayloadAction<string | null>) => {
      state.token = action.payload;
    }
  }
});
// export const rootReducer = combineReducers({
//   auth: authSlice.reducer
// });

// export type RootState = ReturnType<typeof rootReducer>

export const { setUserInfo, setToken } = authSlice.actions;

export default authSlice.reducer;