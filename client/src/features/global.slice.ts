import { RootState } from "@/app/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface GlobalState {
  page: number;
  limit: number | null;
}

const initialState: GlobalState = {
  page: 1,
  limit: null,
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setPage: (state, { payload }: PayloadAction<GlobalState["page"]>) => {
      state.page = payload;
    },
    setLimit: (state, { payload }: PayloadAction<GlobalState["limit"]>) => {
      state.limit = payload;
    },
  },
});

export const selectPage = (state: RootState) => state.global.page;
export const selectLimit = (state: RootState) => state.global.limit;

export const { setPage, setLimit } = globalSlice.actions;

const globalReducer = globalSlice.reducer;
export default globalReducer;
