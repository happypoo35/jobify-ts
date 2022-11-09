import { Link, Outlet } from "react-router-dom";
import { ReactComponent as JobifyLogo } from "@/assets/logo.svg";

import s from "./layout.module.scss";

const Layout = () => {
  return (
    <main className={s.main} data-container>
      <section className={s.card} aria-label="authorization">
        <Link to="/">
          <JobifyLogo />
        </Link>
        <Outlet />
      </section>
    </main>
  );
};

export default Layout;
