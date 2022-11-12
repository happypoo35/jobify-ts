import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./rootReducer";

interface InitialState {
  alert: null;
  page: number;
  limit: null;
}

const initialState: InitialState = {
  alert: null,
  page: 1,
  limit: null,
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setAlert: (state, { payload }) => {
      state.alert = payload;
    },
    setPage: (state, { payload }) => {
      state.page = payload;
    },
    setLimit: (state, { payload }) => {
      state.limit = payload;
    },
  },
});

export const selectAlert = (state: RootState) => state.global.alert;
export const selectPage = (state: RootState) => state.global.page;
export const selectLimit = (state: RootState) => state.global.limit;

export const { setAlert, setPage, setLimit } = globalSlice.actions;

const globalReducer = globalSlice.reducer;
export default globalReducer;
