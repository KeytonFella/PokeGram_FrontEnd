export interface AuthState {
    user_id: string | null;
    name: string | null;
    token: string | null;
    // Add other properties if needed...
  }
  
  export interface RootState {
    auth: AuthState;
    // Add other slices if any...
  }