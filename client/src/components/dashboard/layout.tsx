import { useState } from "react";
import { Outlet } from "react-router-dom";
import { FaAlignLeft } from "react-icons/fa";

import { useLogoutMutation } from "@/app/auth.api";

import Sidebar from "./sidebar";
import { Button, Logo } from "../shared";
import { useMediaQuery } from "@/hooks";

import s from "./layout.module.scss";

const Layout = () => {
  const tablet = useMediaQuery("(max-width: 768px)");
  const [sidebar, setSidebar] = useState({
    active: true,
    animateOnClose: false,
  });

  const [logout, { isLoading }] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      await logout().unwrap();
    } catch (err) {}
  };

  const handleToggle = () => {
    if (sidebar.active) {
      tablet
        ? setSidebar((p) => ({ ...p, animateOnClose: true }))
        : setSidebar((p) => ({ ...p, active: false }));
    } else {
      setSidebar((p) => ({ ...p, active: true }));
    }
  };

  return (
    <div className={s.dashboard}>
      <Sidebar sidebar={sidebar} tablet={tablet} setSidebar={setSidebar} />
      <div className={s.content}>
        <header className={s.header}>
          <div data-container>
            <button
              className={s.hamburger}
              aria-label="toggle menu"
              onClick={handleToggle}
            >
              <FaAlignLeft />
            </button>
            <h1 data-h3>Dashboard</h1>
            <Logo className={s.logo} />
            <Button onClick={handleLogout} isLoading={isLoading}>
              Logout
            </Button>
          </div>
        </header>
        <main data-container>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
