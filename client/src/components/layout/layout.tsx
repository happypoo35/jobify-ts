import { useGetUserQuery } from "@/app/auth.api";
import { Outlet } from "react-router-dom";

import s from "./layout.module.scss";

export default function Layout() {
  // const { data } = useGetUserQuery();
  // console.log(data);

  return (
    <div className={s.wrapper}>
      <Outlet />
    </div>
  );
}
