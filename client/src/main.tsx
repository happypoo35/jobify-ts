import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import store from "./app/store";
import { Auth, Layout, Main, Profile, Stats } from "./components";
import { authApi } from "./app/auth.api";

import "@/styles/globals.scss";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    // loader: async () => {
    //   const promise = store.dispatch(authApi.endpoints.getUser.initiate());
    //   await promise;
    //   promise.unsubscribe();
    // },
    children: [
      {
        path: "/",
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
        ],
      },
      {
        element: <Auth.Layout />,
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
