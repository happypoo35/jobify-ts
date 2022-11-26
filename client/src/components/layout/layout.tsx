import { useEffect } from "react";
import { Outlet, ScrollRestoration } from "react-router-dom";
import { Loader } from "../shared";

import s from "./layout.module.scss";

export default function Layout() {
  useEffect(() => {
    const handleViewportHeight = () => {
      document.documentElement.style.setProperty(
        "--app-height",
        `${window.innerHeight}px`
      );
    };
    handleViewportHeight();
    window.addEventListener("resize", handleViewportHeight);
    return () => window.removeEventListener("resize", handleViewportHeight);
  }, []);

  return (
    <div className={s.wrapper}>
      <ScrollRestoration />
      <Loader />
      <Outlet />
    </div>
  );
}
