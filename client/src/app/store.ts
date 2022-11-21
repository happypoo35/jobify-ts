import { configureStore } from "@reduxjs/toolkit";
import { api } from "./api";
import globalReducer from "../features/global.slice";
import userReducer from "@/features/user.slice";

const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    global: globalReducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
