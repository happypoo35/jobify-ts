import { RootState } from "@/app/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Alert {
  type: string;
  msg: string;
}

interface GlobalState {
  alert: Alert | null;
  page: number;
  limit: number | null;
}

const initialState: GlobalState = {
  alert: null,
  page: 1,
  limit: null,
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setAlert: (state, { payload }: PayloadAction<GlobalState["alert"]>) => {
      state.alert = payload;
    },
    setPage: (state, { payload }: PayloadAction<GlobalState["page"]>) => {
      state.page = payload;
    },
    setLimit: (state, { payload }: PayloadAction<GlobalState["limit"]>) => {
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
