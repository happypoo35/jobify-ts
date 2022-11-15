import { CaseReducer, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { authApi } from "@/app/auth.api";
import { RootState } from "@/app/store";
import type { User } from "@/app/auth.api";

interface UserState {
  user: User | null;
}

const setUser: CaseReducer<UserState, PayloadAction<User>> = (
  state,
  { payload }
) => {
  state.user = payload;
};

const initialState: UserState = {
  user: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearUser: () => {
      return initialState;
    },
  },
  extraReducers: (build) => {
    build
      .addMatcher(authApi.endpoints.login.matchFulfilled, setUser)
      .addMatcher(authApi.endpoints.updateUser.matchFulfilled, setUser)
      .addMatcher(authApi.endpoints.createUser.matchFulfilled, setUser)
      .addMatcher(authApi.endpoints.getUser.matchFulfilled, setUser);
  },
});

export const selectUser = (state: RootState) => state.user.user;

export const { clearUser } = userSlice.actions;

const userReducer = userSlice.reducer;
export default userReducer;
