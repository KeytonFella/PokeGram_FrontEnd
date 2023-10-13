import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthState } from './reduxTypes'; // Import your AuthState type

const initialState: AuthState = {
    name: "poketrainer",
    user_id: "42b34474-666d-4c18-a0bf-6474bbb2f342",
    token: null
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


export const { setUserInfo } = authSlice.actions;

export default authSlice.reducer;