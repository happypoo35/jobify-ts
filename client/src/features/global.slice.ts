import { createSlice } from "@reduxjs/toolkit";

export const globalSlice = createSlice({
  name: "global",
  initialState: null,
  reducers: {},
});

const globalReducer = globalSlice.reducer;
export default globalReducer;
