export interface AuthState {
    user_id: string | null;
    name: string | null;
    token: string | null;
  }
  export interface RootState {
    auth: AuthState;
  }