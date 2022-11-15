import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import store from "./app/store";
import { Root, Auth, Jobs, Layout, Profile, Stats } from "./components";

import "@/styles/globals.scss";
import { authLoader, protectLoader, rootLoader } from "./utils/loaders";

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Root />,
        loader: rootLoader,
        children: [
          {
            loader: protectLoader,
            children: [
              {
                path: "stats",
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
        ],
      },
      {
        element: <Auth.Layout />,
        loader: authLoader,
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
