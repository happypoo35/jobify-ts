import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import store from "./app/store";
import {
  Root,
  Auth,
  Jobs,
  Layout,
  Profile,
  Stats,
  Job,
  Error,
} from "./components";

import "@/styles/globals.scss";
import {
  authLoader,
  jobLoader,
  jobsLoader,
  protectLoader,
  rootLoader,
} from "./utils/loaders";

const router = createBrowserRouter([
  {
    element: <Layout />,
    errorElement: <Error />,
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
                path: "jobs",
                loader: jobsLoader,
                element: <Jobs />,
              },
              {
                path: "job",
                children: [
                  {
                    index: true,
                    element: <Job />,
                  },
                  {
                    path: ":jobId",
                    element: <Job isEdit />,
                    loader: jobLoader,
                  },
                ],
              },
              {
                path: "profile",
                element: <Profile />,
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
