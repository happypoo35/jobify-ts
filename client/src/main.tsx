import React from "react";
import ReactDOM from "react-dom/client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import { trpc } from "./trpc";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { Auth, Landing, Layout, Dashboard } from "./components";

import "@/styles/globals.scss";

const queryClient = new QueryClient();
const trpcClient = trpc.createClient({
  links: [
    httpBatchLink({
      url: "http://localhost:8000/trpc",
      fetch(url, options) {
        return fetch(url, {
          ...options,
          credentials: "include",
        });
      },
    }),
  ],
});

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
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </trpc.Provider>
  </React.StrictMode>
);
