import { Outlet, useLoaderData } from "react-router-dom";
import { Logo } from "../shared";

import s from "./layout.module.scss";

const Layout = () => {
  // const data = useLoaderData();
  // console.log(data);

  return (
    <main className={s.main} data-container>
      <section className={s.card} aria-label="authorization">
        <Logo />
        <Outlet />
      </section>
    </main>
  );
};

export default Layout;
