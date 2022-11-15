import { redirect } from "react-router-dom";
import { authApi } from "@/app/auth.api";
import store from "@/app/store";

const isAuth = document.cookie.includes("auth_session");

export const rootLoader = async () => {
  if (isAuth) {
    const promise = store.dispatch(authApi.endpoints.getUser.initiate());
    await promise;

    promise.unsubscribe();
  }
};

export const authLoader = () => {
  if (isAuth) return redirect("/");
};
