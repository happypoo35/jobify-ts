import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from "react-router-dom";

import store from "./app/store";
import {
  Main,
  Landing,
  Dashboard,
  Auth,
  Jobs,
  Layout,
  Profile,
  Stats,
} from "./components";
import { authApi } from "./app/auth.api";

import "@/styles/globals.scss";

const isAuth = document.cookie.includes("auth_session");
console.log(isAuth);

const router = createBrowserRouter([
  {
    element: <Layout />,
    loader: async () => {
      if (isAuth) {
        const promise = store.dispatch(authApi.endpoints.getUser.initiate());
        await promise;

        promise.unsubscribe();
      }
    },
    children: [
      {
        path: "/",
        // element: isAuth ? <Dashboard /> : <Landing />,
        element: <Main />,
        children: [
          {
            index: true,
            element: <Stats />,
          },
          {
            path: "profile",
            element: <Profile />,
          },
          {
            path: "jobs",
            element: <Jobs />,
          },
        ],
      },
      {
        element: <Auth.Layout />,
        loader: () => {
          if (isAuth) return redirect("/");
        },
        children: [
          {
            path: "login",
            element: <Auth.Login />,
          },
          {
            path: "register",
            element: <Auth.Register />,
          },
        ],
      },
      // {
      //   element: <Dashboard.Layout />,
      //   path: "/dashboard",
      //   children: [
      //     {
      //       index: true,
      //       element: <Dashboard.Stats />,
      //     },
      //   ],
      // },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
