import { Outlet, ScrollRestoration } from "react-router-dom";
import { Loader } from "../shared";

import s from "./layout.module.scss";

export default function Layout() {
  return (
    <div className={s.wrapper}>
      <ScrollRestoration />
      <Loader />
      <Outlet />
    </div>
  );
}
