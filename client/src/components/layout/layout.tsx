import { Outlet } from "react-router-dom";

import s from "./layout.module.scss";

export default function Layout() {
  return (
    <div className={s.wrapper}>
      <Outlet />
    </div>
  );
}
