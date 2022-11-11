import { useState } from "react";
import { Outlet } from "react-router-dom";
import { FaAlignLeft } from "react-icons/fa";
import Sidebar from "./sidebar";
import { Button, Logo } from "../shared";

import s from "./layout.module.scss";

const Layout = () => {
  const [isSidebar, setIsSidebar] = useState(true);

  return (
    <div className={s.dashboard}>
      <Sidebar isSidebar={isSidebar} setIsSidebar={setIsSidebar} />
      <div className={s.content}>
        <header className={s.header}>
          <div data-container>
            <button
              className={s.hamburger}
              aria-label="toggle menu"
              onClick={() => setIsSidebar((p) => (p = !p))}
            >
              <FaAlignLeft />
            </button>
            <h1 data-h3>Dashboard</h1>
            <Logo className={s.logo} />
            <Button
            // onClick={handleLogout}
            // isLoading={isLoading}
            >
              Logout
            </Button>
          </div>
        </header>
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
