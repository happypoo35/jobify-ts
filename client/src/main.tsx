import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { store } from "./app/store";
import { Auth, Landing, Layout, Dashboard } from "./components";

import "@/styles/globals.scss";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Landing />,
      },
      {
        element: <Auth.Layout />,
        children: [
          {
            path: "/login",
            element: <Auth.Login />,
          },
          {
            path: "/register",
            element: <Auth.Register />,
          },
        ],
      },
      {
        element: <Dashboard.Layout />,
        path: "/dashboard",
        children: [
          {
            index: true,
            element: <Dashboard.Stats />,
          },
        ],
      },
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
