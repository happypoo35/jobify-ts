import { createSlice } from "@reduxjs/toolkit";
import { authApi } from "./api.auth";

const setUser = (state, { payload }) => {
  state.user = payload.user;
};

const clear = () => {
  return initialState;
};

const initialState = {
  user: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearUser: clear,
  },
  extraReducers: (build) => {
    build
      .addMatcher(authApi.endpoints.getUser.matchFulfilled, setUser)
      .addMatcher(authApi.endpoints.login.matchFulfilled, setUser)
      .addMatcher(authApi.endpoints.createUser.matchFulfilled, setUser)
      .addMatcher(authApi.endpoints.logout.matchFulfilled, clear);
  },
});

export const selectUser = (state) => state.user.user;

export const { clearUser } = userSlice.actions;

export default userSlice.reducer;
