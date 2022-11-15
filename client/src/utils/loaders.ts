import { redirect } from "react-router-dom";
import { authApi } from "@/app/auth.api";
import store from "@/app/store";

export const rootLoader = async () => {
  if (document.cookie.includes("auth_session")) {
    const promise = store.dispatch(authApi.endpoints.getUser.initiate());
    await promise;

    promise.unsubscribe();
  }
};

export const authLoader = () => {
  if (document.cookie.includes("auth_session")) throw redirect("/");
};

export const protectLoader = () => {
  if (!document.cookie.includes("auth_session")) throw redirect("/login");
};
