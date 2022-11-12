import { combineReducers } from "@reduxjs/toolkit";
import globalReducer from "@/features/global.slice";

const rootReducer = combineReducers({
  global: globalReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
